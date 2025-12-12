/**
 * Simple SVG-based line chart component
 */
import React from 'react';

export default function SimpleChart({ data, width = 600, height = 400, xlabel = 'X', ylabel = 'Y', forceOrigin = false }) {
  if (!data || !data.x || !data.y || data.x.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        border: '1px solid #ddd', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f9f9f9',
      }}>
        <p>等待数据...</p>
      </div>
    );
  }

  const padding = { top: 20, right: 20, bottom: 50, left: 85 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  let xMin = Math.min(...data.x);
  let xMax = Math.max(...data.x);
  let yMin = Math.min(...data.y);
  let yMax = Math.max(...data.y);

  // Force origin to (0, 0) at center if requested
  if (forceOrigin) {
    // Make ranges symmetric around origin
    const maxAbsX = Math.max(Math.abs(xMin), Math.abs(xMax));
    const maxAbsY = Math.max(Math.abs(yMin), Math.abs(yMax));
    xMin = -maxAbsX;
    xMax = maxAbsX;
    yMin = -maxAbsY;
    yMax = maxAbsY;
  }

  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const xScale = (x) => padding.left + ((x - xMin) / xRange) * chartWidth;
  const yScale = (y) => padding.top + chartHeight - ((y - yMin) / yRange) * chartHeight;

  // Generate path
  const pathData = data.x.map((x, i) => {
    const px = xScale(x);
    const py = yScale(data.y[i]);
    return i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`;
  }).join(' ');

  // Grid lines
  const xTicks = 5;
  const yTicks = 5;
  const xTickValues = Array.from({ length: xTicks + 1 }, (_, i) => xMin + (xRange * i / xTicks));
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => yMin + (yRange * i / yTicks));

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ddd', background: '#fff' }}>
      {/* Grid */}
      <g stroke="#eee" strokeWidth="1">
        {xTickValues.map((x, i) => (
          <line key={`xgrid-${i}`} x1={xScale(x)} y1={padding.top} x2={xScale(x)} y2={height - padding.bottom} />
        ))}
        {yTickValues.map((y, i) => (
          <line key={`ygrid-${i}`} x1={padding.left} y1={yScale(y)} x2={width - padding.right} y2={yScale(y)} />
        ))}
      </g>

      {/* Axes */}
      <g stroke="#333" strokeWidth="2">
        {forceOrigin ? (
          // Draw axes through origin (0,0)
          <>
            <line x1={xScale(0)} y1={padding.top} x2={xScale(0)} y2={height - padding.bottom} />
            <line x1={padding.left} y1={yScale(0)} x2={width - padding.right} y2={yScale(0)} />
          </>
        ) : (
          // Draw axes at chart borders
          <>
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} />
          </>
        )}
      </g>

      {/* X ticks and labels */}
      <g fill="#333" fontSize="12" textAnchor="middle">
        {xTickValues.map((x, i) => (
          <g key={`xtick-${i}`}>
            <line 
              x1={xScale(x)} 
              y1={height - padding.bottom} 
              x2={xScale(x)} 
              y2={height - padding.bottom + 5} 
              stroke="#333" 
              strokeWidth="1"
            />
            <text x={xScale(x)} y={height - padding.bottom + 20}>
              {x.toFixed(1)}
            </text>
          </g>
        ))}
        <text x={width / 2} y={height - 10} fontSize="14" fontWeight="bold">
          {xlabel}
        </text>
      </g>

      {/* Y ticks and labels */}
      <g fill="#333" fontSize="12" textAnchor="end">
        {yTickValues.map((y, i) => (
          <g key={`ytick-${i}`}>
            <line 
              x1={padding.left - 5} 
              y1={yScale(y)} 
              x2={padding.left} 
              y2={yScale(y)} 
              stroke="#333" 
              strokeWidth="1"
            />
            <text x={padding.left - 10} y={yScale(y) + 4}>
              {y.toExponential(2)}
            </text>
          </g>
        ))}
        <text 
          x={20} 
          y={height / 2} 
          fontSize="14" 
          fontWeight="bold" 
          transform={`rotate(-90 20 ${height / 2})`}
          textAnchor="middle"
        >
          {ylabel}
        </text>
      </g>

      {/* Data line */}
      <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="2" />

      {/* Zero lines */}
      {yMin < 0 && yMax > 0 && (
        <line 
          x1={padding.left} 
          y1={yScale(0)} 
          x2={width - padding.right} 
          y2={yScale(0)} 
          stroke="#f00" 
          strokeWidth="1" 
          strokeDasharray="4"
        />
      )}
    </svg>
  );
}
