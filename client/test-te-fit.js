import { DEFAULT_PARAMS } from './src/lib/langmuir/params.js';
import { simulateSingle } from './src/lib/langmuir/simulate.js';
import { invertSingle } from './src/lib/langmuir/invert.js';

const testCases = [
  { name: 'Xe, 3eV', params: { ...DEFAULT_PARAMS } },
  { name: 'Ar, 2eV', params: { ...DEFAULT_PARAMS, gas: 'Ar', ne_m3: 5e17, Te_eV: 2 } },
  { name: 'He, 5eV', params: { ...DEFAULT_PARAMS, gas: 'He', ne_m3: 1e16, Te_eV: 5 } },
];

for (const { name, params } of testCases) {
  const sim = simulateSingle(params);
  const { result, fitQuality } = invertSingle(sim.V, sim.I, params);
  
  console.log(`\n${name}:`);
  console.log(`  Te: ${params.Te_eV} → ${result.Te_eV.toFixed(3)} eV (R²=${fitQuality.Te_r2.toFixed(3)})`);
  console.log(`  ne: ${params.ne_m3.toExponential(2)} → ${result.ne_m3.toExponential(2)} m⁻³`);
  console.log(`  Warnings: ${fitQuality.warnings.join('; ') || 'none'}`);
}
