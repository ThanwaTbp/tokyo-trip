export type PlaceType = 'sight' | 'food' | 'exp' | 'shop' | 'stay'
export type ChecklistTab = 'pack' | 'prep' | 'app'

export interface Place {
  id: string
  name: string
  desc: string
  type: PlaceType
  emoji: string
  mapUrl: string
  imgUrl?: string | null
  order: number
  dayId: string
}

export interface TripDay {
  id: string
  dayNumber: number
  date: string
  title: string
  travelMode: string
  travelTitle: string
  travelDesc: string
  travelMapUrl: string
  places: Place[]
}

export interface BudgetItem {
  id: string
  category: string
  amount: number
  maxBudget: number
  color: string
  note: string
  order: number
}

export interface ChecklistItem {
  id: string
  text: string
  done: boolean
  order: number
  groupId: string
}

export interface ChecklistGroup {
  id: string
  name: string
  tab: ChecklistTab
  order: number
  items: ChecklistItem[]
}
