import {Component} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {TableModule} from "primeng/table";
import {PacksComponent} from "./packs/packs.component";
import {RemunerationComponent} from "./remuneration/remuneration.component";
import {SubjectComponent} from "./subject/subject.component";

@Component({
  selector: 'app-settings',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TableModule,
    PacksComponent,
    RemunerationComponent,
    SubjectComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  tabIndex = 0;

  changeTab(event: any) {
    console.log(event)
    this.tabIndex = event
  }
}
