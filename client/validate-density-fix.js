/**
 * Quick validation script for density diagnostic accuracy fix
 * 
 * This script verifies that the density inversion now correctly accounts
 * for the enhanced collection efficiency coefficients used in simulation.
 * 
 * Expected: Diagnosed density should match input density within 5% error
 */

import { DEFAULT_PARAMS } from './src/lib/langmuir/params.js';
import { simulateSingle, simulateDouble } from './src/lib/langmuir/simulate.js';
import { invertSingle, invertDouble } from './src/lib/langmuir/invert.js';

console.log('='.repeat(70));
console.log('朗缪尔探针密度诊断精度验证');
console.log('='.repeat(70));
console.log('修复说明:');
console.log('  - 模拟使用 ION_COLLECTION_EFFICIENCY = 3.0');
console.log('  - 反演现在使用相同的系数');
console.log('  - 预期误差 < 5%');
console.log('='.repeat(70));

function validateDensity(mode, params) {
  console.log(`\n测试: ${mode} 模式`);
  console.log(`  气体: ${params.gas}, Te = ${params.Te_eV} eV, ne = ${params.ne_m3.toExponential(2)} m⁻³`);
  
  const simulate = mode === 'single' ? simulateSingle : simulateDouble;
  const invert = mode === 'single' ? invertSingle : invertDouble;
  
  const simResult = simulate(params);
  const { result } = invert(simResult.V, simResult.I, params);
  
  const ne_input = params.ne_m3;
  const ne_diagnostic = result.ne_m3;
  const error_pct = Math.abs((ne_diagnostic - ne_input) / ne_input) * 100;
  
  console.log(`  输入密度:   ${ne_input.toExponential(3)} m⁻³`);
  console.log(`  诊断密度:   ${ne_diagnostic.toExponential(3)} m⁻³`);
  console.log(`  相对误差:   ${error_pct.toFixed(2)}%`);
  
  const pass = error_pct < 5;
  console.log(`  结果: ${pass ? '✓ PASS' : '✗ FAIL'}`);
  
  return pass;
}

// Test cases
const tests = [
  { mode: 'single', params: { ...DEFAULT_PARAMS } },
  { mode: 'single', params: { ...DEFAULT_PARAMS, gas: 'Ar', ne_m3: 5e17, Te_eV: 2 } },
  { mode: 'single', params: { ...DEFAULT_PARAMS, gas: 'He', ne_m3: 1e16, Te_eV: 5 } },
  { mode: 'double', params: { ...DEFAULT_PARAMS } },
  { mode: 'double', params: { ...DEFAULT_PARAMS, gas: 'Kr', ne_m3: 2e17, Te_eV: 8 } },
];

let passed = 0;
for (const { mode, params } of tests) {
  if (validateDensity(mode, params)) {
    passed++;
  }
}

console.log('\n' + '='.repeat(70));
console.log(`总计: ${passed}/${tests.length} 测试通过`);
console.log(passed === tests.length ? '🎉 所有测试通过!' : '⚠️  部分测试失败');
console.log('='.repeat(70));
