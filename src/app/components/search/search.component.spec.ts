import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { SearchComponent } from './search.component';
import { DebugElement } from "@angular/core";
import { FormControl } from "@angular/forms";


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let input: DebugElement;
  let button: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button'));
    input = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input element', () => {
    expect(input.nativeElement).toBeTruthy();
  })

  it('should render search button', () => {
    expect(button.nativeElement).toBeTruthy();
  })

  it('button click should call onSearch function', () => {
    spyOn(component, 'onSearch');
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.onSearch).toHaveBeenCalled();
  })

  it('correct search query should be emitted', (done) => {
    component.modelChanged.subscribe(value => {
      expect(value).toEqual('gautam');
      done();
    })
    component.login = 'gautam';
    component.onSearch();
  });
});
