import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusCodes } from '../../@common/enum';
import { EssentialDataService } from '../../auth/essential-data.service';

@Component({
  selector: 'app-filter-modal-page',
  templateUrl: './filter-modal-page.component.html',
  styleUrls: ['./filter-modal-page.component.scss'],
})
export class FilterModalPageComponent implements OnInit {
  filterForm: FormGroup;
  examsDropdown = [];
  mediumDropdown = [
    { label: 'Sinhala', value: 1 },
    { label: 'English', value: 2 },
  ];
  subjectsDropdown = [];
  examsLoading = false;
  subjectsLoading = false;
  examList = [];
  selectedExamId: any;
  selectedMediumId: any;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public essentialDataService: EssentialDataService
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      examId: [null],
      mediumId: [null],
      subjectIds: [[]],
      distanceRange: [0],
    });
    this.getAllExams();
  }

  dismissModal(bool?) {
    if (bool) {
      this.modalController.dismiss({}, 'set').then((r) => {});
    } else {
      this.modalController.dismiss({}, 'cancel').then((r) => {});
    }
  }

  getAllExams() {
    this.examsLoading = true;
    this.essentialDataService.getAllExams().subscribe(
      (response) => {
        this.examsLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          this.examList = response.data;
          this.examsDropdown = [];
          this.examList.forEach((item) => {
            this.examsDropdown.push({ label: item['name'], value: item['id'] });
          });
          this.filterForm.patchValue({
            examId: this.examsDropdown[0].value,
          });
        }
      },
      (error) => {
        this.examsLoading = false;
      }
    );
  }

  getAllSubjects() {
    this.subjectsLoading = true;
    const reqData = { examId: this.selectedExamId, mediumId: this.selectedMediumId };
    this.essentialDataService.getAllSubjectsForExamAndMedium(reqData).subscribe(
      (response) => {
        this.subjectsLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          this.subjectsDropdown = [];
          this.filterForm.patchValue({
            subjectIds: [[]],
          });
          response.data.forEach((item) => {
            this.subjectsDropdown.push({ label: item['name'], value: item['id'] });
          });
        }
      },
      (error) => {
        this.subjectsLoading = false;
      }
    );
  }

  examinationOrGradeChange(event: any) {
    this.selectedExamId = event;
    if (this.selectedExamId && this.selectedMediumId) {
      this.getAllSubjects();
    }
  }

  mediumChange(event: any) {
    this.selectedMediumId = event;
    if (this.selectedExamId && this.selectedMediumId) {
      this.getAllSubjects();
    }
  }
}