import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LocalstorageKeysEnum } from '../../../models';

@Component({
    selector: 'app-tracker-admin',
    imports: [RouterLink, FormsModule],
    templateUrl: './tracker-admin.component.html'
})
export class TrackerAdminComponent {
    adminRaderaLsCb = false;

    onAdminRaderaLsCb(v: boolean) {
        this.adminRaderaLsCb = v;
    }

    onAdminRaderaLsCbConfirmed() {
        localStorage.removeItem(LocalstorageKeysEnum.milestones);
        localStorage.removeItem(LocalstorageKeysEnum.tracker);
        this.adminRaderaLsCb = false;
    }
}