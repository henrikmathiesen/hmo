import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

import { TrackerInterface, RatingEnum, MilestoneInterface, LocalstorageKeysEnum } from '../../models';
import { QuoteComponent } from '../quote/quote.component';
import { TrackerAchivementsComponent } from '../tracker-achivements/tracker-achivements.component';
import { NgbDateToDatePipe } from '../../pipes';

@Component({
    selector: 'app-tracker-milestones',
    imports: [NgIf, NgClass, QuoteComponent, TrackerAchivementsComponent],
    templateUrl: './tracker-milestones.component.html',
    styleUrls: ['./tracker-milestones.component.css']
})
export class TrackerMilestonesComponent implements OnInit {

    constructor(
        private ngbDateToDatePipe: NgbDateToDatePipe
    ) { }

    @Output() newMilesStonesSparkHappened = new EventEmitter(false);
    @Input() trackerModel: TrackerInterface[] = [];
    milestones: MilestoneInterface[] = [
        // EASY
        {
            idx: 0,
            label: 'A line in the sand',
            criteria: 'Allt börjar med några steg, 3 dagar utan rött.',
            achived: false,
            level: 1
        },
        {
            idx: 1,
            label: 'I walk the walk',
            criteria: 'Fortsätt, fortsätt, 30 dagar utan rött.',
            achived: false,
            level: 1
        },
        {
            idx: 2,
            label: 'Fuck OCD',
            criteria: 'Warrior, 60 dagar utan rött.',
            achived: false,
            level: 1
        },
        // Jokers
        {
            idx: 3,
            label: 'World will not end',
            criteria: '1 dag där det inte stämde ...',
            achived: false,
            level: 0
        },
        {
            idx: 4,
            label: 'Grinder',
            criteria: 'Kämpat i 6 månader.',
            achived: false,
            level: 0
        },
        {
            idx: 5,
            label: 'A lifestyle',
            criteria: 'Kämpat i 1 år.',
            achived: false,
            level: 0
        },
        // Medium
        {
            idx: 6,
            label: 'Barely legal',
            criteria: 'En dag i princip utan compulsions. Får man leva så?',
            achived: false,
            level: 2
        },
        {
            idx: 7,
            label: 'Only I can stop the rain',
            criteria: 'Minst 10 gröna dagar.',
            achived: false,
            level: 2
        },
        {
            idx: 8,
            label: 'Recovery is easy - compulsions are hard',
            criteria: 'Minst 30 gröna dagar.',
            achived: false,
            level: 2
        },
        // Hard
        {
            idx: 9,
            label: 'Living easy - living free',
            criteria: 'Minst 5 dagar i rad utan compulsions.',
            achived: false,
            level: 3
        },
        {
            idx: 10,
            label: 'Not a sicko',
            criteria: 'Minst 10 dagar i rad utan compulsions.',
            achived: false,
            level: 3
        },
        {
            idx: 11,
            label: 'The World is Yours!',
            criteria: 'Minst 20 dagar i rad utan compulsions.',
            achived: false,
            level: 3
        },
    ];

    achivedMilestones: MilestoneInterface[] = [];

    achivedMilestonesEasy: MilestoneInterface[] = [];
    achivedMilestonesJokers: MilestoneInterface[] = [];
    achivedMilestonesMedium: MilestoneInterface[] = [];
    achivedMilestonesHard: MilestoneInterface[] = [];

    newMilesStonesSpark = false;
    newMilesStonesSparkMark = false;

    ngOnInit() {
        const localStorageItem = localStorage.getItem(LocalstorageKeysEnum.milestones) || 0;

        this.checkMilestoneEasy(3, 0);
        this.checkMilestoneEasy(30, 1);
        this.checkMilestoneEasy(60, 2);

        this.checkMilestoneJokerOne();
        this.checkMilestoneJokerTwo();
        this.checkMilestoneJokerThree();

        this.checkMilestoneMedium(1, 6);
        this.checkMilestoneMedium(10, 7);
        this.checkMilestoneMedium(30, 8);

        this.checkMilestoneHard(5, 9);
        this.checkMilestoneHard(10, 10);
        this.checkMilestoneHard(20, 11);

        this.setAchivedMilestones();

        this.calculateUpdatedMilestones(+localStorageItem, this.achivedMilestones.length);

        localStorage.setItem(LocalstorageKeysEnum.milestones, this.achivedMilestones.length.toString());
    }

    private calculateUpdatedMilestones(old: number, current: number) {
        if (current > old) {
            setTimeout(() => { this.newMilesStonesSparkHappened.emit(true) });
            this.newMilesStonesSpark = true;
            this.newMilesStonesSparkMark = true;
            setTimeout(() => { this.newMilesStonesSparkMark = false; }, 5000);
        }
    }

    private setAchivedMilestones() {
        this.achivedMilestones = this.milestones.filter(v => v.achived === true);
        this.achivedMilestones = [...this.achivedMilestones.sort((a, b) => { return a.level - b.level })];

        this.achivedMilestonesEasy = this.achivedMilestones.filter(v => v.level === 1);
        this.achivedMilestonesJokers = this.achivedMilestones.filter(v => v.level === 0);
        this.achivedMilestonesMedium = this.achivedMilestones.filter(v => v.level === 2);
        this.achivedMilestonesHard = this.achivedMilestones.filter(v => v.level === 3);
    }

    private checkMilestoneEasy(nrOfDays: number, idx: number) {
        const stammerHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_helt);
        const stammerNastanHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_nastan_helt);
        const stammerDelvis = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_delvis);

        const both = [...stammerHelt, ...stammerDelvis, ...stammerNastanHelt];

        if (both.length >= nrOfDays) {
            this.milestones[idx].achived = true;
        }
    }

    private checkMilestoneJokerOne() {
        const stammerInte = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_inte);

        if (stammerInte.length > 0) {
            this.milestones[3].achived = true;
        }
    }

    private checkMilestoneJokerTwo() {
        if (this.trackerModel.length >= 180) {
            this.milestones[4].achived = true;
        }
    }

    private checkMilestoneJokerThree() {
        if (this.trackerModel.length >= 360) {
            this.milestones[5].achived = true;
        }
    }

    private checkMilestoneMedium(nrOfDays: number, idx: number) {
        const stammerHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_helt);

        if (stammerHelt.length >= nrOfDays) {
            this.milestones[idx].achived = true;
        }
    }

    private checkMilestoneHard(daysInRow: number, idx: number) {
        const stammerHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_helt);

        if (stammerHelt.length < daysInRow) {
            return;
        }

        const dates = stammerHelt.map(v => this.ngbDateToDatePipe.transform(v.date).getTime());
        dates.sort();

        const ONE_DAYS_MILLIS = 1000 * 60 * 60 * 24;

        let ocr =
            dates
                .map((ts, index) => ts - index * ONE_DAYS_MILLIS)
                .reduce((count: any, ts: any) => {
                    count[ts] = (count[ts] || 0) + 1;
                    return count;
                }, {});

        const result = Object.values(ocr).some((times: any) => times >= daysInRow);

        this.milestones[idx].achived = result;
    }
}