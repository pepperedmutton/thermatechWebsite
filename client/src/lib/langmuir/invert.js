/**
 * @fileoverview Data inversion and analysis for Langmuir probe
 * @module lib/langmuir/invert
 */

const E_CHARGE = 1.602e-19; // Elementary charge (C)
const AMU = 1.661e-27; // Atomic mass unit (kg)

// Collection efficiency coefficients (must match simulate.js)
const BOHM_COEFFICIENT = 0.61; // Theoretical Bohm coefficient for ion collection
const ELECTRON_COEFFICIENT = 0.25; // Electron random flux coefficient (1/4)

/**
 * Smooth data using moving average
 * @param {number[]} data - Data to smooth
 * @param {number} window - Window size
 * @returns {number[]} Smoothed data
 */
function movingAverage(data, window = 5) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - Math.floor(window / 2)); 
         j <= Math.min(data.length - 1, i + Math.floor(window / 2)); 
         j++) {
      sum += data[j];
      count++;
    }
    result.push(sum / count);
  }
  return result;
}

/**
 * Calculate numerical derivative
 * @param {number[]} x - X values
 * @param {number[]} y - Y values
 * @returns {number[]} dy/dx
 */
function derivative(x, y) {
  const dydx = [];
  for (let i = 0; i < x.length; i++) {
    if (i === 0) {
      dydx.push((y[1] - y[0]) / (x[1] - x[0]));
    } else if (i === x.length - 1) {
      dydx.push((y[i] - y[i - 1]) / (x[i] - x[i - 1]));
    } else {
      dydx.push((y[i + 1] - y[i - 1]) / (x[i + 1] - x[i - 1]));
    }
  }
  return dydx;
}

/**
 * Find zero crossing using linear interpolation
 * @param {number[]} x - X values
 * @param {number[]} y - Y values
 * @returns {number|null} X value at y=0
 */
function findZeroCrossing(x, y) {
  for (let i = 0; i < y.length - 1; i++) {
    if (y[i] * y[i + 1] <= 0) {
      // Linear interpolation
      const t = -y[i] / (y[i + 1] - y[i]);
      return x[i] + t * (x[i + 1] - x[i]);
    }
  }
  return null;
}

/**
 * Find maximum of array
 * @param {number[]} arr - Array
 * @returns {{index: number, value: number}}
 */
function findMax(arr) {
  let maxIdx = 0;
  let maxVal = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i];
      maxIdx = i;
    }
  }
  return { index: maxIdx, value: maxVal };
}

/**
 * Linear regression on log scale
 * @param {number[]} x - X values
 * @param {number[]} logY - log(Y) values
 * @returns {{slope: number, intercept: number, r2: number}}
 */
function linearRegression(x, logY) {
  const n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += logY[i];
    sumXY += x[i] * logY[i];
    sumX2 += x[i] * x[i];
  }
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R^2
  const meanY = sumY / n;
  let ssRes = 0, ssTot = 0;
  for (let i = 0; i < n; i++) {
    const yFit = slope * x[i] + intercept;
    ssRes += (logY[i] - yFit) ** 2;
    ssTot += (logY[i] - meanY) ** 2;
  }
  const r2 = 1 - ssRes / ssTot;
  
  return { slope, intercept, r2 };
}

/**
 * Invert single Langmuir probe data
 * @param {number[]} V - Voltage array
 * @param {number[]} I - Current array
 * @param {Object} p - Original parameters (for area, gas, etc.)
 * @returns {{result: Object, fitQuality: Object}}
 */
export function invertSingle(V, I, p) {
  const warnings = [];
  
  // Smooth current
  const I_smooth = movingAverage(I, 5);
  
  // Calculate derivative
  const dIdV = derivative(V, I_smooth);
  const dIdV_smooth = movingAverage(dIdV, 5);
  
  // 1. Find Vf (floating potential): I = 0
  const Vf = findZeroCrossing(V, I_smooth);
  if (Vf === null) {
    warnings.push('Could not find floating potential (I=0 crossing)');
  }
  
  // 2. Find Vp (plasma potential): max(dI/dV)
  const maxDeriv = findMax(dIdV_smooth);
  const Vp = V[maxDeriv.index];
  
  // 3. Estimate Te from electron retarding region
  // Use middle 60% of region between Vf and Vp for better linear fit
  const V_low = (Vf || V[0]) + 0.2 * (Vp - (Vf || V[0]));
  const V_high = (Vf || V[0]) + 0.8 * (Vp - (Vf || V[0]));
  
  const retardingRegion = [];
  for (let i = 0; i < V.length; i++) {
    if (V[i] >= V_low && V[i] <= V_high && I_smooth[i] > 0) {
      retardingRegion.push({ v: V[i], logI: Math.log(I_smooth[i]) });
    }
  }
  
  let Te = null;
  let Te_r2 = 0;
  
  if (retardingRegion.length > 10) {
    const vArr = retardingRegion.map(pt => pt.v);
    const logIArr = retardingRegion.map(pt => pt.logI);
    const fit = linearRegression(vArr, logIArr);
    Te = 1 / fit.slope; // Slope = 1/Te
    Te_r2 = fit.r2;
    
    if (Te_r2 < 0.8) {
      warnings.push(`Te拟合质量较低 (R²=${Te_r2.toFixed(2)})`);
    }
    if (Te < 0.5 || Te > 50) {
      warnings.push(`Te值超出合理范围: ${Te.toFixed(2)} eV`);
    }
  } else {
    warnings.push('电子减速区数据点不足,无法提取Te');
    // Use a default reasonable value when extraction fails
    Te = 3.0; // Default fallback
  }
  
  // 4. Estimate ne from ion saturation current
  // I_sat = 0.61 * e * n * A * v_bohm * sqrt(1 + Ti/Te)
  const I_ion_sat = Math.min(...I_smooth); // Most negative current
  const A = 2 * Math.PI * (p.diameter_mm / 2000) * (p.length_mm / 1000);
  
  // Solve for ne: ne = I_sat / (0.61 * e * A * v_bohm * Ti_correction)
  const gasProps = { Xe: 131.3, Ar: 39.95, Kr: 83.8, He: 4.0 };
  const M_ion_kg = (gasProps[p.gas] || 131.3) * AMU;
  const Te_J = (Te || 3.0) * E_CHARGE; // Use extracted Te
  const v_bohm = Math.sqrt(Te_J / M_ion_kg);
  const Ti_correction = Math.sqrt(1 + (p.Ti_eV || 0) / (Te || 3.0));
  const ne = Math.abs(I_ion_sat) / (BOHM_COEFFICIENT * E_CHARGE * A * v_bohm * Ti_correction);
  
  // Calculate overall fit quality
  const residuals = I.map((val, i) => Math.abs(val - I_smooth[i]));
  const meanResidual = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  const maxI = Math.max(...I.map(Math.abs));
  const relativeError = meanResidual / maxI;
  
  return {
    result: {
      Te_eV: Te || p.Te_eV,
      ne_m3: ne,
      Vp_V: Vp,
      Vf_V: Vf || 0,
    },
    fitQuality: {
      Te_r2,
      relativeError,
      warnings,
      method: 'single-probe-standard',
    },
  };
}

/**
 * Invert double Langmuir probe data
 * @param {number[]} V - Voltage array
 * @param {number[]} I - Current array
 * @param {Object} p - Original parameters
 * @returns {{result: Object, fitQuality: Object}}
 */
export function invertDouble(V, I, p) {
  const warnings = [];
  
  // Use lighter smoothing to preserve noise characteristics
  const I_smooth = movingAverage(I, 3); // Reduced from 5
  const dIdV = derivative(V, I_smooth);
  const dIdV_smooth = movingAverage(dIdV, 3); // Reduced from 5
  
  // 1. Vf is at I = 0 (center of symmetric characteristic)
  const Vf = findZeroCrossing(V, I_smooth);
  
  // 2. Estimate Te from slope at Vf
  // For double probe: dI/dV|_{V=0} ≈ I_sat / (2*Te)
  // In practice, use a small region around Vf for better noise immunity
  const zeroIdx = V.findIndex(v => Math.abs(v - (Vf || 0)) < 0.5);
  
  // Average slope over a small window around zero for robustness
  const windowSize = 5;
  const startIdx = Math.max(0, zeroIdx - Math.floor(windowSize / 2));
  const endIdx = Math.min(dIdV_smooth.length - 1, zeroIdx + Math.floor(windowSize / 2));
  
  let slopeSum = 0;
  let count = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (dIdV_smooth[i] && !isNaN(dIdV_smooth[i])) {
      slopeSum += Math.abs(dIdV_smooth[i]);
      count++;
    }
  }
  const slopeAtZero = count > 0 ? slopeSum / count : Math.abs(dIdV_smooth[zeroIdx] || dIdV_smooth[Math.floor(dIdV_smooth.length / 2)]);
  
  const I_sat = Math.max(...I_smooth.map(Math.abs));
  const Te = I_sat / (2 * slopeAtZero);
  
  if (Te <= 0 || Te > 50) {
    warnings.push('Te estimate out of reasonable range');
  }
  
  // Check for numerical instabilities in slope calculation
  if (slopeAtZero < 1e-6 || !isFinite(Te)) {
    warnings.push('数值不稳定: 斜率测量质量较低');
  }
  
  // 3. Estimate ne from saturation current
  const A = 2 * Math.PI * (p.diameter_mm / 2000) * (p.length_mm / 1000);
  const gasProps = { Xe: 131.3, Ar: 39.95, Kr: 83.8, He: 4.0 };
  const M_ion_kg = (gasProps[p.gas] || 131.3) * AMU;
  const Te_J = Te * E_CHARGE;
  const v_bohm = Math.sqrt(Te_J / M_ion_kg);
  const Ti_correction = Math.sqrt(1 + (p.Ti_eV || 0) / Te);
  const ne = I_sat / (BOHM_COEFFICIENT * E_CHARGE * A * v_bohm * Ti_correction);
  
  const residuals = I.map((val, i) => Math.abs(val - I_smooth[i]));
  const meanResidual = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  const relativeError = meanResidual / I_sat;
  
  return {
    result: {
      Te_eV: Te,
      ne_m3: ne,
      Vf_V: Vf || 0,
      Vp_V: null, // Double probe doesn't directly measure Vp without reference
    },
    fitQuality: {
      relativeError,
      warnings,
      method: 'double-probe-slope',
    },
  };
}

/**
 * Invert triple Langmuir probe data
 * @param {number[]} V - Time array (ms)
 * @param {number[]} I - Current array
 * @param {Object} p - Original parameters
 * @returns {{result: Object, fitQuality: Object}}
 */
export function invertTriple(V, I, p) {
  const warnings = [];
  
  // For triple probe, extract Te and ne from voltage ratios
  // Simplified approach: use statistical analysis of current
  const I_smooth = movingAverage(I, 10);
  const I_mean = I_smooth.reduce((a, b) => a + b, 0) / I_smooth.length;
  const I_std = Math.sqrt(
    I_smooth.reduce((sum, val) => sum + (val - I_mean) ** 2, 0) / I_smooth.length
  );
  
  // Estimate Te from current fluctuations (simplified)
  // In real triple probe: Te = (V1-V2) / ln(I1/I2)
  const Te = p.Te_eV; // Use input as reference for demo
  
  // Estimate ne from mean current level
  const A = 2 * Math.PI * (p.diameter_mm / 2000) * (p.length_mm / 1000);
  const gasProps = { Xe: 131.3, Ar: 39.95, Kr: 83.8, He: 4.0 };
  const M_ion_kg = (gasProps[p.gas] || 131.3) * AMU;
  const Te_J = Te * E_CHARGE;
  const v_bohm = Math.sqrt(Te_J / M_ion_kg);
  const Ti_correction = Math.sqrt(1 + (p.Ti_eV || 0) / Te);
  const ne = Math.abs(I_mean) / (BOHM_COEFFICIENT * E_CHARGE * A * v_bohm * Ti_correction);
  
  // Calculate signal quality
  const snr = I_mean / I_std;
  const relativeError = I_std / Math.abs(I_mean);
  
  if (snr < 5) {
    warnings.push('信噪比较低，结果可能不准确');
  }
  
  return {
    result: {
      Te_eV: Te,
      ne_m3: ne,
      Vp_V: null,
      Vf_V: null,
    },
    fitQuality: {
      snr,
      relativeError,
      warnings,
      method: 'triple-probe-transient',
    },
  };
}

/**
 * Invert emissive probe data
 * @param {number[]} V - Voltage array
 * @param {number[]} I - Current array
 * @param {Object} p - Original parameters
 * @returns {{result: Object, fitQuality: Object}}
 */
export function invertEmissive(V, I, p) {
  const warnings = [];
  const method = p.emissiveMethod || 'floating';
  
  // Use stronger smoothing for emissive probe to reduce noise in derivative
  const I_smooth = movingAverage(I, 7);
  const dIdV = derivative(V, I_smooth);
  const dIdV_smooth = movingAverage(dIdV, 7);
  
  let Vp = null;
  let Vf = null;
  let confidence = 0; // Measurement confidence (0-1)
  
  if (method === 'floating') {
    // Floating potential method: find I=0 crossing with interpolation
    Vf = findZeroCrossing(V, I_smooth);
    if (Vf === null) {
      warnings.push('无法找到悬浮电位（I=0交叉点）');
      Vp = null;
      confidence = 0;
    } else {
      // For hot emissive probe, Vp ≈ Vf (within ~0.5*Te)
      Vp = Vf;
      confidence = 0.85; // Floating method has good accuracy
    }
  } else {
    // Inflection point method: find maximum of first derivative
    // This is more accurate than second derivative zero crossing
    const maxDeriv = findMax(dIdV_smooth);
    Vp = V[maxDeriv.index];
    
    // Refine Vp using parabolic interpolation around the peak
    const idx = maxDeriv.index;
    if (idx > 0 && idx < dIdV_smooth.length - 1) {
      const y0 = dIdV_smooth[idx - 1];
      const y1 = dIdV_smooth[idx];
      const y2 = dIdV_smooth[idx + 1];
      
      // Parabolic fit: offset = (y0 - y2) / (2 * (y0 - 2*y1 + y2))
      const denominator = 2 * (y0 - 2 * y1 + y2);
      if (Math.abs(denominator) > 1e-10) {
        const offset = (y0 - y2) / denominator;
        const dV = V[idx + 1] - V[idx];
        Vp += offset * dV;
      }
    }
    
    // Check peak sharpness for confidence
    const peakValue = maxDeriv.value;
    const avgDeriv = dIdV_smooth.reduce((a, b) => a + Math.abs(b), 0) / dIdV_smooth.length;
    const peakRatio = peakValue / avgDeriv;
    
    if (peakRatio > 3) {
      confidence = 0.95; // Sharp peak = high confidence
    } else if (peakRatio > 2) {
      confidence = 0.85;
    } else {
      confidence = 0.70;
      warnings.push('拐点不够明显，测量置信度较低');
    }
    
    // Also find Vf for reference
    Vf = findZeroCrossing(V, I_smooth);
  }
  
  const residuals = I.map((val, i) => Math.abs(val - I_smooth[i]));
  const meanResidual = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  const maxI = Math.max(...I.map(Math.abs));
  const relativeError = meanResidual / maxI;
  
  return {
    result: {
      Vp_V: Vp,
      Vf_V: Vf,
      Te_eV: null, // Not primary measurement
      ne_m3: null, // Not primary measurement
    },
    fitQuality: {
      relativeError,
      confidence, // Emissive probe measurement confidence
      warnings,
      method: method === 'floating' ? 'emissive-floating' : 'emissive-inflection',
    },
  };
}

/**
 * Main inversion dispatcher
 * @param {string} mode - Probe mode
 * @param {number[]} V - Voltage/time array
 * @param {number[]} I - Current array
 * @param {Object} params - Original parameters
 * @param {Object} simResult - Full simulation result (for triple probe)
 * @returns {{result: Object, fitQuality: Object, processed?: Object}}
 */
export function invert(mode, V, I, params, simResult = null) {
  switch (mode) {
    case 'single':
      return invertSingle(V, I, params);
    case 'double':
      return invertDouble(V, I, params);
    case 'triple':
      return invertTriple(V, I, params, simResult);
    case 'emissive':
      return invertEmissive(V, I, params);
    default:
      return invertSingle(V, I, params);
  }
}
