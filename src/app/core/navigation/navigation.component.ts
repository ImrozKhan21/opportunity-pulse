import {Component, Input, OnInit} from '@angular/core';
import {INavigation} from "../../models/common.model";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
@Input() navigationOptions: INavigation[];
  currentActive: INavigation;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentActive = this.navigationOptions.find(option => this.router.url.includes(option.route)) || this.navigationOptions[0];
  }

  getIcon(option: INavigation): IconProp {
    const iconToTake = option.icon;
    return iconToTake.split(',') as IconProp;
  }

  goToRoute(option: INavigation): void {
    this.currentActive = option;
    this.router.navigate([option.route]);
  }

}
