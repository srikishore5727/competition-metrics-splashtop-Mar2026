import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wifi, Link2, Sparkles, Search, ShieldCheck } from 'lucide-react';

interface SlideThankYouProps {
  onNavigateHome?: () => void;
}

export const ThankYouSlide = ({ onNavigateHome: _onNavigateHome }: SlideThankYouProps) => {
  const [connected, setConnected] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Generate stable particles once
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 5,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
      driftX: (Math.random() - 0.5) * 40,
      driftY: -(20 + Math.random() * 30),
    }))
  );

  useEffect(() => {
    const connectionTimer = setTimeout(() => setConnected(true), 1500);
    const footerTimer = setTimeout(() => setShowFooter(true), 2500);
    return () => {
      clearTimeout(connectionTimer);
      clearTimeout(footerTimer);
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">

      {/* ── 20 Floating Particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.18,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.18, 0.38, 0.18],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Main Content Column ── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-12 text-center">

        {/* ── Thank You Text Block (delay 1.5 s) ── */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* Sparkles icon with wobble loop */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-10 h-10 text-amber-500" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
            Thank You!
          </h1>

          {/* Subtitle (delay 1.8 s) */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 font-light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            Stay connected with insights that matter
          </motion.p>
        </motion.div>

        {/* ── Connection Row: [Search box] ── line ── [ShieldCheck box] ── */}
        <div className="flex items-center">

          {/* Left icon box — SEO / Search (slides in from left, delay 0) */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0, ease: 'easeOut' }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-blue-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl flex items-center justify-center">
              <Search className="w-9 h-9 text-white" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Connection line + dots + center icon */}
          <div className="relative w-60 h-2 mx-3 flex items-center">
            {/* The line itself — scales from origin-left when connected */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: connected ? 1 : 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />

            {/* Travelling dot 1: left → right */}
            {connected && (
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-lg z-10"
                style={{ top: '50%', y: '-50%' }}
                animate={{ left: ['4px', 'calc(100% - 4px)', '4px'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
              />
            )}

            {/* Travelling dot 2: right → left (0.75 s offset) */}
            {connected && (
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-emerald-500 shadow-lg z-10"
                style={{ top: '50%', y: '-50%' }}
                animate={{ left: ['calc(100% - 4px)', '4px', 'calc(100% - 4px)'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
              />
            )}

            {/* Center Link2 icon spins in */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center z-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: connected ? 1 : 0, rotate: connected ? 0 : -180 }}
              transition={{ duration: 0.45, delay: 0.25, ease: 'backOut' }}
            >
              <Link2 className="w-4 h-4 text-blue-500" />
            </motion.div>
          </div>

          {/* Right icon box — Fortinet / Security (slides in from right, delay 0) */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0, ease: 'easeOut' }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-emerald-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl flex items-center justify-center">
              <ShieldCheck className="w-9 h-9 text-white" strokeWidth={2} />
            </div>
          </motion.div>
        </div>

        {/* ── Status Indicator (delay 1.2 s) ── */}
        <motion.div
          className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Wifi
              className="w-5 h-5 transition-colors duration-700"
              style={{ color: connected ? '#10b981' : '#9ca3af' }}
            />
          </motion.div>
          <span
            className="text-sm font-medium transition-colors duration-700"
            style={{ color: connected ? '#059669' : '#6b7280' }}
          >
            {connected ? 'Connected Successfully' : 'Connecting...'}
          </span>
        </motion.div>
      </div>

      {/* ── Footer Gradient Line (delay 2.5 s) ── */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 h-px w-80 origin-center"
        style={{
          background: 'linear-gradient(to right, transparent, #d1d5db, transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showFooter ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
};

/** Named export expected by presentation.tsx */
export function SlideThankYou({ onNavigateHome }: SlideThankYouProps) {
  return <ThankYouSlide onNavigateHome={onNavigateHome} />;
}