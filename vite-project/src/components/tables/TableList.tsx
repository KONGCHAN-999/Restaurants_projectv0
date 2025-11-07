import { Table } from './types'

type Props = {
  items: Table[]
  onEdit: (item: Table) => void
  onDelete: (item: Table) => void
}

const statusBadge = (s: Table['status']) => {
  const map: Record<Table['status'], string> = {
    available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    occupied: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    reserved: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
  }
  return map[s]
}

export default function TableList({ items, onEdit, onDelete }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(t => (
        <div key={t.id} className="card p-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">{t.name}</div>
            <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(t.status)}`}>{t.status}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Seats: {t.seats}</div>
          {t.notes && <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Notes: {t.notes}</div>}
          <div className="mt-4 flex gap-2">
            <button onClick={() => onEdit(t)} className="px-3 py-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10">Edit</button>
            <button onClick={() => onDelete(t)} className="px-3 py-2 rounded-xl bg-rose-600 text-white hover:opacity-90">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
