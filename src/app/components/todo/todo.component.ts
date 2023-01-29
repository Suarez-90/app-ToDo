import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms'
import { delay, map, Observable, of } from 'rxjs';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  updateIndex !: number;
  isEditEnable: boolean = false;
  taskForm!: FormGroup;
  taskName: FormControl = new FormControl('', Validators.required, [this.nameTaskValidator()])

  @ViewChild('formDirective') private formDirect!: FormGroupDirective;

  constructor(private readonly FB: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.FB.group({
      taskName: this.taskName
    })
  }


  public checkExistsTask(value: string): Observable<boolean> {
    return of(this.tasks.some(item => item.description?.toLowerCase() === value.toLowerCase()))
      .pipe(
        delay(400)
      )
  }

  public nameTaskValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkExistsTask(control.value)
        .pipe(
          map((result: boolean) => result ?  {nameTaskExists: true} : null)
        );
    }
  }


  addTask() {
    this.tasks.push({
      description: this.taskForm.value.taskName,
      done: false,
      isDisable: false
    });
    this.formDirect.resetForm();
  }

  updateEditTask() {
    this.tasks[this.updateIndex].description = this.taskForm.value.taskName;
    this.tasks[this.updateIndex].done = false;
    this.tasks[this.updateIndex].isDisable = false;
    this.updateIndex = 0;
    this.isEditEnable = false;
    this.formDirect.resetForm();
  }

  editTask(item: ITask, i: number) {
    item.isDisable = true;
    this.taskForm.controls['taskName'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnable = true;
  }

  cancelEditTask() {
    this.tasks[this.updateIndex].isDisable = false;
    this.isEditEnable = false;
    this.formDirect.resetForm();
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    this.updateIndex -= 1;
  }
  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  errorHandling(control: string, error: string) {
    // return this.todoFrom.controls[control].hasError(error) &&
    // this.todoFrom.controls[control].pristine;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
function checkExistsTask(): Observable<ValidationErrors> {
  throw new Error('Function not implemented.');
}

