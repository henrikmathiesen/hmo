import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { TrackerInterface, RatingEnum, MilestoneInterface } from '../../models';
import { FeatherIcon } from '../../directives';
import { QuoteComponent } from '../quote/quote.component';

@Component({
    selector: 'app-tracker-milestones',
    imports: [NgIf, NgFor, FeatherIcon, QuoteComponent],
    templateUrl: 'tracker-milestones.component.html'
})
export class TrackerMilestonesComponent implements OnInit {
    @Input() trackerModel: TrackerInterface[] = [];
    milestones: MilestoneInterface[] = [
        // Easy
        {
            idx: 0,
            label: 'A line in the sand',
            criteria: 'Minst 3 dagar med Stämmer helt eller Stämmer delvis',
            achived: false,
        },
        {
            idx: 1,
            label: 'I walk the walk',
            criteria: 'Minst 20 dagar med Stämmer helt eller Stämmer delvis',
            achived: false,
        },
        {
            idx: 2,
            label: 'Fuck OCD',
            criteria: 'Minst 40 dagar med Stämmer helt eller Stämmer delvis',
            achived: false,
        },
        // Jokers
        {
            idx: 3,
            label: 'World will not end',
            criteria: 'En dag där det inte stämde ...',
            achived: false,
        },
        {
            idx: 4,
            label: 'Grinder',
            criteria: 'Kämpat i 6 månader',
            achived: false,
        },
        {
            idx: 5,
            label: 'A lifestyle',
            criteria: 'Kämpat i 1 år',
            achived: false,
        },
        // Medium
    ];

    achivedMilestones: MilestoneInterface[] = [];

    ngOnInit() {
        this.checkMilestoneEasy(3, 0);
        this.checkMilestoneEasy(20, 1);
        this.checkMilestoneEasy(40, 2);

        this.checkMilestoneJokerOne();
        this.checkMilestoneJokerTwo();
        this.checkMilestoneJokerThree();

        this.setAchiveMilestones();
    }

    trackByFn(index: number, item: MilestoneInterface) {
        return item.idx;
    }

    private setAchiveMilestones() {
        this.achivedMilestones = this.milestones.filter(v => v.achived === true);
        console.log(this.achivedMilestones);
    }

    private checkMilestoneEasy(nrOfDays: number, idx: number) {
        const stammerHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_helt);
        const stammerDelvis = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_delvis);

        const both = [...stammerHelt, ...stammerDelvis];

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
}

// Barely legal