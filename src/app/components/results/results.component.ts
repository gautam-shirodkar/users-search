import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from "./result.model";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  page: number = 1;
  @Input() list: Array<ResultModel> = [];

}
