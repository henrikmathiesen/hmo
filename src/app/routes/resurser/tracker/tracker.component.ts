import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateToDatePipe } from '../../../pipes';
import { RatingEnum, TrackerInterface } from '../../../models';

@Component({
    selector: 'app-tracker',
    imports: [NgIf, FormsModule, NgbDatepickerModule, DatePipe, NgbDateToDatePipe],
    templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {
    trackerCalendarModel: NgbDateStruct = { day: 0, month: 0, year: 0 };
    ratingModel: RatingEnum = RatingEnum.placeholder;
    trackerModel: TrackerInterface[] = [];
    RatingEnum = RatingEnum;

    ratingForSelectedDay: RatingEnum = RatingEnum.placeholder;
    private readonly localStorageKey = 'hmo';

    constructor(
        private calendar: NgbCalendar
    ) { }

    ngOnInit(): void {
        this.trackerCalendarModel = this.calendar.getToday();

        let trackersInLocalStorage = localStorage.getItem(this.localStorageKey);
        
        if (trackersInLocalStorage) {
            this.trackerModel = JSON.parse(trackersInLocalStorage);
        }

        this.updateRatingForSelectedDay();
    }

    onTrackerCalendarSelect(event: NgbDateStruct) {
        this.trackerCalendarModel = event;
        this.ratingModel = RatingEnum.placeholder;
        this.updateRatingForSelectedDay();
    }

    onTrackerRatingSelect(event: string) {
        if (!event || event === RatingEnum.placeholder) {
            return;
        }

        this.ratingModel = (event as RatingEnum);

        this.setInTracker();
        this.updateRatingForSelectedDay();
    }

    private setInTracker() {
        const trackerItem: TrackerInterface = {
            id: this.getId(),
            rating: this.ratingModel
        };

        if (this.trackerModel.find(v => v.id === trackerItem.id)) {
            const isAtIndex = this.trackerModel.findIndex(v => v.id === trackerItem.id);
            const arrCopy = [...this.trackerModel];
            arrCopy.splice(isAtIndex, 1, trackerItem);
            this.trackerModel = arrCopy;
        } else {
            this.trackerModel.push(trackerItem);
        }

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.trackerModel));
    }

    private getId() {
        return `${this.trackerCalendarModel.year}_${this.trackerCalendarModel.month}_${this.trackerCalendarModel.day}`;
    }

    private updateRatingForSelectedDay() {
        const idForSelectedDay = this.getId();
        const item = this.trackerModel.filter(v => v.id === idForSelectedDay)[0];

        if (item) {
            this.ratingForSelectedDay = item.rating;
        } else {
            this.ratingForSelectedDay = RatingEnum.placeholder;
        }
    }
}