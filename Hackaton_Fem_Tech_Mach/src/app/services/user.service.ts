import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  private carsSubject = new BehaviorSubject<Car[]>([]);
  cars$: Observable<Car[]> = this.carsSubject.asObservable();

  getAllCars() {
    return this.cars$;
  }

  getCar(carId: string): Observable<Car> {
    const carRef = doc(this.firestore, `cars/${carId}`);
    return docData(carRef) as Observable<Car>;
  }
  async addCar(newCar: Car): Promise<void> {
    await addDoc(collection(this.firestore, 'cars'), newCar);
  }
  async updateCar(carId: string, updatedCar: Car): Promise<void> {
    const carRef = doc(this.firestore, 'cars', carId);
    await setDoc(carRef, updatedCar);
  }
  async deleteCar(carId: string): Promise<void> {
    const carRef = doc(this.firestore, 'cars', carId);
    await deleteDoc(carRef);
  }

  constructor() {
    const acollection = collection(this.firestore, 'cars');
    const cars$ = collectionData(acollection, { idField: 'id' }) as Observable<Car[]>;

    cars$.pipe(shareReplay(1)).subscribe((carsFromFirestore) => {
      this.carsSubject.next(carsFromFirestore);
    });
  }
}
