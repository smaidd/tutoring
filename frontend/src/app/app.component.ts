import {Component, inject, OnInit} from '@angular/core';
import {Toolbar} from "primeng/toolbar";
import {MenuItem} from "primeng/api";
import {Button} from "primeng/button";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {BreadcrumbComponent} from "./core/breadcrumb/breadcrumb.component";
import {ConfirmDialog} from "primeng/confirmdialog";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  imports: [Toolbar, Button, RouterOutlet, BreadcrumbComponent, RouterLink, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  public authService = inject(AuthService)

  items: MenuItem[] = [];

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.items = this.createBreadcrumbs(this.route.root));
    this.items = [{
      icon: 'pi pi-home',
      route: '/installation'
    }, {label: 'Components'}, {label: 'Form'}, {label: 'InputText', route: '/inputtext'}];

  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[AppComponent.ROUTE_DATA_BREADCRUMB];

      breadcrumbs.push({label, url});

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

}
