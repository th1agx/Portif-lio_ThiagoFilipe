import type { Locale } from '../data/types'

type LanguageToggleProps = {
  locale: Locale
  onChange: (locale: Locale) => void
}

export function LanguageToggle({ locale, onChange }: LanguageToggleProps) {
  return (
    <div className="flex rounded-md border border-white/10 bg-white/[0.05] p-1" aria-label="Language selector">
      {(['pt', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded px-2.5 py-1.5 text-xs font-bold transition ${
            locale === item ? 'bg-studio-royal text-white' : 'text-studio-muted hover:text-studio-text'
          }`}
          aria-pressed={locale === item}
        >
          {item === 'pt' ? '🇧🇷 PT' : '🇬🇧 EN'}
        </button>
      ))}
    </div>
  )
}
