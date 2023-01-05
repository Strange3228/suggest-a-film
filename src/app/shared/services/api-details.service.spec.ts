import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { of } from "rxjs";
import { ApiDetailsService } from './api-details.service';
import { ApiCommunicationService } from "./api-communication.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

describe('ApiDetailsService', () => {
  let service: ApiDetailsService;
  let apiCommunicationService: ApiCommunicationService
  let router: Router
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(ApiDetailsService);
    router = TestBed.inject(Router)
    apiCommunicationService = TestBed.inject(ApiCommunicationService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of watched items ids', () => {
    spyOn(apiCommunicationService, 'getList').and.returnValue(of(
      {
        items: [{id: 1}, {id: 2}, {id: 3}]
      }
    ))
    expect(service.getWatchedItemsIds()).toEqual([1,2,3])
  })

  it('should return array of suggested items ids', () => {
    spyOn(apiCommunicationService, 'getList').and.returnValue(of(
      {
        items: [{id: 1}, {id: 2}, {id: 3}]
      }
    ))
    expect(service.getSuggestedItemsIds()).toEqual([1,2,3])
  })

  it('should return search result', () => {
    service.search_results.subscribe({
      next: data => {
        expect(data.total_results).toEqual(2)
      }
    })
    spyOn(apiCommunicationService, 'getSearchResult').and.returnValue(of(
      {
        results: [{id: 1}, {id: 2}],
        total_results: 2
      }
    ))
    spyOn(router, 'navigate')
    service.getSearchResults('movie', 1, 'a', 'link/')
  })
});
