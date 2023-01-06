import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NavigationEnd, Router} from "@angular/router";
import {of} from "rxjs";
import {ApiDetailsService} from "../../../../shared/services/api-details.service";
import {AddToListComponent} from './add-to-list.component';
import {UrlParamsService} from "../../../../shared/services/url-params.service";

class MockServices {
  // Router
  public events = of( new NavigationEnd(0, 'http://localhost:4200/account/add/', 'http://localhost:4200/account/add'));
}


describe('AddToListComponent', () => {
  let component: AddToListComponent;
  let fixture: ComponentFixture<AddToListComponent>;
  let apiDetailsService: ApiDetailsService
  let urlParamService: UrlParamsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToListComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToListComponent);
    component = fixture.componentInstance;
    apiDetailsService = TestBed.inject(ApiDetailsService)
    urlParamService = TestBed.inject(UrlParamsService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add watched item id', () => {
    component.addToWatchedIds(123)
    expect(component.watchedIds).toEqual([123])
    component.watchedIds = []
  })

  it('should change page', () => {
    component.page = 1
    spyOn(component, 'getSearchResults').and.stub()
    component.goToPage(2)
    expect(component.page).toEqual(2)
  })

  it('it should change category', () => {
    component.page = 2
    spyOn(component, 'getSearchResults').and.stub()
    component.changeCategory('movie')
    expect(component.media_type).toEqual('movie')
  })

  it('should set page to 1 on form submit', () => {
    component.page = 2
    spyOn(component, 'getSearchResults').and.stub()
    component.submitSearchForm()
    expect(component.page).toEqual(1)
  })

  it('should update data', () => {
    spyOn(urlParamService, 'updateValues').and.stub()
    spyOn(urlParamService, 'getSearchQuery').and.returnValue('query')
    spyOn(urlParamService, 'urlHasSearchParams').and.returnValue(true)
    spyOn(urlParamService, 'getMediaType').and.returnValue('tv')
    spyOn(urlParamService, 'getPage').and.returnValue(2)
    component.updateData()
    expect(component.media_type).toEqual('movie')
    expect(component.page).toEqual(1)
  })

  it('should set data on Init', () => {
    spyOn(apiDetailsService, 'getWatchedItemsIds').and.returnValue([])
    component.ngOnInit()
    apiDetailsService.search_results.next({results: [],total_results: 10})
    expect(component.totalItems).toEqual(10)
  })

  it('should get search result', () => {
    spyOn(apiDetailsService, 'getWatchedItemsIds').and.returnValue([])
    component.ngOnInit()
    component.media_type = 'movie'
    component.page = 1
    component.searchForm.setValue({
      search_query: ''
    })
    spyOn(apiDetailsService, 'getSearchResults').and.stub()
    component.getSearchResults()
    expect(component.isLoading).toEqual(true)
  })
});
