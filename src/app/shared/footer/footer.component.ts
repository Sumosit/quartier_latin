import {Component} from '@angular/core';
import {UiBtnTextIconComponent} from '../ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {SvgsComponent} from '../svgs/svgs.component';

@Component({
  selector: 'app-footer',
  imports: [
    UiBtnTextIconComponent,
    SvgsComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {

}
