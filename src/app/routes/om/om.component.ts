import { Component } from '@angular/core';
import { CardComponent } from '../../components';

@Component({
    selector: 'app-om',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './om.component.html'
})
export class OmComponent { }