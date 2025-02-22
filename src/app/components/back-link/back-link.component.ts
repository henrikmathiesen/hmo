import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-back-link',
    imports: [RouterLink],
    templateUrl: './back-link.component.html'
})
export class BackLinkComponent {
    @Input() label = 'Get me out of this mess!';
}