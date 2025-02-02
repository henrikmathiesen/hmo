import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { TrackerInterface, RatingEnum } from '../../models';
import { FeatherIcon } from '../../directives';
import { QuoteComponent } from '../quote/quote.component';

@Component({
    selector: 'app-tracker-milestones',
    imports: [NgIf, NgFor, FeatherIcon, QuoteComponent],
    templateUrl: 'tracker-milestones.component.html'
})
export class TrackerMilestonesComponent implements OnInit {
    @Input() trackerModel: TrackerInterface[] = [];
    milestones: { idx: number, label: string, achived: boolean, criteria: string }[] = [
        {
            idx: 0,
            label: 'A line in the sand',
            criteria: 'Minst 3 dagar med Stämmer helt eller Stämmer delvis',
            achived: false,
        }
    ];
    atLeastOneMilestoneAchived = false;

    ngOnInit() {
        this.checkMilestoneOne();
        this.checkAtLeastOneMilestoneAchived();
    }

    private checkAtLeastOneMilestoneAchived() {
        this.atLeastOneMilestoneAchived = this.milestones.some(v => v.achived === true);
    }

    private checkMilestoneOne() {
        const stammerHelt = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_helt);
        const stammerDelvis = this.trackerModel.filter(v => v.rating === RatingEnum.stammer_delvis);

        const both = [...stammerHelt, ...stammerDelvis];

        if (both.length >= 3) {
            this.milestones[0].achived = true;
        }
    }
}