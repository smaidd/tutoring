import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit() {
    let userRole = this.authService.getUserRole();
    if (!userRole) {
      window.location.reload();
    } else {
      if (userRole === 'ADMIN') {
        this.router.navigate(['students'])
      } else {
        this.router.navigate(['sheets'])
      }
    }
  }

}
