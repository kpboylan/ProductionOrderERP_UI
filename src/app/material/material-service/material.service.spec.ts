import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialService } from './material.service';
import { Material } from '../material-model/material.model';

describe('MaterialService', () => {
    let service: MaterialService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MaterialService]
        });

        service = TestBed.inject(MaterialService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve materials via GET', () => {

        const mockMaterials: Material[] = [
          { materialID: 1, materialName: 'Lactose', description: 'A sugar used as an excipient in tablets and capsules', materialType: 1, active: true, currentStock: 1000, uomId: 1, uomCode: 'kg', materialTypeAbbreviation: 'RM'},
          { materialID: 1, materialName: 'Ethanol', description: 'Used as a binder and filler in tablets and capsules', materialType: 2, active: true, currentStock: 2000, uomId: 2, uomCode: 'mg', materialTypeAbbreviation: 'FM'},
        ];
    
        service.getMaterials().subscribe(materials => {      
          expect(materials.length).toBe(2);

          expect(materials).toEqual(mockMaterials);
          console.log('Expected materials:', mockMaterials);
          console.log('Actual materials:', materials);
        });
    
        const req = httpMock.expectOne('https://localhost:7283/api/Material/all');
    
        expect(req.request.method).toBe('GET');
        console.log('Expected HTTP method:', 'GET');
        console.log('Actual HTTP method:', req.request.method);
    
        req.flush(mockMaterials);
    });
});