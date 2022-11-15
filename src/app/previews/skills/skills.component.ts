import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skillNames: boolean[] = [false, false, false, false, false];
  public skillBadges: boolean[] = [false, false, false, false, false];
  private delay: number = 3050;

  constructor() { }

  ngOnInit(): void {

    /* spaced timer delays for element visibility / animations */
    for(let i: number = 0; i < this.skillNames.length; i++) {
      setTimeout(() => this.skillNames[i] = true, this.delay);
      this.delay += 200;
      setTimeout(() => this.skillBadges[i] = true, this.delay);
      this.delay += 400;
    }

  }

}
