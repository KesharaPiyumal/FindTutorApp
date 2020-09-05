import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/services/common-http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  tutorUrl = 'tutor';
  constructor(public commonHttpService: CommonHttpService) {}

  geAllTutors(latLng) {
    return this.commonHttpService.postData(this.tutorUrl + '/all', latLng).pipe(
      map((data) => {
        return data;
      })
    );
  }

  geAllFilteredTutors(latLngWithOtherData) {
    return this.commonHttpService.postData(this.tutorUrl + '/filteredAll', latLngWithOtherData).pipe(
      map((data) => {
        return data;
      })
    );
  }

  rateTutor(rateData) {
    return this.commonHttpService.postData(this.tutorUrl + '/rate', rateData).pipe(
        map((data) => {
          return data;
        })
    );
  }
}
