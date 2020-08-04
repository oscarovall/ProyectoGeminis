import { Injectable } from '@angular/core';
import { Theme, light, dark } from '../../models/ui/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor() {
    this.setActiveTheme(this.active);
  }

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      // console.log('properties', property, this.active.properties[property]);
      document.documentElement.style.setProperty(property, this.active.properties[property]);
    });
  }
}
