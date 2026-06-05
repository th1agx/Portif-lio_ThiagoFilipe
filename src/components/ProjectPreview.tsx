import type { Project } from '../data/types'

export function ProjectPreview({ project }: { project: Project }) {
  if (project.screenshot) {
    return (
      <div className="h-full bg-gradient-to-br from-studio-elevated via-studio-royalDark/30 to-studio-purpleDark p-3">
        <div className="scanline h-full overflow-hidden rounded-md border border-white/10 bg-black/30 shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-studio-bg/85 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-studio-candy" />
            <span className="h-2.5 w-2.5 rounded-full bg-studio-purple" />
            <span className="h-2.5 w-2.5 rounded-full bg-studio-royal" />
            <span className="ml-auto font-mono text-[0.62rem] font-bold uppercase text-studio-muted">real capture</span>
          </div>
          <img
            src={project.screenshot}
            alt=""
            className={`h-[calc(100%-2.25rem)] w-full object-cover object-top ${
              project.id === 'produtos' ? 'scale-[1.28]' : 'scale-[1.04]'
            } origin-top transition duration-500 group-hover:scale-[1.34]`}
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  if (project.previewType === 'workflow') {
    return (
      <div className="grid h-full place-items-center bg-[linear-gradient(135deg,rgba(22,26,42,0.94),rgba(43,23,79,0.68))] p-5">
        <div className="grid w-full gap-3" aria-hidden="true">
          {['map', 'spec', 'plan', 'test', 'evidence'].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded border border-white/10 bg-black/20 px-3 py-2"
              style={{ animation: `studio-gradient 7s ease-in-out ${index * 0.28}s infinite alternate` }}
            >
              <span className="grid h-7 w-7 place-items-center rounded bg-studio-royal/20 font-mono text-xs text-studio-text shadow-glow">
                {index + 1}
              </span>
              <span className="font-mono text-xs font-bold uppercase text-studio-muted">{step}</span>
              <span
                className="ml-auto h-2 w-2 rounded-full bg-studio-candy shadow-candy"
                style={{ animation: `pulse ${1.6 + index * 0.15}s ease-in-out infinite` }}
              />
            </div>
          ))}
          <div className="mt-1 rounded border border-studio-royal/25 bg-studio-royal/10 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase text-studio-text">
            evidence-based delivery
          </div>
        </div>
      </div>
    )
  }

  if (project.previewType === 'terminal') {
    return (
      <div className="scanline h-full bg-[#080A12] p-4 font-mono text-xs">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-studio-candy" />
          <span className="h-2.5 w-2.5 rounded-full bg-studio-purple" />
          <span className="h-2.5 w-2.5 rounded-full bg-studio-royal" />
        </div>
        <div className="space-y-2 text-studio-muted" aria-hidden="true">
          <p>
            <span className="text-studio-candy">$</span> python auto_drive.py
          </p>
          {['detect_window: ready', 'input_loop: steering + throttle', 'route_cycle: continuous'].map((line, index) => (
            <p key={line} className="animate-pulse" style={{ animationDelay: `${index * 220}ms` }}>
              {line}
            </p>
          ))}
          <p className="text-studio-text">status: automation flow active</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['keyboard', 'control', 'loop'].map((step) => (
            <span key={step} className="rounded border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[0.62rem] uppercase text-studio-muted">
              {step}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (project.previewType === 'dashboard') {
    return (
      <div className="h-full bg-gradient-to-br from-studio-elevated to-studio-purpleDark/70 p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-3 w-24 rounded bg-white/20" />
          <span className="h-8 w-20 rounded bg-studio-candy/80" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded border border-white/10 bg-white/[0.06] p-3">
              <span className="mb-4 block h-3 w-12 rounded bg-studio-royal/70" />
              <span className="mb-2 block h-2 w-full rounded bg-white/15" />
              <span className="block h-2 w-2/3 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded border border-white/10 bg-black/20 p-3">
          <span className="block h-2 w-full rounded bg-white/15" />
          <span className="mt-2 block h-2 w-3/4 rounded bg-studio-royal/40" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid h-full place-items-center bg-gradient-to-br from-studio-elevated via-studio-royalDark/40 to-studio-purpleDark p-5">
      <div className="w-full rounded border border-white/10 bg-black/20 p-4">
        <div className="mb-3 h-3 w-28 rounded bg-studio-candy/75" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded bg-white/10" />
          <div className="space-y-2">
            <span className="block h-2 rounded bg-white/20" />
            <span className="block h-2 w-4/5 rounded bg-white/15" />
            <span className="block h-2 w-3/5 rounded bg-studio-royal/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
