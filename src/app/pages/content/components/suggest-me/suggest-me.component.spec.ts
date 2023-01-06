import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SuggestMeComponent} from './suggest-me.component';
import {ApiDetailsService} from "../../../../shared/services/api-details.service";

describe('SuggestMeComponent', () => {
  let component: SuggestMeComponent;
  let fixture: ComponentFixture<SuggestMeComponent>;
  let apiDetailsService: ApiDetailsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestMeComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestMeComponent);
    component = fixture.componentInstance;
    apiDetailsService = TestBed.inject(ApiDetailsService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.openModal = true
    component.closeModal(true)
    expect(component.openModal).toBeFalsy()
  })

  it('should add to suggested and open modal', () => {
    component.openModal = false
    component.suggestedIds = []
    component.addToSuggestedIds(1)
    expect(component.suggestedIds).toEqual([1])
    expect(component.openModal).toBeTruthy()
  })

  it('should change page', () => {
    spyOn(component, 'getSearchResults').and.stub()
    component.page = 1
    component.goToPage(2)
    expect(component.page).toEqual(2)
  })

  it('should set data on Init', () => {
    spyOn(apiDetailsService, 'getSuggestedItemsIds').and.returnValue([])
    spyOn(apiDetailsService, 'getWatchedItemsIds').and.returnValue([])
    component.ngOnInit()
    apiDetailsService.search_results.next({results: [],total_results: 10})
    expect(component.totalItems).toEqual(10)
  })

  it('should set page to 1 on form submit', () => {
    component.page = 2
    spyOn(component, 'getSearchResults').and.stub()
    component.submitSearchForm()
    expect(component.page).toEqual(1)
  })

  it('it should change category', () => {
    component.page = 2
    spyOn(component, 'getSearchResults').and.stub()
    component.changeCategory('movie')
    expect(component.media_type).toEqual('movie')
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
