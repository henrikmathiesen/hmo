import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { BackLinkComponent, QuoteComponent, RatingBadgeComponent } from '../../../components';
import { LocalstorageKeysEnum, TrackerInterface, RatingEnum } from '../../../models';
import { TrackerStatistikQuotePipe, TrackerStatistikAntalDagarPipe, TrackerStatistikProcentDagarPipe, DisplayPercentPipe } from '../../../pipes';

@Component({
    selector: 'app-tracker-statistik',
    imports: [
        BackLinkComponent, 
        QuoteComponent, 
        RatingBadgeComponent, 
        TrackerStatistikQuotePipe, 
        TrackerStatistikAntalDagarPipe, 
        TrackerStatistikProcentDagarPipe,
        DisplayPercentPipe,
        NgFor
    ],
    templateUrl: './tracker-statistik.component.html'
})
export class TrackerStatistikComponent implements OnInit {
    private readonly localStorageKey = LocalstorageKeysEnum.tracker;
    trackerModel: TrackerInterface[] = [];
    ratingArr: string[] = [];

    ngOnInit(): void {
        let trackersInLocalStorage = localStorage.getItem(this.localStorageKey);

        if (trackersInLocalStorage) {
            this.trackerModel = JSON.parse(trackersInLocalStorage);
        }

        this.getRatingOptionsAsArr();
    }

    private getRatingOptionsAsArr() {
        Object.keys(RatingEnum).forEach((key) => {
            if (key !== 'placeholder') {
                this.ratingArr.push((RatingEnum as any)[key]);
            }
        });
    }

}