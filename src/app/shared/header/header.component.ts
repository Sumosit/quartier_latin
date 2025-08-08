import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UiBtnTextIconComponent} from "../ui/ui-btn-text-icon/ui-btn-text-icon.component";

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive,
        UiBtnTextIconComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true
})
export class HeaderComponent {
    isMobileMenuOpen = false;

    constructor(private router: Router) {
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
}
