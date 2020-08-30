import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/services/common-http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  tutorUrl = 'tutor';
  constructor(public commonHttpService: CommonHttpService) {}

  geAllTutors() {
    return this.commonHttpService.postData(this.tutorUrl + '/all', {}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  geAllFilteredTutors(latLng) {
    return this.commonHttpService.postData(this.tutorUrl + '/filteredAll', latLng).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
