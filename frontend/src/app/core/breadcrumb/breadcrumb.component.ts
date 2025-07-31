import {Component, inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {Breadcrumb} from "primeng/breadcrumb";

@Component({
  selector: 'app-breadcrumb',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: 'students'};
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs());
  }

  private createBreadcrumbs(): MenuItem[] {
    const breadcrumbs: MenuItem[] = [];
    const segments = this.router.url.split('?')[0].split('/').filter(Boolean); // remove query
    const config = this.router.config;
    let url = '';
    let accumulatedPath = '';

    for (const element of segments) {
      accumulatedPath += (accumulatedPath ? '/' : '') + element;
      url = '/' + accumulatedPath;

      // Try to find matching route by checking for static or param match
      const matchingRoute = config.find(route => {
        if (!route.path) return false;

        const routeSegments = route.path.split('/');
        const urlSegments = accumulatedPath.split('/');

        if (routeSegments.length !== urlSegments.length) return false;

        return routeSegments.every((rs, index) => rs.startsWith(':') || rs === urlSegments[index]);
      });

      const label = matchingRoute?.data?.['breadcrumb'];
      if (label) {
        breadcrumbs.push({
          label,
          url
        });
      }
    }

    // Disable the last breadcrumb (current page)
    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].disabled = true;
    }

    return breadcrumbs;
  }
}
