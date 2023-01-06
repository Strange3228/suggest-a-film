import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { UrlParamsService } from './url-params.service';
import { ContentRoutingModule } from "../../pages/content/content-routing.module";

describe('UrlParamsService', () => {
  let service: UrlParamsService;
  let router: Router
  let activatedRoute: ActivatedRoute
  let activeMediaType: string = 'movie'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ContentRoutingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: any) => {
                  if(key == 'media_type') return activeMediaType
                  if(key == 'page') return 2
                  return 'search'
                }
              }
            }
          },
        },
      ]
    });
    service = TestBed.inject(UrlParamsService);
    router = TestBed.inject(Router)
    activatedRoute = TestBed.inject(ActivatedRoute)
  });

  it('should be created', () => {
    service.ngOnInit()
    expect(service).toBeTruthy();
  });

  it('should return true if url has all for searching', () => {
    expect(service.urlHasSearchParams()).toBeTruthy()
  })

  it('should return movie media type from params', () => {
    activeMediaType = 'movie'
    spyOn(router, 'navigate').and.stub()
    service.updateValues('/content/suggest-me/')
    expect(service.getMediaType()).toEqual('movie')
  })

  it('should return tv media type from params', () => {
    activeMediaType = 'tv'
    spyOn(router, 'navigate').and.stub()
    service.updateValues('/content/suggest-me/')
    expect(service.getMediaType()).toEqual('tv')
  })

  it('should automatically set media type to movie', () => {
    activeMediaType = 'dumbText'
    spyOn(router, 'navigate').and.stub()
    service.updateValues('/content/suggest-me/')
    expect(service.media_type).toEqual('movie')
  })

  it('should return media type from params', () => {
    spyOn(router, 'navigate').and.stub()
    service.updateValues('/content/suggest-me/')
    expect(service.getPage()).toEqual(2)
  })

  it('should return media type from params', () => {
    spyOn(router, 'navigate').and.stub()
    expect(service.getSearchQuery()).toEqual('search')
  })

});
