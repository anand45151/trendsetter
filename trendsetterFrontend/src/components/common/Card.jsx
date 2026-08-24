import React from 'react';

export default function Card({ 
  children, 
  title, 
  subtitle, 
  headerRight, 
  className = '', 
  variant = 'default',
  hasCorners = true,
  codeTag
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlight':
        return 'border-cyan-500/30 bg-[#121826]/90 shadow-[0_0_20px_rgba(0,240,255,0.05)]';
      case 'critical':
        return 'border-pink-500/40 bg-[#19111c]/90 shadow-[0_0_20px_rgba(255,0,85,0.08)]';
      default:
        return 'border-[#1e2638] bg-[#10141e]/90';
    }
  };

  return (
    <div 
      className={`relative border p-5 rounded-sm backdrop-blur-md transition-all duration-300 ${getVariantStyles()} ${className}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
    >
      {/* Corner Tech Accents */}
      {hasCorners && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff] opacity-80" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f0ff] opacity-80" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f0ff] opacity-80" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f0ff] opacity-80" />
        </>
      )}

      {/* Card Header */}
      {(title || subtitle || headerRight || codeTag) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a2233]">
          <div>
            {codeTag && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#00f0ff] block mb-1">
                // {codeTag}
              </span>
            )}
            {title && (
              <h3 className="font-display font-semibold text-sm tracking-wide text-gray-100 uppercase flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-mono text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      {/* Main Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
