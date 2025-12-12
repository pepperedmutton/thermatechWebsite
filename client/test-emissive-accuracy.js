/**
 * Test emissive probe plasma potential measurement accuracy
 */

import { DEFAULT_PARAMS } from './src/lib/langmuir/params.js';
import { simulateEmissive } from './src/lib/langmuir/simulate.js';
import { invertEmissive } from './src/lib/langmuir/invert.js';

console.log('='.repeat(70));
console.log('发射探针等离子体电位测量精度测试');
console.log('='.repeat(70));

const testCases = [
  {
    name: '拐点法 - Xe, Vp=15V',
    params: { ...DEFAULT_PARAMS, emissiveMethod: 'inflection' },
  },
  {
    name: '拐点法 - Ar, Vp=20V',
    params: { ...DEFAULT_PARAMS, gas: 'Ar', Vp_V: 20, emissiveMethod: 'inflection' },
  },
  {
    name: '拐点法 - He, Vp=25V',
    params: { ...DEFAULT_PARAMS, gas: 'He', Vp_V: 25, emissiveMethod: 'inflection' },
  },
  {
    name: '浮动法 - Xe, Vp=15V',
    params: { ...DEFAULT_PARAMS, emissiveMethod: 'floating' },
  },
  {
    name: '浮动法 - Kr, Vp=18V',
    params: { ...DEFAULT_PARAMS, gas: 'Kr', Vp_V: 18, emissiveMethod: 'floating' },
  },
];

let totalTests = 0;
let accurateTests = 0; // < 5% error

for (const { name, params } of testCases) {
  const sim = simulateEmissive(params);
  const { result, fitQuality } = invertEmissive(sim.V, sim.I, params);
  
  const Vp_input = params.Vp_V;
  const Vp_measured = result.Vp_V;
  const error_pct = Math.abs((Vp_measured - Vp_input) / Vp_input) * 100;
  const passed = error_pct < 5;
  
  totalTests++;
  if (passed) accurateTests++;
  
  console.log(`\n${name}:`);
  console.log(`  输入Vp:   ${Vp_input.toFixed(2)} V`);
  console.log(`  测量Vp:   ${Vp_measured ? Vp_measured.toFixed(3) : 'N/A'} V`);
  console.log(`  误差:     ${error_pct.toFixed(2)}% ${passed ? '✓' : '✗'}`);
  console.log(`  置信度:   ${((fitQuality.confidence || 0) * 100).toFixed(1)}%`);
  console.log(`  警告:     ${fitQuality.warnings.join('; ') || '无'}`);
}

console.log('\n' + '='.repeat(70));
console.log(`总计: ${accurateTests}/${totalTests} 测试误差<5%`);
console.log('发射探针应为最精确的Vp测量方法 (典型精度 <2%)');
console.log('='.repeat(70));
