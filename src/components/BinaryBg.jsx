import { useMemo } from 'react'

export default function BinaryBg({ opacity = 0.04, rows = 60, cols = 100, speed = 80 }) {
  const binary = useMemo(() => {
    const single = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.5 ? '1' : '0')).join(' '),
    ).join('\n')

    return `${single}\n${single}`
  }, [rows, cols])

  return (
    <div
      className="binary-bg absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <pre
        className="binary-stream whitespace-pre font-mono text-[10px] leading-[1.4] tracking-wider text-white"
        style={{ animationDuration: `${speed}s` }}
      >
        {binary}
      </pre>
    </div>
  )
}
