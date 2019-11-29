import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening, name: string): void {
    shortening.name = name;
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  getShorteningById(id: string):any {
    return this.shortenings.filter(shortening => shortening.code === id)[0];
  }

  deleteShortening(shortening: Shortening) : boolean {
    const conf = confirm(`Do you really want to delete shortening ${shortening.name}`);
    if(!conf) return false;

    const shorteningPosition = this.shortenings.indexOf(shortening);
    if(shorteningPosition != -1) this.shortenings.splice(shorteningPosition,1);

    this.updateStorage(this.shortenings);
    return true;
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }
}
