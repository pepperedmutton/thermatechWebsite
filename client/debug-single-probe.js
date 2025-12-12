/**
 * Debug script to understand single probe inversion errors
 */

import { DEFAULT_PARAMS } from './src/lib/langmuir/params.js';
import { simulateSingle } from './src/lib/langmuir/simulate.js';
import { invertSingle } from './src/lib/langmuir/invert.js';

console.log('='.repeat(70));
console.log('单探针反演详细调试');
console.log('='.repeat(70));

const params = { ...DEFAULT_PARAMS };

console.log('\n输入参数:');
console.log(`  ne = ${params.ne_m3.toExponential(3)} m⁻³`);
console.log(`  Te = ${params.Te_eV} eV`);
console.log(`  Ti = ${params.Ti_eV} eV`);
console.log(`  Vp = ${params.Vp_V} V`);
console.log(`  gas = ${params.gas}`);

const simResult = simulateSingle(params);
const { result, fitQuality } = invertSingle(simResult.V, simResult.I, params);

console.log('\n提取参数:');
console.log(`  Te_extracted = ${result.Te_eV.toFixed(3)} eV (输入: ${params.Te_eV})`);
console.log(`  Vp_extracted = ${result.Vp_V.toFixed(3)} V (输入: ${params.Vp_V})`);
console.log(`  Vf_extracted = ${result.Vf_V.toFixed(3)} V`);
console.log(`  Te R² = ${fitQuality.Te_r2.toFixed(3)}`);

const Te_error = Math.abs((result.Te_eV - params.Te_eV) / params.Te_eV) * 100;
console.log(`  Te误差 = ${Te_error.toFixed(2)}%`);

console.log('\n密度计算:');
console.log(`  ne_input = ${params.ne_m3.toExponential(3)} m⁻³`);
console.log(`  ne_diagnostic = ${result.ne_m3.toExponential(3)} m⁻³`);

const ne_error = Math.abs((result.ne_m3 - params.ne_m3) / params.ne_m3) * 100;
console.log(`  ne误差 = ${ne_error.toFixed(2)}%`);

// Calculate what ne SHOULD be if we use the correct Te
const E_CHARGE = 1.602e-19;
const AMU = 1.661e-27;
const ION_COLLECTION_EFFICIENCY = 3.0;

const gasProps = { Xe: 131.3, Ar: 39.95, Kr: 83.8, He: 4.0 };
const M_ion_kg = gasProps[params.gas] * AMU;
const I_ion_sat = Math.min(...simResult.I);

const A = 2 * Math.PI * (params.diameter_mm / 2000) * (params.length_mm / 1000);

// Using extracted Te
const Te_J_extracted = result.Te_eV * E_CHARGE;
const v_bohm_extracted = Math.sqrt(Te_J_extracted / M_ion_kg);
const Ti_correction = Math.sqrt(1 + params.Ti_eV / result.Te_eV);
const ne_from_extracted_Te = Math.abs(I_ion_sat) / (ION_COLLECTION_EFFICIENCY * E_CHARGE * A * v_bohm_extracted * Ti_correction);

// Using input Te
const Te_J_input = params.Te_eV * E_CHARGE;
const v_bohm_input = Math.sqrt(Te_J_input / M_ion_kg);
const Ti_correction_input = Math.sqrt(1 + params.Ti_eV / params.Te_eV);
const ne_from_input_Te = Math.abs(I_ion_sat) / (ION_COLLECTION_EFFICIENCY * E_CHARGE * A * v_bohm_input * Ti_correction_input);

console.log('\n反算验证:');
console.log(`  使用提取的Te计算ne: ${ne_from_extracted_Te.toExponential(3)} m⁻³`);
console.log(`  使用输入的Te计算ne: ${ne_from_input_Te.toExponential(3)} m⁻³`);
console.log(`  I_ion_sat = ${I_ion_sat.toExponential(3)} A`);
console.log(`  v_bohm (extracted Te) = ${v_bohm_extracted.toExponential(3)} m/s`);
console.log(`  v_bohm (input Te) = ${v_bohm_input.toExponential(3)} m/s`);
console.log(`  Ti_correction = ${Ti_correction.toFixed(3)}`);

const ne_error_with_input_Te = Math.abs((ne_from_input_Te - params.ne_m3) / params.ne_m3) * 100;
console.log(`\n如果使用正确的Te,ne误差会是: ${ne_error_with_input_Te.toFixed(2)}%`);

console.log('\n' + '='.repeat(70));
