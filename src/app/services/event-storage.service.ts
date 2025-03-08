import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

interface EventData {
  title: string
  targetDate: Date
}

@Injectable({
  providedIn: 'root',
})
export class EventStorageService {
  private readonly STORAGE_KEY = 'eventData'

  private eventDataSubject = new BehaviorSubject<EventData>({
    title: 'Midsummer Eve',
    targetDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })

  eventData$ = this.eventDataSubject.asObservable()

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const savedData = localStorage.getItem(this.STORAGE_KEY)
    if (savedData) {
      const parsed = JSON.parse(savedData)
      parsed.targetDate = new Date(parsed.targetDate)
      this.eventDataSubject.next(parsed)
    }
  }

  updateEventData(data: Partial<EventData>) {
    const currentData = this.eventDataSubject.value
    const newData = { ...currentData, ...data }
    this.eventDataSubject.next(newData)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData))
  }
}
