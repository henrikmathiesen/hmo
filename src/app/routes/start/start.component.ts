import { Component } from '@angular/core';
import { CardComponent, QuoteComponent } from '../../components';

@Component({
    selector: 'app-start',
    standalone: true,
    templateUrl: './start.component.html',
    imports: [CardComponent, QuoteComponent]
})
export class StartComponent { }