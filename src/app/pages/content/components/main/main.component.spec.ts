import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MainComponent, MediaTypes} from "./main.component";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {of} from "rxjs";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let apiCommunicationService: ApiCommunicationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change page', () => {
    component.page = 1
    component.goToPage(2)
    expect(component.page).toEqual(2)
  })

  it('should change category', () => {
    component.watchList = [
      {
        id: 0,
        poster_path: '/',
        media_type: 'movie',
        vote_average: '123',
      },
      {
        id: 1,
        poster_path: '/',
        media_type: 'tv',
        vote_average: '123',
      },
      {
        id: 2,
        poster_path: '/',
        media_type: 'movie',
        vote_average: '123',
      }
    ]
    component.changeCategory(MediaTypes.all)
    expect(component.watchListFiltered.length).toEqual(3)
    component.changeCategory(MediaTypes.tv)
    expect(component.watchListFiltered.length).toEqual(1)
    component.changeCategory(MediaTypes.movie)
    expect(component.watchListFiltered.length).toEqual(2)
  })

  it('should set watch list data', () => {
    spyOn(apiCommunicationService, 'getList').and.returnValue(of({
      items: [{
        id: 1,
        poster_path: '/',
        media_type: 'tv',
        vote_average: '123',
      }]
    }))
    component.updateWatchList()
    expect(component.watchList.length).toEqual(1)
  })
});
