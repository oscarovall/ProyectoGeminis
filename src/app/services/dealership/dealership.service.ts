import { Storage } from './../../models/Storage';
import { environment } from './../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Dealership } from '../../models/Dealership';
import { Lot } from '../../models/Lot';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

  // Dealerships
  public selectedDealership: Dealership;
  public selectedDealershipChanged: EventEmitter<Dealership> = new EventEmitter<Dealership>();
  public selectedDealershipSaved: EventEmitter<Dealership> = new EventEmitter<Dealership>();

  // Storage
  public selectedStorage: Storage;
  public selectedStorageChanged: EventEmitter<Storage> = new EventEmitter<Storage>();
  public selectedStorageSaved: EventEmitter<Storage> = new EventEmitter<Storage>();

  // Lot
  public selectedLot: Lot;
  public selectedLotChanged: EventEmitter<Lot> = new EventEmitter<Lot>();
  public selectedLotSaved: EventEmitter<Lot> = new EventEmitter<Lot>();

  constructor(
    private http: HttpClient,
    private config: AppConfig) { }

  /* Dealerships */
  setSelectedDealership(data: Dealership) {
    this.selectedDealership = data;
    this.selectedDealershipChanged.emit(this.selectedDealership);
  }
  saveDoneDealership(data: Dealership) {
    this.selectedDealershipSaved.emit(this.selectedDealership);
  }

  /* Storage */
  setSelectedStorage(data: Storage) {
    this.selectedStorage = data;
    this.selectedStorageChanged.emit(this.selectedStorage);
  }
  saveDoneStorage(data: Storage) {
    this.selectedStorageSaved.emit(this.selectedStorage);
  }

  /* Lot */
  setSelectedLot(data: Lot) {
    this.selectedLot = data;
    this.selectedLotChanged.emit(this.selectedLot);
  }
  saveDoneLot(data: Lot) {
    this.selectedLotSaved.emit(this.selectedLot);
  }

  getAllDealerships(filterWords: String) {
    let SearchWord = '';
    console.log('filterWords->', filterWords);
    
    if (filterWords) {
        SearchWord = `&SearchWord=${filterWords}`;
    }
    const data = `${SearchWord}`;
    const url = `${environment.api}Dealership/get-all?${data}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Dealerships',
            text: err.message
          });
          return [];
        })
      );
  }

  createStore(dealer: Dealership) {
    return this.http.post<Dealership>(`${environment.api}Dealership/create-store`, dealer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Store',
            text: err.message
          });
          return [];
        })
      );
  }

  updateStore(dealer: Dealership) {
    return this.http.post<Dealership>(`${environment.api}Dealership/update-store`, dealer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating Store',
            text: err.message
          });
          return [];
        })
      );
  }

  createStorage(storage: Storage) {
    return this.http.post<Storage>(`${environment.api}Dealership/create-storage`, storage)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating storage',
            text: err.message
          });
          return [];
        })
      );
  }

  updateStorage(storage: Storage) {
    return this.http.post<Dealership>(`${environment.api}Dealership/update-storage`, storage)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating storage',
            text: err.message
          });
          return [];
        })
      );
  }

  createLot(lot: Lot) {
    return this.http.post<Lot>(`${environment.api}Dealership/create-lot`, lot)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating lot',
            text: err.message
          });
          return [];
        })
      );
  }

  updateLot(lot: Lot) {
    return this.http.post<Dealership>(`${environment.api}Dealership/update-lot`, lot)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating lot',
            text: err.message
          });
          return [];
        })
      );
  }
}
