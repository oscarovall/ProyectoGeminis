import { environment } from './../../../environments/environment.prod';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Manufacturer } from '../../models/Manufacturer';
import { Product } from '../../models/crm/Product';
import { Plant } from '../../models/Plant';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  // Manufacturers
  public selectedManufacturer: Manufacturer;
  public selectedManufacturerChanged: EventEmitter<Manufacturer> = new EventEmitter<Manufacturer>();
  public selectedManufacturerSaved: EventEmitter<Manufacturer> = new EventEmitter<Manufacturer>();

  // Products
  public selectedProduct: Product;
  public selectedProductChanged: EventEmitter<Product> = new EventEmitter<Product>();
  public selectedProductSaved: EventEmitter<Product> = new EventEmitter<Product>();

  // Plants
  public selectedPlant: Plant;
  public selectedPlantChanged: EventEmitter<Plant> = new EventEmitter<Plant>();
  public selectedPlantSaved: EventEmitter<Plant> = new EventEmitter<Plant>();

  constructor(
    private http: HttpClient,
    private config: AppConfig) { }


  /* Manufacturers */
  setSelectedManufacturer(data: Manufacturer) {
    this.selectedManufacturer = data;
    this.selectedManufacturerChanged.emit(this.selectedManufacturer);
  }
  saveDoneManufacturer(data: Manufacturer) {
    this.selectedManufacturerSaved.emit(this.selectedManufacturer);
  }

  /* Products */
  setSelectedProduct(data: Product) {
    this.selectedProduct = data;
    this.selectedProductChanged.emit(this.selectedProduct);
  }
  saveDoneProduct(data: Product) {
    this.selectedProductSaved.emit(this.selectedProduct);
  }

  /* Plants */
  setSelectedPlant(data: Plant) {
    this.selectedPlant = data;
    this.selectedPlantChanged.emit(this.selectedPlant);
  }
  saveDonePlant(data: Plant) {
    this.selectedPlantSaved.emit(this.selectedPlant);
  }



  getAllManufacturers(filterWords: String) {
    let SearchWord = '';
    if (filterWords) {
      SearchWord = `&SearchWord=${filterWords}`;
    }
    const data = `${SearchWord}`;
    const url = `${environment.api}Manufacturers/get-all?${data}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Manufacturers',
            text: err.message
          });
          return [];
        })
      );
  }

  getAllManufacturerProducts(manufacturerId: number) {
    const url = `${environment.api}Manufacturers/get-all-manufacturer-products-catalog?&manufacturerId=${manufacturerId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Manufacturers Products',
            text: err.message
          });
          return [];
        })
      );
  }

  getAllManufacturerPlants(manufacturerId: number) {
    const url = `${environment.api}Manufacturers/get-all-plants-by-manufacturer?ManufacturerId=${manufacturerId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Manufacturers Plants',
            text: err.message
          });
          return [];
        })
      );
  }

  createManufacturer(manufacturer: Manufacturer) {
    return this.http.post<Manufacturer>(`${environment.api}Manufacturers/create`, manufacturer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Manufacturer',
            text: err.message
          });
          return [];
        })
      );
  }

  updateManufacturer(manufacturer: Manufacturer) {
    return this.http.post<Manufacturer>(`${environment.api}Manufacturers/update`, manufacturer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating Manufacturer',
            text: err.message
          });
          return [];
        })
      );
  }

  createPlant(data: Plant) {
    return this.http.post<Plant>(`${environment.api}Manufacturers/create-plant`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Plant',
            text: err.message
          });
          return [];
        })
      );
  }

  updatePlant(data: Plant) {
    return this.http.post<Plant>(`${environment.api}Manufacturers/update-plant`, data)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating Plant',
            text: err.message
          });
          return [];
        })
      );
  }

}
