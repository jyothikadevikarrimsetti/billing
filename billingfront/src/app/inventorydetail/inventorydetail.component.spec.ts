import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorydetailComponent } from './inventorydetail.component';

describe('InventorydetailComponent', () => {
  let component: InventorydetailComponent;
  let fixture: ComponentFixture<InventorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventorydetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
