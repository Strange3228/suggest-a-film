import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ContentComponent} from "./content.component";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContentComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to search page', () => {
    component.mediaType = 'tv'
    component.searchForm.setValue({
      search_query: 'a'
    })
    spyOn(router, 'navigate')
    component.search()
    expect(router.navigate).toHaveBeenCalledWith(['/content/suggest-me/tv/a/1'])
  })

  it('should set page title and media type to Movies', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/movies/')
    component.setMediaType()
    expect(component.pageTitle).toEqual('Movies')
    expect(component.mediaType).toEqual('movie')
  })

  it('should set page title and media type to Tv', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/tv/')
    component.setMediaType()
    expect(component.pageTitle).toEqual('Tv Shows')
    expect(component.mediaType).toEqual('tv')
  })
});
