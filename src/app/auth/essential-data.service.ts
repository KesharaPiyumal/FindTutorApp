import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/services/common-http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EssentialDataService {
  examsUrl = 'exam';
  // mediumsUrl = 'medium';
  subjectsUrl = 'subject';
  constructor(public commonHttpService: CommonHttpService) {}

  getAllExams() {
    return this.commonHttpService.getAll(this.examsUrl + '/getAll').pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllSubjectsForExamAndMedium(reqData) {
    return this.commonHttpService.postData(this.subjectsUrl + '/getAll', reqData).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
