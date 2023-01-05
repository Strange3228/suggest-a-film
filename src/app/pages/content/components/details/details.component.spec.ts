import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {Observable, of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {MatIconModule} from "@angular/material/icon";
import {IconsRegisterService} from "../../../../services/icons-register.service";

let media_type = 'tv'

class MockServices {
  // Router
  public events = of( new NavigationEnd(0, 'http://localhost:4200/content/details/'+ media_type, 'http://localhost:4200/content/details/' + media_type));
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let activeMediaType = 'movie'
  let router: Router
  let apiCommunicationService: ApiCommunicationService
  let iconRegisterService: IconsRegisterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [
                {
                  path: activeMediaType
                }
              ],
              paramMap: {
                get: (key:string) => 1
              }
            }
          },
        },
        { provide: Router, useClass: MockServices },
      ]
    })
    .compileComponents();

    iconRegisterService = TestBed.inject(IconsRegisterService)
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.details = {
      id: 1000,
      name: 'name',
      title: 'title',
      vote_average: '123',
      poster_path: '/',
      backdrop_path: '/',
      tagline: '/',
      overview: '/',
      release_date: '/',
      runtime: '/',
      genres: [{
        name: 'new'
      }],
      status: '/',
      first_air_date: '/',
      last_air_date: '/',
      number_of_seasons: '/',
      number_of_episodes: '/',
      episode_run_time: ['/']
    }
    router = TestBed.inject(Router)
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should set detials', () => {
    spyOn(apiCommunicationService, 'getDetails').and.returnValue(of({
      id: 1,
      name: 'name',
      title: 'title',
      vote_average: 123,
      poster_path: '/',
      backdrop_path: '/',
      tagline: '/',
      overview: '/',
      release_date: '/',
      runtime: '/',
      genres: [{
        name: 'new'
      }],
      status: '/',
      first_air_date: '/',
      last_air_date: '/',
      number_of_seasons: '/',
      number_of_episodes: '/',
      episode_run_time: ['/']
    }))
    component.ngOnInit()
    expect(component.details.id).toEqual(1)
  })

  it('should set media type from url to tv', () => {
    activeMediaType = 'tv'
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    expect(component.mediaType).toEqual('tv')
  })
  it('should set media type from url to movie', () => {
    activeMediaType = 'movie'
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    expect(component.mediaType).toEqual('movie')
  })
});
