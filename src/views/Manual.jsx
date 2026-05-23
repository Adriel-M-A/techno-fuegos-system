import ReactMarkdown from 'react-markdown'
import manualContent from '../manual/manual.md?raw'

// Vista del manual de usuario interno que renderiza el contenido markdown
export default function Manual() {
  return (
    <div className="prose prose-zinc max-w-none p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
      <ReactMarkdown>{manualContent}</ReactMarkdown>
    </div>
  )
}
