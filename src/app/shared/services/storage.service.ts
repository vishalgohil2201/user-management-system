import { PopupService } from './popup.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public users = new BehaviorSubject<User[]>(this.getUsersFromStorage());
  public users$ = this.users.asObservable();

  constructor(private _popupService: PopupService) { }

  public getUsersFromStorage(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  private saveUsersToStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public addUser(user: User): void {
    let existingUsers: User[] = this.getUsersFromStorage();
    let newUser = { ...user, id: existingUsers.length > 0 ? existingUsers[existingUsers.length - 1].id + 1 : 1 };

    let updatedUsers = [...existingUsers, newUser];
    this.saveUsersToStorage(updatedUsers);
    this.users.next(updatedUsers);
  }


  public getEditUser(id: number) {
    let user = this.getUsersFromStorage().find((ele) => ele.id == id);
    return user;
  }

  public deleteUser(id: number, name: string) {
    this._popupService.confirmationMessagePopup(name).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: name + " has been deleted.",
          icon: "success"
        }).then(() => {
          const users = this.getUsersFromStorage().filter((ele) => ele.id !== id);
          this.saveUsersToStorage(users);
          this.users.next(users);
        });
      }
      else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  updateUser(updatedUser: User): void {
    let users = this.getUsersFromStorage();
    users = users.map(user => user.id.toString() === updatedUser.id ? updatedUser : user);
    this.saveUsersToStorage(users);
    this.users.next(users);
  }


}
