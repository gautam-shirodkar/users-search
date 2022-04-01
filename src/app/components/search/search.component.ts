import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  login: string = '';

  model: string = '';
  modelChanged: Subject<string> = new Subject<string>();
  @Output() onSearchEmit = new EventEmitter<string>();

  constructor () {
    this.modelChanged
      .pipe(debounceTime(300),
        distinctUntilChanged())
      .subscribe((value: string) => this.onSearchEmit.emit(value));
  }

  onSearch () {
    if (this.login.trim() === '') {
      return;
    }
    this.modelChanged.next(this.login );
  }
}
