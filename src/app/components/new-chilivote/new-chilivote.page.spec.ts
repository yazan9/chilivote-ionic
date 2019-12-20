import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChilivotePage } from './new-chilivote.page';

describe('NewChilivotePage', () => {
  let component: NewChilivotePage;
  let fixture: ComponentFixture<NewChilivotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChilivotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChilivotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
