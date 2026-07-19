import { Code2, ContactRound, Mail, FileDown } from 'lucide-react'
import { links } from '../data/links'
import type { Translation } from '../data/types'

export function Contact({ t }: { t: Translation }) {
  return (
    <section id="contato" className="px-4 py-32 sm:px-6 lg:px-8 bg-black text-[#F5F4EE] mt-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-16 justify-between items-start">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest2 text-[#F5F4EE]/60 mb-6">{t.contact.eyebrow}</p>
          <h2 className="font-display text-5xl font-black tracking-tightest sm:text-7xl mb-8">
            {t.contact.title}
          </h2>
          <p className="text-xl text-[#F5F4EE]/80 max-w-xl">
            {t.contact.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto mt-8 md:mt-0">
          <a href={links.email} className="group flex items-center justify-between border-b border-[#F5F4EE]/20 pb-4 text-2xl font-bold hover:border-[#F5F4EE] transition-colors">
            <span>{t.contact.emailLabel}</span>
            <Mail size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F5F4EE]/20 pb-4 text-2xl font-bold hover:border-[#F5F4EE] transition-colors">
            <span>{t.contact.linkedinLabel}</span>
            <ContactRound size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F5F4EE]/20 pb-4 text-2xl font-bold hover:border-[#F5F4EE] transition-colors">
            <span>{t.contact.githubLabel}</span>
            <Code2 size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
          <a href={links.resume} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#F5F4EE]/20 pb-4 text-2xl font-bold hover:border-[#F5F4EE] transition-colors">
            <span>{t.common.downloadResume}</span>
            <FileDown size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
      
      <footer className="mx-auto max-w-7xl mt-32 border-t border-[#F5F4EE]/20 pt-8 flex justify-between items-center text-sm font-medium text-[#F5F4EE]/60">
        <p>© {new Date().getFullYear()} Thiago Filipe</p>
        <p>Swiss Editorial Design</p>
      </footer>
    </section>
  )
}
