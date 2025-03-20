import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalSearch',
  pure: false,
})
export class GlobalSearchPipe implements PipeTransform {
  transform(users: any[] | null, searchText: string): any[] {
    if (!users) return [];
    if (!searchText) return users;

    searchText = searchText.toLowerCase();

    return users.filter(
      (user, i) =>
        (i + 1).toString().toLowerCase().includes(searchText) ||
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText)
    );
  }
}
