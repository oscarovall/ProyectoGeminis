import { Injectable } from '@angular/core';
import { Product } from '../../models/crm/Product';
import { LeadProduct } from '../../models/crm/Lead';
import { ProductInv } from '../../models/crm/ProductInv';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient, private config: AppConfig) { }


  getProducts() {
    return this.http.get<ProductInv[]>(environment.api + 'ProductInv/getProductsInv')
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }

  getProductsPaginate(featureHome: boolean, pageSize: number, currentPage: number) {
    const url = `${environment.api}ProductInv/getProductsInv?featureHome=${featureHome}&CurrentPage=${currentPage}&PageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Promo Homes - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getPromoHomes() {
    const url = `${environment.api}ProductInv/get-promo-homes`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Promo Homes',
            text: err.message
          });
          return [];
        })
      );
  }


  //getFilteredProducts(filterProduct: FilterProduct) {
  //  console.log('Filtered Pagination', filterProduct);
  //  return this.http.put<any>(`${this.config.api}/PublicCatalog/FilterProduct`, filterProduct)
  //    .pipe(
  //      catchError((err: any) => {
  //        console.log(err);
  //        return [];
  //      })
  //    );
  //}

  getProductId(id: string) {
    const url = environment.api + '/PublicCatalog/' + id;
    return this.http.get(url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }

  //getSimilarProduct(filterProduct: FilterProduct) {
  //  return this.http.put<any>(`${this.config.api}/PublicCatalog/SimilarProduct`, filterProduct)
  //    .pipe(
  //      catchError((err: any) => {
  //        console.log(err);
  //        return [];
  //      })
  //    );
  //}

  //////////////////////////////
  // SIMILAR HOME
  //////////////////////////////
  getSimilarHomes(selectedProduct: Product) {
    return this.http.put<Product[]>(environment.api + '/PublicCatalog/SimilarProduct', selectedProduct)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }


  getCatalogHomes() {
    const url = `${environment.api}ProductsCatalog/get-all`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Catalog Homes',
            text: err.message
          });
          return [];
        })
      );
  }

  updateCatalog(data: Product) {
    return this.http.post<Product>(`${environment.api}ProductsCatalog/update`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating Catalog',
            text: err.message
          });
          return [];
        })
      );
  }

  createCatalog(data: Product) {
    return this.http.post<Product>(`${environment.api}ProductsCatalog/create`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Catalog',
            text: err.message
          });
          return [];
        })
      );
  }

  uploadFloorplanImg(data: FormData) {
    return this.http.post<any>(`${environment.api}ProductsCatalog/upload-floorplan-image`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  uploadIcon(data: FormData) {
    return this.http.post<any>(`${environment.api}ProductsCatalog/upload-icon`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  uploadProductImg(data: FormData) {
    return this.http.post<any>(`${environment.api}ProductsCatalog/upload-product-image`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteFloorplanImg(productId: number) {
    const data = {
      'productId': productId
    };
    return this.http.post<any>(`${environment.api}ProductsCatalog/delete-floorplan-image`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when delete floorplan',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteIcon(productId: number) {
    const data = {
      'productId': productId
    };
    return this.http.post<any>(`${environment.api}ProductsCatalog/delete-icon`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Delete Icon',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteproductImg(productImgId: number) {
    const data = {
      'productImgId': productImgId
    };
    return this.http.post<any>(`${environment.api}ProductsCatalog/delete-product-image`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Delete Product',
            text: err.message
          });
          return [];
        })
      );
  }
}
