import { create, all } from 'mathjs';
import { AngleUnit, BaseNumberSystem, DataRange } from '../types';

const math = create(all, {});

// Config mathjs
math.config({
  number: 'number',
  precision: 14,
});

export interface EvaluationResult {
  success: boolean;
  value: string;
  formattedDisplay: string;
  error?: string;
  isComplex?: boolean;
}

/**
 * Format raw number with thousand separators according to user settings
 */
export function formatNumberWithSeparator(
  numStr: string,
  separator: 'space' | 'comma' | 'dot' | 'none' = 'space'
): string {
  if (!numStr || isNaN(Number(numStr.replace(/ /g, '')))) return numStr;
  
  // If scientific notation e.g. 1.23e+4
  if (numStr.includes('e') || numStr.includes('E')) return numStr;

  const parts = numStr.split('.');
  const sepChar = separator === 'space' ? ' ' : separator === 'comma' ? ',' : separator === 'dot' ? '.' : '';
  const decimalSep = separator === 'dot' ? ',' : '.';

  if (sepChar) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sepChar);
  }

  return parts.join(decimalSep);
}

/**
 * Convert angle based on active unit (DEG, RAD, GRAD)
 */
function normalizeAngleToRad(val: number, unit: AngleUnit): number {
  if (unit === 'DEG') return (val * Math.PI) / 180;
  if (unit === 'GRAD') return (val * Math.PI) / 200;
  return val; // RAD
}

function normalizeRadToAngle(val: number, unit: AngleUnit): number {
  if (unit === 'DEG') return (val * 180) / Math.PI;
  if (unit === 'GRAD') return (val * 200) / Math.PI;
  return val; // RAD
}

/**
 * Prepare expression string for mathjs parsing
 */
export function sanitizeExpression(
  expr: string,
  angleUnit: AngleUnit,
  baseSystem: BaseNumberSystem,
  dataRange: DataRange
): string {
  let cleaned = expr;

  // Replace calculator visual symbols with standard JS / Mathjs operators
  cleaned = cleaned.replace(/×/g, '*');
  cleaned = cleaned.replace(/÷/g, '/');
  cleaned = cleaned.replace(/–/g, '-');
  cleaned = cleaned.replace(/π/g, 'pi');
  cleaned = cleaned.replace(/√\((.*?)\)/g, 'sqrt($1)');
  cleaned = cleaned.replace(/√([0-9a-zA-Z._]+)/g, 'sqrt($1)');
  cleaned = cleaned.replace(/³√\((.*?)\)/g, 'cbrt($1)');
  cleaned = cleaned.replace(/\broot\(/g, 'nthRoot(');
  cleaned = cleaned.replace(/Ans/g, 'ans');
  cleaned = cleaned.replace(/mod/g, 'mod');
  cleaned = cleaned.replace(/\bln\(/g, 'log(');
  cleaned = cleaned.replace(/(\d+(\.\d+)?|\w+)\s*nCr\s*(\d+(\.\d+)?|\w+)/gi, 'combinations($1, $3)');
  cleaned = cleaned.replace(/(\d+(\.\d+)?|\w+)\s*nPr\s*(\d+(\.\d+)?|\w+)/gi, 'permutations($1, $3)');

  // Handle Base-N prefixes if in BIN/OCT/HEX
  if (baseSystem === 'HEX' && !cleaned.startsWith('0x')) {
    // Mathjs handles 0x1A
  }

  return cleaned;
}

/**
 * Evaluate mathematical expressions safely
 */
export function evaluateExpression(
  expression: string,
  angleUnit: AngleUnit = 'DEG',
  baseSystem: BaseNumberSystem = 'DEC',
  dataRange: DataRange = 'Real',
  precision: number = 10,
  thousandSep: 'space' | 'comma' | 'dot' | 'none' = 'space',
  lastAns: string = '0'
): EvaluationResult {
  if (!expression.trim()) {
    return { success: true, value: '0', formattedDisplay: '0' };
  }

  try {
    // Handle Base-N conversions
    if (baseSystem !== 'DEC') {
      return evaluateBaseN(expression, baseSystem);
    }

    const scope = {
      ans: parseFloat(lastAns) || 0,
      pi: Math.PI,
      e: Math.E,
      i: math.complex(0, 1),
    };

    // Replace trigonometric functions to respect DEG / RAD / GRAD mode
    let parsedExpr = sanitizeExpression(expression, angleUnit, baseSystem, dataRange);

    if (angleUnit !== 'RAD') {
      const angleMultiplier = angleUnit === 'DEG' ? Math.PI / 180 : Math.PI / 200;
      const invMultiplier = angleUnit === 'DEG' ? 180 / Math.PI : 200 / Math.PI;

      // Wrap trig arguments
      parsedExpr = parsedExpr.replace(/\bsin\(([^)]+)\)/g, `sin(($1) * ${angleMultiplier})`);
      parsedExpr = parsedExpr.replace(/\bcos\(([^)]+)\)/g, `cos(($1) * ${angleMultiplier})`);
      parsedExpr = parsedExpr.replace(/\btan\(([^)]+)\)/g, `tan(($1) * ${angleMultiplier})`);

      // Inverse trig result conversion
      parsedExpr = parsedExpr.replace(/\basin\(([^)]+)\)/g, `(asin($1) * ${invMultiplier})`);
      parsedExpr = parsedExpr.replace(/\bacos\(([^)]+)\)/g, `(acos($1) * ${invMultiplier})`);
      parsedExpr = parsedExpr.replace(/\batan\(([^)]+)\)/g, `(atan($1) * ${invMultiplier})`);
    }

    const compiled = math.compile(parsedExpr);
    let result = compiled.evaluate(scope);

    // Format output
    if (math.isComplex(result)) {
      const re = Math.abs(result.re) < 1e-12 ? 0 : result.re;
      const im = Math.abs(result.im) < 1e-12 ? 0 : result.im;
      
      let resStr = '';
      if (re !== 0 || im === 0) resStr += math.format(re, { precision });
      if (im !== 0) {
        const imSign = im > 0 ? (re !== 0 ? ' + ' : '') : (re !== 0 ? ' - ' : '-');
        const absIm = Math.abs(im) === 1 ? '' : math.format(Math.abs(im), { precision });
        resStr += `${imSign}${absIm}i`;
      }
      return {
        success: true,
        value: resStr,
        formattedDisplay: resStr,
        isComplex: true,
      };
    }

    if (typeof result === 'number') {
      if (!isFinite(result)) {
        return { success: false, value: 'Math Error', formattedDisplay: 'Math Error', error: 'Division by zero or overflow' };
      }
      // Round small precision artifacts
      if (Math.abs(result) < 1e-14 && result !== 0) result = 0;

      const numVal = Number(math.format(result, { precision }));
      const strVal = numVal.toString();
      const formatted = formatNumberWithSeparator(strVal, thousandSep);

      return {
        success: true,
        value: strVal,
        formattedDisplay: formatted,
      };
    }

    if (typeof result === 'boolean') {
      return { success: true, value: result ? '1' : '0', formattedDisplay: result ? '1' : '0' };
    }

    const strRes = String(result);
    return { success: true, value: strRes, formattedDisplay: strRes };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Syntax Error';
    return {
      success: false,
      value: 'Syntax Error',
      formattedDisplay: 'Syntax Error',
      error: msg,
    };
  }
}

/**
 * Base-N evaluator (BIN, OCT, DEC, HEX)
 */
function evaluateBaseN(expression: string, base: BaseNumberSystem): EvaluationResult {
  try {
    let clean = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/–/g, '-').trim();

    // Map operators
    clean = clean.replace(/AND/gi, '&').replace(/OR/gi, '|').replace(/XOR/gi, '^').replace(/NOT/gi, '~');

    // Parse base integers
    const radix = base === 'BIN' ? 2 : base === 'OCT' ? 8 : base === 'HEX' ? 16 : 10;
    
    // Evaluate via JS BigInt or integer math
    // Simple integer evaluation
    let numVal = parseInt(clean, radix);
    if (isNaN(numVal)) {
      // Try evaluating as mathematical expression
      numVal = Math.floor(math.evaluate(clean) || 0);
    }

    const resHex = numVal.toString(16).toUpperCase();
    const resDec = numVal.toString(10);
    const resOct = numVal.toString(8);
    const resBin = numVal.toString(2);

    let display = resDec;
    if (base === 'BIN') display = resBin;
    if (base === 'OCT') display = resOct;
    if (base === 'HEX') display = resHex;

    return {
      success: true,
      value: display,
      formattedDisplay: display,
    };
  } catch (err) {
    return { success: false, value: 'Base Error', formattedDisplay: 'Base Error' };
  }
}

/**
 * Numerical Derivative d/dx f(x) at x
 */
export function calculateDerivative(fnExpr: string, xVal: number): number {
  const h = 0.00001;
  const fPlus = math.evaluate(fnExpr, { x: xVal + h });
  const fMinus = math.evaluate(fnExpr, { x: xVal - h });
  return (fPlus - fMinus) / (2 * h);
}

/**
 * Definite Integral ∫ f(x) dx from a to b via Simpson's Rule
 */
export function calculateIntegral(fnExpr: string, a: number, b: number, n = 100): number {
  const h = (b - a) / n;
  let sum = math.evaluate(fnExpr, { x: a }) + math.evaluate(fnExpr, { x: b });

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const factor = i % 2 === 0 ? 2 : 4;
    sum += factor * math.evaluate(fnExpr, { x });
  }

  return (h / 3) * sum;
}

/**
 * Convert Decimal to Fraction string (a b/c or d/c)
 */
export function toFractionString(val: number, improper = false): string {
  try {
    const f = math.fraction(val);
    const n = typeof f.n === 'bigint' ? Number(f.n) : f.n;
    const d = typeof f.d === 'bigint' ? Number(f.d) : f.d;

    if (d === 1) return n.toString();

    if (improper) {
      return `${n}/${d}`;
    } else {
      const whole = Math.floor(Math.abs(n) / d);
      const rem = Math.abs(n) % d;
      const sign = n < 0 ? '-' : '';
      if (whole === 0) return `${sign}${rem}/${d}`;
      return `${sign}${whole} ${rem}/${d}`;
    }
  } catch {
    return val.toString();
  }
}

/**
 * Convert Degrees Decimal to D°M'S"
 */
export function toDMS(deg: number): string {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.round((minutesNotTruncated - minutes) * 60);

  const sign = deg < 0 ? '-' : '';
  return `${sign}${degrees}°${minutes}'${seconds}"`;
}
