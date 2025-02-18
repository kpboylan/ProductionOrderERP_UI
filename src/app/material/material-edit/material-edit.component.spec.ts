import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialEditComponent } from './material-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../material-service/material.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Material } from '../material-model/material.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MaterialEditComponent', () => {
  let component: MaterialEditComponent;
  let fixture: ComponentFixture<MaterialEditComponent>;
  let mockMaterialService: jasmine.SpyObj<MaterialService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockActivatedRoute: any;

  const mockMaterial: Material = {
    materialID: 1,
    materialName: 'Test Material',
    materialType: 1,
    uomId: 1,
    description: 'Test Description',
    active: true,
    currentStock: 100,
    uomCode: 'UOM001',
    materialTypeAbbreviation: 'TST'
  };

  beforeEach(async () => {
    mockMaterialService = jasmine.createSpyObj('MaterialService', ['getMaterialById', 'updateMaterial', 'getMaterialTypes', 'getUOM']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [MaterialEditComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: MaterialService, useValue: mockMaterialService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialEditComponent);
    component = fixture.componentInstance;

    mockMaterialService.getMaterialById.and.returnValue(of(mockMaterial));
    mockMaterialService.getMaterialTypes.and.returnValue(of([{ materialTypeID: 1, materialTypeAbbreviation: 'Type1' }]));
    mockMaterialService.getUOM.and.returnValue(of([{ uomid: 1, uomCode: 'UOM001' }]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load material data on init', () => {
    expect(mockMaterialService.getMaterialById).toHaveBeenCalledWith(1);
    expect(component.materialEditForm.value.materialName).toBe('Test Material');
    expect(component.materialEditForm.value.materialType).toBe(1);
    expect(component.materialEditForm.value.description).toBe('Test Description');
    expect(component.materialEditForm.value.uomid).toBe(1);
    expect(component.materialEditForm.value.currentStock).toBe(100);
    expect(component.materialEditForm.value.active).toBe(true);
  });

  it('should load material types and UOMs on init', () => {
    expect(mockMaterialService.getMaterialTypes).toHaveBeenCalled();
    expect(mockMaterialService.getUOM).toHaveBeenCalled();
    expect(component.materialTypes.length).toBe(1);
    expect(component.uoms.length).toBe(1);
  });

  /* it('should call updateMaterial and navigate on form submit', () => {
    component.materialEditForm.setValue({
      materialName: 'Updated Material',
      materialType: 1,
      description: 'Updated Description',
      currentStock: 200,
      uomid: 1,
      active: true
    });

    mockMaterialService.updateMaterial.and.returnValue(of({}));

    component.onSubmit();

    expect(mockMaterialService.updateMaterial).toHaveBeenCalledWith(1, {
      materialID: 1,
      materialName: 'Updated Material',
      materialType: 1,
      description: 'Updated Description',
      currentStock: 200,
      uomId: 1,
      uomCode: '',
      materialTypeAbbreviation: '',
      active: true
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/materials']);
  }); */

/*   it('should not call updateMaterial if form is invalid', () => {
    component.materialEditForm.setValue({
      materialName: '',
      materialType: null,
      description: '',
      currentStock: null,
      uomid: null,
      active: false
    });

    component.onSubmit();

    expect(mockMaterialService.updateMaterial).not.toHaveBeenCalled();
  }); */
});