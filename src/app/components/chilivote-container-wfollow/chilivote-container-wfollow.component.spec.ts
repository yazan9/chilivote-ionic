import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilivoteContainerWfollowComponent } from './chilivote-container-wfollow.component';

describe('ChilivoteContainerWfollowComponent', () => {
  let component: ChilivoteContainerWfollowComponent;
  let fixture: ComponentFixture<ChilivoteContainerWfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChilivoteContainerWfollowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilivoteContainerWfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
