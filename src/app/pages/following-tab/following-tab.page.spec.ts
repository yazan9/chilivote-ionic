import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingTabPage } from './following-tab.page';

describe('FollowingTabPage', () => {
  let component: FollowingTabPage;
  let fixture: ComponentFixture<FollowingTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
