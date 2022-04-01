import { Component } from '@angular/core';
import { SearchService } from "./services/search.service";
import { ResultModel } from "./components/results/result.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-user-search';
  loginList: Array<ResultModel> = [];

  constructor (private searchService: SearchService) {
  }

  searchUser (searchKey: string) {
    this.searchService.search(searchKey).subscribe(results => {
      this.loginList = results;
    });
  }
}
