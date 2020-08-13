import { Injectable, EventEmitter } from '@angular/core';
import { Theme, light, dark } from '../../models/ui/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme;
  private availableThemes: Theme[] = [light, dark];
  changeTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {
    this.initTheme();
  }

  initTheme() {
    if (localStorage.getItem('theme') != null) {
      if (JSON.parse(localStorage.getItem('theme')) === 'light') {
        this.active = light;
      } else {
        this.active = dark;
      }
    } else {
      this.active = light;
    }
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
    if (this.active === light) {
      localStorage.setItem('theme', JSON.stringify('light'));
    } else {
      localStorage.setItem('theme', JSON.stringify('dark'));
    }

    this.changeTheme.emit(this.active);

    Object.keys(this.active.properties).forEach(property => {
      // console.log('properties', property, this.active.properties[property]);
      document.documentElement.style.setProperty(property, this.active.properties[property]);
    });
  }
}
