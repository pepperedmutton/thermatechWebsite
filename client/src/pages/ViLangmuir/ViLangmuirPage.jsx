import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ViLangmuir.module.css';
import SimpleChart from '../../components/SimpleChart';
import logo from '../../assets/images/logo.jpg';
import { useI18n } from '../../i18n/i18n';
import { 
  DEFAULT_PARAMS, 
  normalizeParams, 
  validateParams, 
  // encodeParamsToQuery, // Reserved for future share link feature
  decodeParamsFromQuery
} from '../../lib/langmuir/params.js';
import { simulate } from '../../lib/langmuir/simulate.js';
import { invert } from '../../lib/langmuir/invert.js';

export default function ViLangmuirPage() {
  const { t } = useI18n();
  const [mode, setMode] = useState('single');
  const [params, setParams] = useState({ 
    ...DEFAULT_PARAMS, 
    ne_exp: '1e17', 
    emissiveMethod: 'floating',
    scanDuration_ms: 100,
    samplingRate_kHz: 10
  });
  const [ivData, setIvData] = useState(null);
  const [simResult, setSimResult] = useState(null); // Full simulation result
  const [processedData, setProcessedData] = useState(null); // Processed Te(t), ne(t)
  const [results, setResults] = useState(null);
  const [fitQuality, setFitQuality] = useState(null);
  const [status, setStatus] = useState(t('vi_langmuir.status.ready'));

  // Load params from URL on mount
  useEffect(() => {
    const decoded = decodeParamsFromQuery(window.location.search);
    if (decoded) {
      const normalized = normalizeParams(decoded);
      setParams(normalized);
      setMode(normalized.mode);
      setStatus(t('vi_langmuir.status.loadedFromUrl'));
    }
  }, [t]);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setParams(prev => ({ ...prev, mode: newMode }));
    // Clear previous results when switching probe mode
    setIvData(null);
    setSimResult(null);
    setProcessedData(null);
    setResults(null);
    setFitQuality(null);
    setStatus(t('vi_langmuir.status.modeSwitched'));
  };

  const handleStartScan = () => {
    const validation = validateParams(params);
    if (!validation.valid) {
      setStatus(t('vi_langmuir.status.validationFailed') + ': ' + validation.errors.join(', '));
      return;
    }

    setStatus(t('vi_langmuir.status.generating'));

    // Simulate
    const simData = simulate(params);
    setSimResult(simData); // Store full result
    setIvData({ x: simData.V, y: simData.I });

    // Invert
    const invertResult = invert(params.mode, simData.V, simData.I, params, simData);
    setResults(invertResult.result);
    setFitQuality(invertResult.fitQuality);
    
    // Store processed data for triple probe
    if (invertResult.processed) {
      setProcessedData(invertResult.processed);
    } else {
      setProcessedData(null);
    }

    const dataPointCount = params.mode === 'triple' ? Math.floor(params.scanDuration_ms * params.samplingRate_kHz) : params.nPoints;
    setStatus(`${t('vi_langmuir.status.scanComplete')} · ${t('vi_langmuir.status.mode')}: ${params.mode} · ${t('vi_langmuir.status.dataPoints')}: ${dataPointCount}`);
  };

  const handleReset = () => {
    setParams({ 
      ...DEFAULT_PARAMS, 
      ne_exp: '1e17', 
      emissiveMethod: 'floating',
      scanDuration_ms: 100,
      samplingRate_kHz: 10
    });
    setMode('single');
    setIvData(null);
    setSimResult(null);
    setProcessedData(null);
    setResults(null);
    setFitQuality(null);
    setStatus(t('vi_langmuir.status.reset'));
  };

  // Copy link feature - reserved for future use
  // const handleCopyLink = () => {
  //   const query = encodeParamsToQuery(params);
  //   const url = window.location.origin + window.location.pathname + query;
  //   navigator.clipboard.writeText(url).then(() => {
  //     setStatus(t('vi_langmuir.status.linkCopied'));
  //     setTimeout(() => setStatus(t('vi_langmuir.status.ready')), 2000);
  //   });
  // };

  return (
    <div className={styles.viContainer}>
      <Helmet>
        <title>{t('vi_langmuir.seoTitle')}</title>
        <meta name="description" content={t('vi_langmuir.seoDescription')} />
      </Helmet>

      <h1 className={styles.title}>{t('vi_langmuir.title')} · {t('vi_langmuir.subtitle')}</h1>
      
      <div className={styles.logoContainer}>
        <img src={logo} alt="Star Therma Tech Logo" className={styles.logo} />
        <div className={styles.helpText} style={{ margin: 0, flex: 1 }}>
          {t('vi_langmuir.helpText')}
        </div>
      </div>

      {/* Mode Tabs */}
      <div className={styles.tabs}>
        {[
          { key: 'single', label: t('vi_langmuir.modes.single') },
          { key: 'double', label: t('vi_langmuir.modes.double') },
          { key: 'triple', label: t('vi_langmuir.modes.triple') },
          { key: 'emissive', label: t('vi_langmuir.modes.emissive') },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.tab} ${mode === key ? styles.tabActive : ''}`}
            onClick={() => handleModeChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.mainLayout}>
        {/* Left Panel: Inputs */}
        <div className={styles.panel}>
          <div className={styles.panelTitle}>参数设置</div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>工质气体</label>
            <select 
              className={styles.select} 
              value={params.gas}
              onChange={(e) => handleParamChange('gas', e.target.value)}
            >
              <option value="Xe">Xe (氙)</option>
              <option value="Ar">Ar (氩)</option>
              <option value="Kr">Kr (氪)</option>
              <option value="He">He (氦)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>电子温度 T<sub>e</sub> (eV)</label>
            <input 
              type="number" 
              className={styles.input}
              value={params.Te_eV}
              onChange={(e) => handleParamChange('Te_eV', parseFloat(e.target.value))}
              step="0.1"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>电子密度 n<sub>e</sub> (m<sup>-3</sup>)</label>
            <input 
              type="text" 
              className={styles.input}
              value={params.ne_exp || '1e17'}
              onChange={(e) => {
                handleParamChange('ne_exp', e.target.value);
                const parsed = parseFloat(e.target.value);
                if (!isNaN(parsed)) {
                  handleParamChange('ne_m3', parsed);
                }
              }}
              placeholder="例如: 1e17, 5e16, 1.5e18"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>等离子体电位 V<sub>p</sub> (V)</label>
            <input 
              type="number" 
              className={styles.input}
              value={params.Vp_V}
              onChange={(e) => handleParamChange('Vp_V', parseFloat(e.target.value))}
              step="1"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>离子温度 T<sub>i</sub> (eV, 可选)</label>
            <input 
              type="number" 
              className={styles.input}
              value={params.Ti_eV}
              onChange={(e) => handleParamChange('Ti_eV', parseFloat(e.target.value))}
              step="0.1"
            />
          </div>

          {mode === 'emissive' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>测量方式</label>
              <select 
                className={styles.select} 
                value={params.emissiveMethod || 'floating'}
                onChange={(e) => handleParamChange('emissiveMethod', e.target.value)}
              >
                <option value="floating">悬浮电位法</option>
                <option value="inflection">拐点法</option>
              </select>
            </div>
          )}

          <div className={styles.panelTitle} style={{ marginTop: '20px' }}>扫描设置</div>
          
          {mode === 'triple' ? (
            // Triple probe: time-based scanning
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>扫描时长 (ms)</label>
                <input 
                  type="number" 
                  className={styles.input}
                  value={params.scanDuration_ms || 100}
                  onChange={(e) => handleParamChange('scanDuration_ms', parseFloat(e.target.value))}
                  step="10"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>采样率 (kHz)</label>
                <input 
                  type="number" 
                  className={styles.input}
                  value={params.samplingRate_kHz || 10}
                  onChange={(e) => handleParamChange('samplingRate_kHz', parseFloat(e.target.value))}
                  step="1"
                />
              </div>
            </>
          ) : (
            // Other probes: voltage scanning
            <>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>V<sub>min</sub> (V)</label>
                  <input 
                    type="number" 
                    className={styles.input}
                    value={params.vmin_V}
                    onChange={(e) => handleParamChange('vmin_V', parseFloat(e.target.value))}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>V<sub>max</sub> (V)</label>
                  <input 
                    type="number" 
                    className={styles.input}
                    value={params.vmax_V}
                    onChange={(e) => handleParamChange('vmax_V', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>数据点数</label>
                <input 
                  type="number" 
                  className={styles.input}
                  value={params.nPoints}
                  onChange={(e) => handleParamChange('nPoints', parseInt(e.target.value))}
                />
              </div>
            </>
          )}

          <div className={styles.panelTitle} style={{ marginTop: '20px' }}>真实性模拟</div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>噪声 (%)</label>
            <input 
              type="number" 
              className={styles.input}
              value={params.noisePct}
              onChange={(e) => handleParamChange('noisePct', parseFloat(e.target.value))}
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>漂移 (%)</label>
            <input 
              type="number" 
              className={styles.input}
              value={params.driftPct}
              onChange={(e) => handleParamChange('driftPct', parseFloat(e.target.value))}
              min="0"
              max="2"
              step="0.1"
            />
          </div>

          <div className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={params.rfOn}
              onChange={(e) => handleParamChange('rfOn', e.target.checked)}
            />
            <label>RF 纹波</label>
          </div>

          {params.rfOn && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>RF 幅度 (%)</label>
              <input 
                type="number" 
                className={styles.input}
                value={params.rfAmpPct}
                onChange={(e) => handleParamChange('rfAmpPct', parseFloat(e.target.value))}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          )}

          <div className={styles.actions}>
            <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleStartScan}>
              ▶ 开始扫描
            </button>
            <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleReset}>
              重置
            </button>
          </div>
        </div>

        {/* Center Panel: Plot */}
        <div className={styles.panel}>
          {mode === 'triple' && simResult?.channels ? (
            // Triple probe: show 3 channels
            <>
              <div className={styles.panelTitle}>原始测量信号（三通道）</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>
                    通道 1: 电压差 V<sub>d2</sub> (V) - 反映 T<sub>e</sub>
                  </div>
                  <SimpleChart 
                    data={{ x: simResult.V, y: simResult.channels.channel1_Vd2 }}
                    width={620}
                    height={150}
                    xlabel="时间 (ms)"
                    ylabel="V_d2 (V)"
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>
                    通道 2: 离子饱和电流 I (A) - 反映 n<sub>e</sub>
                  </div>
                  <SimpleChart 
                    data={{ x: simResult.V, y: simResult.channels.channel2_I }}
                    width={620}
                    height={150}
                    xlabel="时间 (ms)"
                    ylabel="I (A)"
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>
                    通道 3: 悬浮电位 V<sub>f2</sub> (V)
                  </div>
                  <SimpleChart 
                    data={{ x: simResult.V, y: simResult.channels.channel3_Vf2 }}
                    width={620}
                    height={150}
                    xlabel="时间 (ms)"
                    ylabel="V_f2 (V)"
                  />
                </div>
              </div>
            </>
          ) : (
            // Other probes: single IV curve
            <>
              <div className={styles.panelTitle}>I–V 特性曲线</div>
              <div className={styles.plotArea}>
                <SimpleChart 
                  data={ivData}
                  width={600}
                  height={400}
                  xlabel={mode === 'triple' ? '时间 t (ms)' : '电压 V (V)'}
                  ylabel="电流 I (A)"
                  forceOrigin={true}
                />
              </div>
            </>
          )}
          <div className={styles.statusLine}>{status}</div>
        </div>

        {/* Right Panel: Results */}
        <div className={styles.panel}>
          {mode === 'triple' && processedData ? (
            // Triple probe: show processed Te(t) and ne(t)
            <>
              <div className={styles.panelTitle}>处理后参数演化</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                    电子温度演化 T<sub>e</sub>(t)
                  </div>
                  <SimpleChart 
                    data={{ x: processedData.time_t, y: processedData.Te_t }}
                    width={280}
                    height={160}
                    xlabel="t (ms)"
                    ylabel="T_e (eV)"
                  />
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '6px' }}>
                    平均: {processedData.Te_mean.toFixed(2)} eV ± {processedData.Te_std.toFixed(2)} eV
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                    电子密度演化 n<sub>e</sub>(t)
                  </div>
                  <SimpleChart 
                    data={{ x: processedData.time_t, y: processedData.ne_t }}
                    width={280}
                    height={160}
                    xlabel="t (ms)"
                    ylabel="n_e (m⁻³)"
                  />
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                    平均: {processedData.ne_mean.toExponential(2)} m⁻³
                  </div>
                </div>
              </div>
              
              {fitQuality && (
                <div className={styles.fitQuality}>
                  <strong>波动分析</strong>
                  <div>Te 波动: {fitQuality.Te_fluctuation?.toFixed(1)}%</div>
                  <div>ne 波动: {fitQuality.ne_fluctuation?.toFixed(1)}%</div>
                  {fitQuality.warnings && fitQuality.warnings.length > 0 && (
                    <div className={styles.warning}>
                      ⚠ {fitQuality.warnings.join('; ')}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : results ? (
            // Other probes: show diagnostic results
            <>
              <div className={styles.panelTitle}>诊断结果</div>
              <div className={styles.resultsGrid}>
              {mode === 'single' && (
                <>
                  <ResultCard label="电子温度" value={results.Te_eV} unit="eV" />
                  <ResultCard label="电子密度" value={results.ne_m3} unit="m⁻³" scientific />
                  <ResultCard label="等离子体电位" value={results.Vp_V} unit="V" />
                  <ResultCard label="悬浮电位" value={results.Vf_V} unit="V" />
                </>
              )}
              
              {mode === 'double' && (
                <>
                  <ResultCard label="电子温度" value={results.Te_eV} unit="eV" />
                  <ResultCard label="电子密度" value={results.ne_m3} unit="m⁻³" scientific />
                  <ResultCard label="悬浮电位" value={results.Vf_V} unit="V" />
                  <ResultCard label="等离子体电位" value={results.Vp_V} unit="V" na />
                </>
              )}
              
              {mode === 'triple' && (
                <>
                  <ResultCard label="电子温度" value={results.Te_eV} unit="eV" />
                  <ResultCard label="电子密度" value={results.ne_m3} unit="m⁻³" scientific />
                </>
              )}
              
              {mode === 'emissive' && (
                <>
                  <ResultCard label="等离子体电位" value={results.Vp_V} unit="V" primary />
                  <ResultCard label="悬浮电位" value={results.Vf_V} unit="V" />
                  <ResultCard label="电子温度" value={results.Te_eV} unit="eV" na />
                  <ResultCard label="电子密度" value={results.ne_m3} unit="m⁻³" na />
                </>
              )}

              {fitQuality && (
                <div className={styles.fitQuality}>
                  <strong>拟合质量</strong>
                  <div>方法: {fitQuality.method}</div>
                  {fitQuality.Te_r2 !== undefined && <div>R²: {fitQuality.Te_r2.toFixed(3)}</div>}
                  {fitQuality.relativeError !== undefined && (
                    <div>相对误差: {(fitQuality.relativeError * 100).toFixed(2)}%</div>
                  )}
                  {fitQuality.warnings && fitQuality.warnings.length > 0 && (
                    <div className={styles.warning}>
                      ⚠ {fitQuality.warnings.join('; ')}
                    </div>
                  )}
                </div>
              )}
              </div>
            </>
          ) : (
            <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '40px' }}>
              点击"开始扫描"生成结果
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit, scientific, na, primary }) {
  return (
    <div className={styles.resultCard} style={primary ? { borderColor: '#2563eb', borderWidth: '2px' } : {}}>
      <div className={styles.resultLabel}>{label}</div>
      <div className={styles.resultValue}>
        {value === null || value === undefined || na ? (
          <span className={styles.resultNA}>N/A</span>
        ) : scientific ? (
          <>{value.toExponential(2)}<span className={styles.resultUnit}>{unit}</span></>
        ) : (
          <>{value.toFixed(2)}<span className={styles.resultUnit}>{unit}</span></>
        )}
      </div>
    </div>
  );
}
