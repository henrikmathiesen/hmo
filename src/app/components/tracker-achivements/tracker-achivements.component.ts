import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { FeatherIcon } from '../../directives';
import { MilestoneInterface } from '../../models';

@Component({
    selector: 'app-tracker-achivements',
    imports: [NgFor, FeatherIcon],
    templateUrl: 'tracker-achivements.component.html'
})
export class TrackerAchivementsComponent {

    @Input() achivedMilestones: MilestoneInterface[] = [];

    trackByFn(index: number, item: MilestoneInterface) {
        return item.idx;
    }

}