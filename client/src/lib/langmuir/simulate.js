/**
 * @fileoverview IV curve simulation for Langmuir probe
 * @module lib/langmuir/simulate
 */

import { GAS_PROPERTIES, generateSeed } from './params.js';

// Physical constants
const E0 = 8.854e-12; // Permittivity of free space (F/m)
const E_CHARGE = 1.602e-19; // Elementary charge (C)
const K_B = 1.381e-23; // Boltzmann constant (J/K)
const M_E = 9.109e-31; // Electron mass (kg)
const AMU = 1.661e-27; // Atomic mass unit (kg)

// Collection efficiency coefficients (theoretical values)
// Bohm coefficient for ion collection
const BOHM_COEFFICIENT = 0.61;
// Electron collection coefficient (1/4 of random flux)
const ELECTRON_COEFFICIENT = 0.25;

/**
 * Seeded pseudo-random number generator (Mulberry32)
 */
class SeededRandom {
  constructor(seed) {
    this.seed = seed >>> 0;
  }
  
  next() {
    let t = this.seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  
  gaussian() {
    // Box-Muller transform
    const u1 = this.next();
    const u2 = this.next();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}

/**
 * Calculate probe collection area (cylindrical)
 * @param {Object} p - Parameters
 * @returns {number} Area in m^2
 */
function getProbeArea(p) {
  const r_m = p.diameter_mm / 2000; // radius in meters
  const l_m = p.length_mm / 1000;   // length in meters
  return 2 * Math.PI * r_m * l_m; // Cylindrical surface area
}

/**
 * Calculate ion saturation current
 * @param {Object} p - Parameters
 * @returns {number} Current in A
 */
function getIonSaturation(p) {
  const A = getProbeArea(p);
  const gasProps = GAS_PROPERTIES[p.gas] || GAS_PROPERTIES.Xe;
  const M_ion = gasProps.mass * AMU;
  const Ti_J = p.Ti_eV * E_CHARGE;
  const Te_J = p.Te_eV * E_CHARGE;
  
  // Ion thermal velocity considering ion temperature
  const v_th_i = Math.sqrt(8 * Ti_J / (Math.PI * M_ion));
  
  // Ion saturation current density (Bohm flux with Ti correction)
  // j_i = 0.61 * e * n * sqrt(k*Te / M_ion) * sqrt(1 + Ti/Te)
  // The 0.61 factor comes from integrating the ion velocity distribution
  // over the sheath entrance (Bohm criterion)
  const v_bohm = Math.sqrt(Te_J / M_ion);
  const Ti_correction = Math.sqrt(1 + p.Ti_eV / p.Te_eV);
  const j_ion = BOHM_COEFFICIENT * E_CHARGE * p.ne_m3 * v_bohm * Ti_correction;
  
  return -j_ion * A; // Negative because ion current
}

/**
 * Calculate electron current (retarding region + saturation with knee at Vp)
 * @param {number} V - Applied voltage (V)
 * @param {Object} p - Parameters
 * @returns {number} Current in A
 */
function getElectronCurrent(V, p) {
  const A = getProbeArea(p);
  const Te_J = p.Te_eV * E_CHARGE;
  
  // Electron thermal velocity
  const v_th_e = Math.sqrt(8 * Te_J / (Math.PI * M_E));
  
  // Electron saturation current density (1/4 random flux)
  // j_e_sat = 0.25 * e * n * v_th_e
  const j_e_sat = ELECTRON_COEFFICIENT * E_CHARGE * p.ne_m3 * v_th_e;
  const I_e_sat = j_e_sat * A;
  
  if (V < p.Vp_V) {
    // Retarding region: exponential growth
    const expFactor = Math.exp((V - p.Vp_V) / p.Te_eV);
    return I_e_sat * expFactor;
  } else {
    // Saturation region: smooth transition with knee effect
    // Use tanh to create smooth knee at Vp
    const deltaV = V - p.Vp_V;
    const kneeWidth = 2 * p.Te_eV; // Knee width ~2*Te
    const saturationFactor = 1 + 0.2 * Math.tanh(deltaV / kneeWidth); // Slight increase after knee
    return I_e_sat * saturationFactor;
  }
}

/**
 * Simulate single Langmuir probe IV curve
 * @param {Object} p - Parameters
 * @returns {{V: number[], I: number[], meta: Object}}
 */
export function simulateSingle(p) {
  const rng = new SeededRandom(generateSeed(p));
  const V = [];
  const I = [];
  
  const I_ion_sat = getIonSaturation(p);
  
  for (let i = 0; i < p.nPoints; i++) {
    const v = p.vmin_V + (p.vmax_V - p.vmin_V) * i / (p.nPoints - 1);
    V.push(v);
    
    let current = I_ion_sat; // Start with ion saturation
    
    // Add electron current (starts significant ~5*Te below Vp)
    if (v > p.Vp_V - 5 * p.Te_eV) {
      current += getElectronCurrent(v, p);
    }
    
    // Apply realism effects
    if (p.noisePct > 0) {
      const noise = rng.gaussian() * (p.noisePct / 100) * Math.abs(current);
      current += noise;
    }
    
    if (p.driftPct > 0) {
      const drift = (i / p.nPoints) * (p.driftPct / 100) * Math.abs(I_ion_sat);
      current += drift;
    }
    
    if (p.rfOn && p.rfAmpPct > 0) {
      const rfPhase = 2 * Math.PI * i / 20; // ~10 cycles
      const rfAmp = (p.rfAmpPct / 100) * Math.abs(current);
      current += rfAmp * Math.sin(rfPhase);
    }
    
    I.push(current);
  }
  
  return {
    V,
    I,
    meta: {
      I_ion_sat,
      probeArea_m2: getProbeArea(p),
    },
  };
}

/**
 * Simulate double Langmuir probe (differential)
 * Double probe measures floating potential shifts
 * Negative bias collects negative current, positive bias collects positive current
 * @param {Object} p - Parameters
 * @returns {{V: number[], I: number[], meta: Object}}
 */
export function simulateDouble(p) {
  const rng = new SeededRandom(generateSeed(p));
  const V = [];
  const I = [];
  
  const I_ion_sat = getIonSaturation(p);
  const I_sat = Math.abs(I_ion_sat); // Saturation current magnitude
  
  for (let i = 0; i < p.nPoints; i++) {
    const v = p.vmin_V + (p.vmax_V - p.vmin_V) * i / (p.nPoints - 1);
    V.push(v);
    
    // Double probe: symmetric characteristic around V=0 (floating)
    // I = I_sat * tanh(v / (2*Te))
    // Negative V → negative current (ion collection on biased probe)
    // Positive V → positive current (electron collection on biased probe)
    const normalized = v / (2 * p.Te_eV);
    let current = I_sat * Math.tanh(normalized);
    
    // Apply realism
    if (p.noisePct > 0) {
      const noise = rng.gaussian() * (p.noisePct / 100) * I_sat;
      current += noise;
    }
    
    if (p.driftPct > 0) {
      const drift = (i / p.nPoints) * (p.driftPct / 100) * I_sat;
      current += drift;
    }
    
    if (p.rfOn && p.rfAmpPct > 0) {
      const rfPhase = 2 * Math.PI * i / 20;
      const rfAmp = (p.rfAmpPct / 100) * I_sat;
      current += rfAmp * Math.sin(rfPhase);
    }
    
    I.push(current);
  }
  
  return {
    V,
    I,
    meta: {
      I_sat,
      probeArea_m2: getProbeArea(p),
    },
  };
}

/**
 * Simulate triple Langmuir probe
 * Triple probe: instantaneous measurement with 3-channel time-resolved signals
 * Returns three channels: Vd2 (voltage), I (current), Vf2 (floating potential)
 * @param {Object} p - Parameters
 * @returns {{V: number[], I: number[], channels: Object, meta: Object}}
 */
export function simulateTriple(p) {
  const rng = new SeededRandom(generateSeed(p));
  const V = []; // Time array
  const I = []; // Main display current (channel 2)
  
  const duration_ms = p.scanDuration_ms || 100;
  const samplingRate_kHz = p.samplingRate_kHz || 10;
  const nSamples = Math.floor(duration_ms * samplingRate_kHz);
  const dt_ms = 1 / samplingRate_kHz; // Time step in ms
  
  // Calculate steady-state values
  const I_ion_sat = getIonSaturation(p);
  const A = getProbeArea(p);
  const Te_J = p.Te_eV * E_CHARGE;
  const v_th_e = Math.sqrt(8 * Te_J / (Math.PI * M_E));
  const j_e_sat = ELECTRON_COEFFICIENT * E_CHARGE * p.ne_m3 * v_th_e;
  const I_e_sat = j_e_sat * A;
  
  // Three channels for triple probe
  const channel1_Vd2 = []; // Voltage difference (reflects Te)
  const channel2_I = [];   // Ion saturation current (reflects ne)
  const channel3_Vf2 = []; // Floating potential
  
  // Base values
  const Vd2_base = 2 * p.Te_eV; // Voltage difference ~ 2*Te
  const I_base = Math.abs(I_ion_sat);
  const Vf_base = p.Vp_V - 2.5 * p.Te_eV; // Floating potential
  
  for (let i = 0; i < nSamples; i++) {
    const t_ms = i * dt_ms;
    V.push(t_ms);
    
    // Add plasma turbulence and instabilities
    // Low frequency drift wave (1-10 kHz)
    const f_drift = 0.005 + 0.003 * rng.next(); // 5-8 kHz
    const drift_phase = 2 * Math.PI * f_drift * t_ms;
    const drift_amp = 0.15;
    
    // High frequency instability (50-100 kHz)
    const f_inst = 0.05 + 0.05 * rng.next(); // 50-100 kHz
    const inst_phase = 2 * Math.PI * f_inst * t_ms;
    const inst_amp = 0.08;
    
    // Channel 1: Vd2 (reflects Te variations)
    let Vd2 = Vd2_base;
    Vd2 += drift_amp * Vd2_base * Math.sin(drift_phase);
    Vd2 += inst_amp * Vd2_base * Math.sin(inst_phase);
    if (p.noisePct > 0) {
      Vd2 += rng.gaussian() * (p.noisePct / 100) * Vd2_base;
    }
    channel1_Vd2.push(Vd2);
    
    // Channel 2: I or VR (reflects ne variations)
    let current = I_base;
    current += drift_amp * I_base * Math.sin(drift_phase + 0.3); // Phase shift
    current += inst_amp * I_base * Math.sin(inst_phase + 0.5);
    if (p.noisePct > 0) {
      current += rng.gaussian() * (p.noisePct / 100) * I_base;
    }
    if (p.driftPct > 0) {
      current += (i / nSamples) * (p.driftPct / 100) * I_base;
    }
    channel2_I.push(current);
    I.push(current); // Main display
    
    // Channel 3: Vf2 (floating potential)
    let Vf2 = Vf_base;
    Vf2 += 0.5 * drift_amp * p.Te_eV * Math.sin(drift_phase + 0.6);
    Vf2 += 0.3 * inst_amp * p.Te_eV * Math.sin(inst_phase + 0.2);
    if (p.noisePct > 0) {
      Vf2 += rng.gaussian() * (p.noisePct / 100) * p.Te_eV;
    }
    channel3_Vf2.push(Vf2);
  }
  
  return {
    V, // Time array
    I, // Main current (channel 2)
    channels: {
      channel1_Vd2,
      channel2_I,
      channel3_Vf2,
    },
    meta: {
      isTimeSeries: true,
      isTripleProbe: true,
      duration_ms,
      samplingRate_kHz,
      Vd2_base,
      I_base,
      Vf_base,
      probeArea_m2: A,
    },
  };
}

/**
 * Simulate emissive probe
 * Shows inflection point at plasma potential
 * @param {Object} p - Parameters
 * @returns {{V: number[], I: number[], meta: Object}}
 */
export function simulateEmissive(p) {
  const rng = new SeededRandom(generateSeed(p));
  const V = [];
  const I = [];
  
  const I_ion_sat = getIonSaturation(p);
  
  for (let i = 0; i < p.nPoints; i++) {
    const v = p.vmin_V + (p.vmax_V - p.vmin_V) * i / (p.nPoints - 1);
    V.push(v);
    
    let current = I_ion_sat;
    
    // Below Vp: ion collection + emitted electrons reduce net current
    if (v < p.Vp_V) {
      const emissionFactor = 2.0; // Emission coefficient
      const emittedCurrent = emissionFactor * Math.abs(I_ion_sat) * Math.exp((v - p.Vp_V) / (0.5 * p.Te_eV));
      current += emittedCurrent;
    } else {
      // Above Vp: electron collection
      current += getElectronCurrent(v, p);
    }
    
    // Apply realism
    if (p.noisePct > 0) {
      const noise = rng.gaussian() * (p.noisePct / 100) * Math.abs(current);
      current += noise;
    }
    
    if (p.driftPct > 0) {
      const drift = (i / p.nPoints) * (p.driftPct / 100) * Math.abs(I_ion_sat);
      current += drift;
    }
    
    if (p.rfOn && p.rfAmpPct > 0) {
      const rfPhase = 2 * Math.PI * i / 20;
      const rfAmp = (p.rfAmpPct / 100) * Math.abs(current);
      current += rfAmp * Math.sin(rfPhase);
    }
    
    I.push(current);
  }
  
  return {
    V,
    I,
    meta: {
      I_ion_sat,
      probeArea_m2: getProbeArea(p),
    },
  };
}

/**
 * Main simulation dispatcher
 * @param {Object} p - Parameters
 * @returns {{V: number[], I: number[], meta: Object}}
 */
export function simulate(p) {
  switch (p.mode) {
    case 'single':
      return simulateSingle(p);
    case 'double':
      return simulateDouble(p);
    case 'triple':
      return simulateTriple(p);
    case 'emissive':
      return simulateEmissive(p);
    default:
      return simulateSingle(p);
  }
}
