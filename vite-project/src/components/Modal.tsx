import { ReactNode } from 'react'

type Props = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  actions?: ReactNode
}

export default function Modal({ open, title, children, onClose, actions }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative card w-full max-w-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">✕</button>
        </div>
        <div className="space-y-4">{children}</div>
        {actions && <div className="mt-5 flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  )
}
