import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [NgIf],
  templateUrl: './floating-buttons.component.html',
  styleUrl: './floating-buttons.component.css'
})
export class FloatingButtonsComponent {
  showButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
