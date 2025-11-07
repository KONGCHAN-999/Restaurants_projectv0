import { Table } from './types'

const KEY = 'restaurant_tables_v1'

export function loadTables(): Table[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) as Table[] : seed()
  } catch {
    return seed()
  }
}

export function saveTables(tables: Table[]) {
  localStorage.setItem(KEY, JSON.stringify(tables))
}

function seed(): Table[] {
  const sample: Table[] = [
    { id: crypto.randomUUID(), name: 'A1', seats: 2, status: 'available' },
    { id: crypto.randomUUID(), name: 'A2', seats: 4, status: 'occupied', notes: 'Birthday' },
    { id: crypto.randomUUID(), name: 'B1', seats: 6, status: 'reserved' },
  ]
  saveTables(sample)
  return sample
}
