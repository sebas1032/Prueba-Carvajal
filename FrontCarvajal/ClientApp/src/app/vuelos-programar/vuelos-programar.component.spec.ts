import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosProgramarComponent } from './vuelos-programar.component';

describe('VuelosProgramarComponent', () => {
  let component: VuelosProgramarComponent;
  let fixture: ComponentFixture<VuelosProgramarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelosProgramarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosProgramarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
