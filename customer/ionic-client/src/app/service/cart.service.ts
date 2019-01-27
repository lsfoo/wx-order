import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  key: 'cart'

  constructor() {}
  getDate() {
    return localStorage.getItem(this.key)
  }
  setDate(data) {
    localStorage.setItem(this.key, data)
  }
  clearDate() {
    localStorage.removeItem(this.key)
  }
}
