import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [RouterLink, NgClass, RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {

    @Input() sizeCssClass = '';

}