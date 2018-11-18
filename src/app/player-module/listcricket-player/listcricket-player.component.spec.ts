import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcricketPlayerComponent } from './listcricket-player.component';

describe('ListcricketPlayerComponent', () => {
  let component: ListcricketPlayerComponent;
  let fixture: ComponentFixture<ListcricketPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcricketPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcricketPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
