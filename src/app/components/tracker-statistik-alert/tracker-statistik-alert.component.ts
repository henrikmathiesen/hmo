import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { TrackerStatistikAntalDagarPipe, TrackerStatistikProcentDagarPipe, DisplayPercentPipe } from '../../pipes';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';
import { TrackerInterface } from '../../models';

@Component({
    selector: 'app-tracker-statistik-alert',
    imports: [
        RatingBadgeComponent, 
        TrackerStatistikAntalDagarPipe, 
        TrackerStatistikProcentDagarPipe, 
        DisplayPercentPipe,
        NgIf,
        NgFor
    ],
    providers: [],
    templateUrl: './tracker-statistik-alert.component.html',
})
export class TrackerStatistikAlertComponent implements OnInit {
    @Input() trackerModel: TrackerInterface[] = [];
    @Input() ratingArr: string[] = [];
    @Input() displayPercent = false;
    label = 'Antal dagar med rating';

    ngOnInit(): void {
        if (this.displayPercent) {
            this.label = 'Procent dagar med rating';
        }
    }
}