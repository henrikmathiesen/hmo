import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-tracker',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './tracker.component.html'
})
export class TrackerComponent { 
    d = new Date('2025-05-02');
}