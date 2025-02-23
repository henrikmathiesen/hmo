import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { BackLinkComponent, QuoteComponent, RatingBadgeComponent } from '../../../components';
import { FeatherIcon } from '../../../directives';
import { LocalstorageKeysEnum, TrackerInterface, RatingEnum } from '../../../models';
import {
    TrackerStatistikQuotePipe,
    TrackerStatistikAntalDagarPipe,
    TrackerStatistikProcentDagarPipe,
    DisplayPercentPipe,
    RatingAvaragePipe,
    RatingInPointsPipe
} from '../../../pipes';

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
        FeatherIcon,
        NgFor,
        NgIf
    ],
    providers: [RatingInPointsPipe, RatingAvaragePipe],
    templateUrl: './tracker-statistik.component.html',
    styleUrls: ['./tracker-statistik.component.css']
})
export class TrackerStatistikComponent implements OnInit {
    private readonly localStorageKeyTracker = LocalstorageKeysEnum.tracker;
    private readonly localStorageKeyAvarage = LocalstorageKeysEnum.avarage;

    trackerModel: TrackerInterface[] = [];
    ratingArr: string[] = [];
    currentAvarageRating = 0;
    prevAvarageRating = 0;

    moodIcon = '';

    constructor(
        private ratingAvaragePipe: RatingAvaragePipe
    ) { }

    ngOnInit(): void {
        this.setTrackerModel();

        this.getRatingOptionsAsArr();
        this.setPrevAvarageRating();
        this.setCurrentAvarageRating();
        this.setMoodIcon();
    }

    private setTrackerModel() {
        let trackersInLocalStorage = localStorage.getItem(this.localStorageKeyTracker);

        if (trackersInLocalStorage) {
            this.trackerModel = JSON.parse(trackersInLocalStorage);
        }
    }

    private getRatingOptionsAsArr() {
        Object.keys(RatingEnum).forEach((key) => {
            if (key !== 'placeholder') {
                this.ratingArr.push((RatingEnum as any)[key]);
            }
        });
    }

    private setPrevAvarageRating() {
        let prevAvarageRatingInLocalStorage = localStorage.getItem(this.localStorageKeyAvarage);

        if (prevAvarageRatingInLocalStorage) {
            this.prevAvarageRating = +prevAvarageRatingInLocalStorage;
        }
    }

    private setCurrentAvarageRating() {
        this.currentAvarageRating = this.ratingAvaragePipe.transform(this.trackerModel);
        localStorage.setItem(this.localStorageKeyAvarage, this.currentAvarageRating.toString());
    }

    private setMoodIcon() {
        if (this.currentAvarageRating >= 3) {
            this.moodIcon = 'sun';
            return;
        }

        if (this.currentAvarageRating >= 2) {
            this.moodIcon = 'umbrella';
            return;
        }

        if (this.currentAvarageRating >= 1) {
            this.moodIcon = 'cloud-lightning';
            return;
        }
    }

}