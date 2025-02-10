import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { NavComponent } from './components';
import { FeatherIcon } from './directives';
import { GetDeviceWidthService } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FeatherIcon, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Hjälp med OCD!';
  isStandAloneForm = false;

  constructor(
    private getDeviceWidthService: GetDeviceWidthService
  ) { }

  onActivate(event: any) {
    this.isStandAloneForm = !!event.testForm;
  }

  ngAfterViewInit() {
    const sm = document.getElementById('device-sm');
    const md = document.getElementById('device-md');
    const lg = document.getElementById('device-lg');

    const getElementIsNotHidden = (el: any) => window.getComputedStyle(el, null).display === 'block';

    this.getDeviceWidthService.setIsSM(getElementIsNotHidden(sm));
    this.getDeviceWidthService.setIsMD(getElementIsNotHidden(md));
    this.getDeviceWidthService.setIsLG(getElementIsNotHidden(lg));
  }
}
