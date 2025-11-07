import { useEffect, useState } from 'react'
import { Table, TableStatus } from './types'

type Props = {
  initial?: Table | null
  onSubmit: (values: Omit<Table, 'id'>) => void
  onCancel?: () => void
}

export default function TableForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [seats, setSeats] = useState(initial?.seats ?? 2)
  const [status, setStatus] = useState<TableStatus>(initial?.status ?? 'available')
  const [notes, setNotes] = useState(initial?.notes ?? '')

  useEffect(() => {
    setName(initial?.name ?? '')
    setSeats(initial?.seats ?? 2)
    setStatus(initial?.status ?? 'available')
    setNotes(initial?.notes ?? '')
  }, [initial])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ name, seats: Number(seats), status, notes: notes || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Table Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Seats</label>
          <input type="number" min={1} value={seats} onChange={e => setSeats(Number(e.target.value))} required
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as TableStatus)}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Notes</label>
          <input value={notes} onChange={e => setNotes(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:opacity-90">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10">Cancel</button>}
      </div>
    </form>
  )
}
