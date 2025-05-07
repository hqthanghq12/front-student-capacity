import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementStyleServiceService {

  private elementStyles: Map<string, boolean> = new Map<string, boolean>();

  setElementStyle(elementId: string, display: boolean) {
    this.elementStyles.set(elementId, display);
  }

  getElementStyle(elementId: string): boolean {
    return !!this.elementStyles.get(elementId);
  }
}
