import { Component } from '@angular/core';
import { CardComponent, QuoteComponent } from '../../components';

@Component({
    selector: 'app-resurser',
    standalone: true,
    imports: [CardComponent, QuoteComponent],
    templateUrl: './resurser.component.html'
})
export class ResurserComponent { }