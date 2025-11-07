export type TableStatus = 'available' | 'occupied' | 'reserved'

export interface Table {
  id: string
  name: string
  seats: number
  status: TableStatus
  notes?: string
}
