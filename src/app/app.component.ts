import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/layout/navbar/navbar.component";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { FloatingButtonsComponent } from './shared/floating-buttons/floating-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,FloatingButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Samy Mahrous';
}
