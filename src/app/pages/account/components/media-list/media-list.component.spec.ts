import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import { MediaListComponent } from './media-list.component';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;
  let apiCommunicationService: ApiCommunicationService
  let activeList = 'movie'
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: any) => {
                  if(key == 'list') return activeList
                  if(key == 'page') return 2
                  return 'search'
                }
              },
              params: {
                list: activeList
              }
            }
          },
        },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list of movies', () => {
    spyOn(apiCommunicationService, 'getList').and.returnValue(of({
      items: [
        {
          id: 0,
          media_type: 'movie'
        },
        {
          id: 1,
          media_type: 'tv'
        },
        {
          id:2,
          media_type: 'movie'
        }
      ]
    }))
    component.ngOnInit()
    console.log(component.medias)
    expect(component.medias[0].id).toEqual(0)
    expect(component.medias[1].id).toEqual(2)
  })

  it('should change page', () => {
    component.page = 1
    spyOn(router,'navigate').and.stub()
    component.goToPage(2)
    expect(component.page).toEqual(2)
  })
});
