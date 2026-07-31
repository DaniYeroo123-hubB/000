import { PhysicalConstant } from '../types';

export const PHYSICAL_CONSTANTS: PhysicalConstant[] = [
  // Math & Universal
  { symbol: 'π', name: 'Pi', value: Math.PI, unit: '', category: 'Math' },
  { symbol: 'e', name: 'Euler\'s Number', value: Math.E, unit: '', category: 'Math' },
  { symbol: 'ϕ', name: 'Golden Ratio', value: 1.618033988749895, unit: '', category: 'Math' },
  { symbol: 'γ', name: 'Euler-Mascheroni Constant', value: 0.577215664901532, unit: '', category: 'Math' },
  { symbol: 'c', name: 'Speed of Light in Vacuum', value: 299792458, unit: 'm/s', category: 'Universal' },
  { symbol: 'h', name: 'Planck Constant', value: 6.62607015e-34, unit: 'J·s', category: 'Universal' },
  { symbol: 'ħ', name: 'Reduced Planck Constant', value: 1.054571817e-34, unit: 'J·s', category: 'Universal' },
  { symbol: 'G', name: 'Newtonian Constant of Gravitation', value: 6.67430e-11, unit: 'm³/(kg·s²)', category: 'Universal' },
  { symbol: 'g', name: 'Standard Acceleration of Gravity', value: 9.80665, unit: 'm/s²', category: 'Universal' },

  // Electromagnetic & Atomic
  { symbol: 'e', name: 'Elementary Charge', value: 1.602176634e-19, unit: 'C', category: 'Electromagnetic' },
  { symbol: 'ε₀', name: 'Vacuum Electric Permittivity', value: 8.8541878128e-12, unit: 'F/m', category: 'Electromagnetic' },
  { symbol: 'μ₀', name: 'Vacuum Magnetic Permeability', value: 1.25663706212e-6, unit: 'N/A²', category: 'Electromagnetic' },
  { symbol: 'm_e', name: 'Electron Mass', value: 9.1093837015e-31, unit: 'kg', category: 'Atomic' },
  { symbol: 'm_p', name: 'Proton Mass', value: 1.67262192369e-27, unit: 'kg', category: 'Atomic' },
  { symbol: 'm_n', name: 'Neutron Mass', value: 1.67492749804e-27, unit: 'kg', category: 'Atomic' },
  { symbol: 'α', name: 'Fine-Structure Constant', value: 7.2973525693e-3, unit: '', category: 'Atomic' },
  { symbol: 'R_∞', name: 'Rydberg Constant', value: 10973731.568160, unit: '1/m', category: 'Atomic' },
  { symbol: 'a₀', name: 'Bohr Radius', value: 5.29177210903e-11, unit: 'm', category: 'Atomic' },

  // Physico-Chemical
  { symbol: 'N_A', name: 'Avogadro Constant', value: 6.02214076e23, unit: 'mol⁻¹', category: 'Physico-Chemical' },
  { symbol: 'k', name: 'Boltzmann Constant', value: 1.380649e-23, unit: 'J/K', category: 'Physico-Chemical' },
  { symbol: 'R', name: 'Molar Gas Constant', value: 8.314462618, unit: 'J/(mol·K)', category: 'Physico-Chemical' },
  { symbol: 'F', name: 'Faraday Constant', value: 96485.33212, unit: 'C/mol', category: 'Physico-Chemical' },
  { symbol: 'σ', name: 'Stefan-Boltzmann Constant', value: 5.670374419e-8, unit: 'W/(m²·K⁴)', category: 'Physico-Chemical' },
];
