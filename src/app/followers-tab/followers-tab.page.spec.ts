import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersTabPage } from './followers-tab.page';

describe('FollowersTabPage', () => {
  let component: FollowersTabPage;
  let fixture: ComponentFixture<FollowersTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
