import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {DashboardComponent} from './dashboard.component';
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiCommunicationService: ApiCommunicationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return items count in lists', () => {
    spyOn(apiCommunicationService, 'getList').and.returnValue(of({
      items: [
        {
          media_type: 'movie'
        },
        {
          media_type: 'tv'
        },
        {
          media_type: 'movie'
        }
      ]
    }))
    component.ngOnInit()
    expect(component.tvCount).toEqual(1)
    expect(component.movieCount).toEqual(2)
    expect(component.suggestionsCount).toEqual(3)
  })
});
