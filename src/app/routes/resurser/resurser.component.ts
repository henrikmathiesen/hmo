import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, QuoteComponent } from '../../components';

@Component({
    selector: 'app-resurser',
    imports: [CardComponent, QuoteComponent, RouterLink],
    templateUrl: './resurser.component.html'
})
export class ResurserComponent { }