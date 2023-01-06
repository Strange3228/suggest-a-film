import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {MoviesComponent} from './movies.component';
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let router: Router
  let apiCommunicationService: ApiCommunicationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: any) => {
                  if(key == 'media_type') return 'tv'
                  if(key == 'page') return 2
                  return 'search'
                }
              }
            }
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change page', () => {
    spyOn(router, 'navigate').and.stub()
    spyOn(component, 'updateMovies').and.stub()
    component.page = 1
    component.goToPage(2)
    expect(component.page).toEqual(2)
  })

  it('should set data from API', () => {
    spyOn(apiCommunicationService, 'getPopularMovies').and.returnValue(of({
      results: [],
      total_results: 10
    }))
    component.updateMovies()
    expect(component.totalMovies).toEqual(10)
  })
});
