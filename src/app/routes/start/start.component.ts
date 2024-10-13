import { Component } from '@angular/core';
import { CardComponent } from '../../components';

@Component({
    selector: 'app-start',
    standalone: true,
    templateUrl: './start.component.html',
    imports: [CardComponent]
})
export class StartComponent { }