import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRowComponent } from './api-row.component';

describe('ApiRowComponent', () => {
  let component: ApiRowComponent;
  let fixture: ComponentFixture<ApiRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
