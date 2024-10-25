import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { NavComponent } from './components';
import { FeatherIcon } from './directives';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FeatherIcon, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hjälp med OCD!';
  isStandAloneForm = false;

  onActivate(event: any) {
    this.isStandAloneForm = !!event.testForm;
  }
}
