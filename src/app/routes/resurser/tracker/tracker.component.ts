import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateToDatePipe } from '../../../pipes';
import { RatingEnum, TrackerInterface } from '../../../models';

@Component({
    selector: 'app-tracker',
    imports: [DatePipe, FormsModule, NgbDatepickerModule, NgbDateToDatePipe],
    templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {
    trackerCalendarModel: NgbDateStruct = { day: 0, month: 0, year: 0 };
    ratingModel: RatingEnum = RatingEnum.placeholder;
    trackerModel: TrackerInterface[] = [];

    RatingEnum = RatingEnum;

    constructor(
        private calendar: NgbCalendar
    ) { }

    ngOnInit(): void {
        this.trackerCalendarModel = this.calendar.getToday();
    }

    onTrackerCalendarSelect(event: NgbDateStruct) {
        this.trackerCalendarModel = event;
        this.ratingModel = RatingEnum.placeholder;
    }

    onTrackerRatingSelect(event: string) {
        console.log(event);

        if (!event || event === RatingEnum.placeholder) {
            return;
        }

        this.ratingModel = (event as RatingEnum);

        console.log(
            this.trackerCalendarModel,
            this.ratingModel
        );

        this.setInTracker();
    }

    private setInTracker() {
        const trackerItem: TrackerInterface = {
            id: `${this.trackerCalendarModel?.year}_${this.trackerCalendarModel?.month}_${this.trackerCalendarModel?.day}`,
            rating: this.ratingModel,
            trackerCalendar: this.trackerCalendarModel
        };

        if (this.trackerModel.find(v => v.id === trackerItem.id)) {
            const isAtIndex = this.trackerModel.findIndex(v => v.id === trackerItem.id);
            const arrCopy = [...this.trackerModel];
            arrCopy.splice(isAtIndex, 1, trackerItem);
            this.trackerModel = arrCopy;
        } else {
            this.trackerModel.push(trackerItem);
        }

        console.log(this.trackerModel);
    }
}