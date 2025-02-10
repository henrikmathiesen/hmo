import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NgbCalendar,
    NgbDatepickerModule,
    NgbDateStruct,
    NgbDatepicker,
}
    from '@ng-bootstrap/ng-bootstrap';

import { RatingBadgeComponent, TrackerTekniskInfoComponent, TrackerMilestonesComponent } from '../../../components';
import { NgbDateToDatePipe } from '../../../pipes';
import { RatingEnum, TrackerInterface, LocalstorageKeysEnum } from '../../../models';
import { GetDeviceWidthService } from '../../../services';

@Component({
    selector: 'app-tracker',
    imports: [
        NgClass, FormsModule, NgbDatepickerModule, DatePipe, NgbDateToDatePipe,
        RatingBadgeComponent, TrackerTekniskInfoComponent, TrackerMilestonesComponent],
    providers: [NgbDateToDatePipe],
    templateUrl: './tracker.component.html',
    styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
    trackerCalendarModel: NgbDateStruct = { day: 0, month: 0, year: 0 };
    ratingModel: RatingEnum = RatingEnum.placeholder;
    trackerModel: TrackerInterface[] = [];
    RatingEnum = RatingEnum;
    datePickerDateIsTodayOrEarlier = false;

    ratingForSelectedDay: RatingEnum = RatingEnum.placeholder;
    private readonly localStorageKey = LocalstorageKeysEnum.tracker;

    constructor(
        private calendar: NgbCalendar,
        private ngbDateToDatePipe: NgbDateToDatePipe,
        private getDeviceWidthService: GetDeviceWidthService
    ) { }

    ngOnInit(): void {
        this.trackerCalendarSetModelToday();

        let trackersInLocalStorage = localStorage.getItem(this.localStorageKey);

        if (trackersInLocalStorage) {
            this.trackerModel = JSON.parse(trackersInLocalStorage);
        }

        this.updateRatingForSelectedDay();
        this.checkDatePickerDateIsTodayOrEarlier();
    }

    onTrackerCalendarSelect(event: NgbDateStruct) {
        this.trackerCalendarModel = event;
        this.ratingModel = RatingEnum.placeholder;
        this.updateRatingForSelectedDay();
        this.checkDatePickerDateIsTodayOrEarlier();
    }

    onTrackerRatingSelect(event: string) {
        if (!event || event === RatingEnum.placeholder) {
            return;
        }

        this.ratingModel = (event as RatingEnum);

        this.setInTracker();
        this.updateRatingForSelectedDay();
    }

    dpTrackerCustomDayGetCssClass(date: NgbDateStruct) {
        const id = this.getId(date);
        const item = this.trackerModel.filter(v => v.id === id)[0];

        if (!item) {
            return 'app-dp-custom-day--not-rated';
        }

        switch (item.rating) {
            case RatingEnum.stammer_helt: {
                return 'bg-success text-white';
            }
            case RatingEnum.stammer_nastan_helt: {
                return 'bg-warning text-white';
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

    trackerCalendarGoToToday(dpTracker: NgbDatepicker) {
        this.trackerCalendarSetModelToday();

        const today = this.calendar.getToday();

        dpTracker.navigateTo(today);

        this.ratingModel = RatingEnum.placeholder;
        this.updateRatingForSelectedDay();
        this.checkDatePickerDateIsTodayOrEarlier();
    }

    onNewMilesStonesSparkHappened(v: boolean) {
        const isMobileDesign = this.getDeviceWidthService.getIsMD() === false;

        if (v && isMobileDesign) {
            const el = document.getElementById('tracker-ms-scroll');

            if (el) {
                el.scrollIntoView();
            }
        }
    }

    private trackerCalendarSetModelToday() {
        const today = this.calendar.getToday();
        this.trackerCalendarModel = today;
    }

    private setInTracker() {
        const trackerItem: TrackerInterface = {
            id: this.getId(this.trackerCalendarModel),
            rating: this.ratingModel,
            date: {
                day: this.trackerCalendarModel.day,
                month: this.trackerCalendarModel.month,
                year: this.trackerCalendarModel.year
            }
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

    private checkDatePickerDateIsTodayOrEarlier() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const datepickerDate = this.ngbDateToDatePipe.transform(this.trackerCalendarModel);

        this.datePickerDateIsTodayOrEarlier = datepickerDate <= today;
    }
}