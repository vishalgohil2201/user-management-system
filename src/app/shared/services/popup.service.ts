import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  public successMessagePopup(title: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: "Success!",
      text: title,
      icon: "success"
    });
  }

  public confirmationMessagePopup(title: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: `Are you sure you want to delete ${title}?`,
      text: `You are about to delete ${title}'s user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  }
}
