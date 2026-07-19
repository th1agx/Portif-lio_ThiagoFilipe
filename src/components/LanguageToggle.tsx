import type { Locale } from '../data/types'

type LanguageToggleProps = {
  locale: Locale
  onToggle: (locale: Locale) => void
}

export function LanguageToggle({ locale, onToggle }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onToggle('pt')}
        className={`text-xs font-bold uppercase transition-colors ${
          locale === 'pt' ? 'text-vanilla-text' : 'text-vanilla-muted hover:text-vanilla-text'
        }`}
      >
        PT
      </button>
      <span className="text-vanilla-muted">/</span>
      <button
        type="button"
        onClick={() => onToggle('en')}
        className={`text-xs font-bold uppercase transition-colors ${
          locale === 'en' ? 'text-vanilla-text' : 'text-vanilla-muted hover:text-vanilla-text'
        }`}
      >
        EN
      </button>
    </div>
  )
}
