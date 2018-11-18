import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplayerComponentComponent } from './addplayer-component.component';

describe('AddplayerComponentComponent', () => {
  let component: AddplayerComponentComponent;
  let fixture: ComponentFixture<AddplayerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplayerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
