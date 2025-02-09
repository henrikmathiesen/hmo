import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { FeatherIcon } from '../../directives';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    imports: [NgIf, FeatherIcon]
})
export class CardComponent {
    @Input() header = '';
    @Input() iconType: 'user' | 'book' | 'edit' | '' = '';
}