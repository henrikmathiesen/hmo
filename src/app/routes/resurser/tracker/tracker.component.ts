import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NgbCalendar,
    NgbDatepickerModule,
    NgbDateStruct,
    NgbDatepickerNavigateEvent,
    NgbDatepicker,
    NgbDate
}
    from '@ng-bootstrap/ng-bootstrap';

import { RatingBadgeComponent } from '../../../components';
import { NgbDateToDatePipe } from '../../../pipes';
import { RatingEnum, TrackerInterface } from '../../../models';

@Component({
    selector: 'app-tracker',
    imports: [NgIf, NgClass, FormsModule, NgbDatepickerModule, DatePipe, NgbDateToDatePipe, RatingBadgeComponent],
    templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {
    trackerCalendarModel: NgbDateStruct = { day: 0, month: 0, year: 0 };
    trackerViewCalendarModel: NgbDateStruct = { day: 0, month: 0, year: 0 };
    ratingModel: RatingEnum = RatingEnum.placeholder;
    trackerModel: TrackerInterface[] = [];
    RatingEnum = RatingEnum;

    ratingForSelectedDay: RatingEnum = RatingEnum.placeholder;
    private readonly localStorageKey = 'hmo';

    constructor(
        private calendar: NgbCalendar
    ) { }

    ngOnInit(): void {
        this.trackerCalendarsSetModelToday();

        let trackersInLocalStorage = localStorage.getItem(this.localStorageKey);

        if (trackersInLocalStorage) {
            this.trackerModel = JSON.parse(trackersInLocalStorage);
        }

        this.updateRatingForSelectedDay();
    }

    //
    // Tracker Calendar

    onTrackerCalendarSelect(event: NgbDateStruct) {
        this.trackerCalendarModel = event;
        this.ratingModel = RatingEnum.placeholder;
        this.updateRatingForSelectedDay();
    }

    onTrackerCalendarNavigate(event: NgbDatepickerNavigateEvent, dpTrackerView: NgbDatepicker) {
        dpTrackerView.navigateTo(event.next);
    }

    onTrackerRatingSelect(event: string) {
        if (!event || event === RatingEnum.placeholder) {
            return;
        }

        this.ratingModel = (event as RatingEnum);

        this.setInTracker();
        this.updateRatingForSelectedDay();
    }

    //
    // Tracker View Calendar

    dpTrackerViewCustomDayGetCssClass(date: NgbDateStruct) {
        const id = this.getId(date);
        const item = this.trackerModel.filter(v => v.id === id)[0];

        if (!item) {
            return 'app-dp-custom-day--not-rated';
        }

        switch (item.rating) {
            case RatingEnum.stammer_helt: {
                return 'bg-success text-white';
            }
            case RatingEnum.stammer_delvis: {
                return 'bg-danger text-white';
            }
            case RatingEnum.stammer_inte: {
                return 'bg-primary text-white';
            }
            default: {
                return 'app-dp-custom-day--not-rated';
            }
        }
    }

    //
    // Other

    trackerCalendarsGoToToday(dpTracker: NgbDatepicker, dpTrackerView: NgbDatepicker) {
        this.trackerCalendarsSetModelToday();

        const today = this.calendar.getToday();

        dpTracker.navigateTo(today);
        dpTrackerView.navigateTo(today);

        this.ratingModel = RatingEnum.placeholder;
        this.updateRatingForSelectedDay();
    }

    private trackerCalendarsSetModelToday() {
        const today = this.calendar.getToday();

        this.trackerCalendarModel = today;
        this.trackerViewCalendarModel = today;
    }

    private setInTracker() {
        const trackerItem: TrackerInterface = {
            id: this.getId(this.trackerCalendarModel),
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

    private getId(date: NgbDateStruct) {
        return `${date.year}_${date.month}_${date.day}`;
    }

    private updateRatingForSelectedDay() {
        const idForSelectedDay = this.getId(this.trackerCalendarModel);
        const item = this.trackerModel.filter(v => v.id === idForSelectedDay)[0];

        if (item) {
            this.ratingForSelectedDay = item.rating;
        } else {
            this.ratingForSelectedDay = RatingEnum.placeholder;
        }
    }
}