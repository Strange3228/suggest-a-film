import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {ApiCommunicationService} from "../../services/api-communication.service";
import {MovieCardComponent} from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let apiCommunicationService: ApiCommunicationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit add to suggested', () => {
    spyOn(component.addToSuggested, 'emit')
    spyOn(apiCommunicationService, 'addItemToList').and.returnValue(of({
      success: true
    }))
    component.suggestFilm()
    expect(component.addToSuggested.emit).toHaveBeenCalled()
    expect(component.alreadySuggested).toBeTruthy()
  })

  it('should emit add to watched', () => {
    const event = new Event('click');
    spyOn(component.addToWatched, 'emit')
    spyOn(apiCommunicationService, 'addItemToList').and.returnValue(of({
      success: true
    }))
    spyOn(apiCommunicationService, 'removeListItem').and.returnValue(of({
      success: true
    }))
    component.addToWatchlist(event)
    expect(component.addToWatched.emit).toHaveBeenCalled()
    expect(component.addedToMyList ).toBeTruthy()
  })
});
