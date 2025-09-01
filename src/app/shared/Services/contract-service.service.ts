import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Base/environment/environment';

import { ContractProductResponse } from '../interfaces/contract-product-response';
import { UploadTemplateResponse } from '../interfaces/upload-template-response';
import { UserContractsResponse } from '../interfaces/user-contracts-response';
import { ContractItem } from '../interfaces/contracts-list-response';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  constructor(private http: HttpClient) { }

  // بعد التعديل
  getContracts(): Observable<ContractItem[]> {
  return this.http.get<ContractItem[]>(`${Environment.baseUrl}/api/Contracts`);
}

  // 2) GET Contracts/product/{id}
  getContractProduct(id: number | string): Observable<ContractProductResponse> {
    return this.http.get<ContractProductResponse>(`${Environment.baseUrl}/api/Contracts/product/${id}`);
  }

  // 3) POST ContactUsAPI/Template (رفع ملف)
  uploadTemplate(file: File): Observable<UploadTemplateResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadTemplateResponse>(`${Environment.baseUrl}/api/Contracts/fill-template`, formData);
  }

  // 4) GET Contract/user-contracts (Bearer)
  getUserContracts(): Observable<UserContractsResponse[]> {
    // التوكن بيتضاف تلقائيًا من الـ interceptor (لو مفعل)
    return this.http.get<UserContractsResponse[]>(`${Environment.baseUrl}/api/Contracts/user-contracts`);
  }
}
