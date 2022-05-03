import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosEditarComponent } from './vuelos-editar.component';

describe('VuelosEditarComponent', () => {
  let component: VuelosEditarComponent;
  let fixture: ComponentFixture<VuelosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
