import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopbackApiItemEditorComponent } from './loopback-api-item-editor.component';

describe('LoopbackApiItemEditorComponent', () => {
  let component: LoopbackApiItemEditorComponent;
  let fixture: ComponentFixture<LoopbackApiItemEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopbackApiItemEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopbackApiItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
