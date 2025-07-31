import {Component, inject} from '@angular/core';
import {Card} from "primeng/card";
import {InputText} from "primeng/inputtext";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {Button} from "primeng/button";
import {Divider} from "primeng/divider";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    Card,
    InputText,
    InputGroup,
    InputGroupAddon,
    Button,
    Divider,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;

  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        this.router.navigate(['home'])
    }
    })
  }
}
