import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpTesteComponent } from './cp-teste.component';

describe('CpTesteComponent', () => {
  let component: CpTesteComponent;
  let fixture: ComponentFixture<CpTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpTesteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
