import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../shared/services/storage.service';
import { PopupService } from '../shared/services/popup.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public userForm!:FormGroup;
  public isEdit:boolean = false;
  constructor(private _storageService:StorageService,private _popupService:PopupService, private route:Router,private activeRoute: ActivatedRoute) { }
  public userId!: number;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      role: new FormControl('',[Validators.required]),
    });
    this.getactiveRoute();
  }

  public save(): void {
    if (this.userForm.valid) {
        if (this.isEdit) {
          let updatedUser = { ...this.userForm.value, id: this.userId };
          this._storageService.updateUser(updatedUser);
          this._popupService.successMessagePopup('User is updated successfully!').then(() => {
            this.route.navigate(['']);
          });
      }
      else{
        this._storageService.addUser(this.userForm.value);
        this._popupService.successMessagePopup('User is added successfully!').then(()=>{
          this.route.navigate(['']);
        });
      }
  }
  else{
    this.userForm.markAsTouched();
  }
}
  public handleValidators(field: string): boolean | null {
    const control = this.userForm.get(field);
    if ((control?.touched || control?.dirty) && control.errors) {
      if (control.errors['required']) return true;
      if (control.errors['email']) return true;
    }
    return null;
  }

  public getactiveRoute(){
    this.activeRoute.params.subscribe((params: { id?: number }) => {
      if (params.id) {
        this.userId = params.id;
        this.isEdit = true;
        const user = this._storageService.getEditUser(params.id);
        if (user) {
          this.userForm.patchValue(user);
        }
      } else {
        this.isEdit = false;
      }
    });
  }

}
