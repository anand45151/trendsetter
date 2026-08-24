import React from 'react';

export default function Sparkline({ 
  data = [20, 45, 28, 80, 50, 95, 70, 110], 
  color = '#00f0ff', 
  height = 80,
  fillGradient = true,
  strokeWidth = 2.5,
  showDots = false
}) {
  const width = 300;
  const padding = 10;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Generate SVG path smooth bezier control points
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x, y, val };
  });

  // Build SVG path string with smooth cubic bezier curve
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const mx = (curr.x + next.x) / 2;
    const my = (curr.y + next.y) / 2;
    d += ` Q ${curr.x} ${curr.y}, ${mx} ${my}`;
  }
  d += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;

  const closedPath = `${d} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const gradientId = `sparkline-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full relative overflow-hidden">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto overflow-visible"
        style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillGradient ? 0.35 : 0} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path d={closedPath} fill={`url(#${gradientId})`} />

        {/* Curved Stroke */}
        <path 
          d={d} 
          fill="none" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Data points */}
        {showDots && points.map((p, idx) => (
          <circle 
            key={idx}
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#0b0e14"
            stroke={color}
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
}
