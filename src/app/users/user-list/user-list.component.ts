import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../user.model';
import { UserService } from '../user.service';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { DialogEditComponent } from '../dialog/dialog-edit.component';
import { Role } from '../../roles/role.model';
import { RoleService } from '../../roles/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private usersSub: Subscription;
  displayedColumns = ['name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;
  roles: Role[] = [];
  isLoading = false;

  constructor(
    public userService: UserService,
    public roleService: RoleService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe((roles: Role[]) => {
      console.log(roles);
      this.roles = roles;
    });
    this.usersSub = this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(users);
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const snackBarRef = this.snackBar.open('Name was updated!');
        snackBarRef.afterDismissed().subscribe(() => {
          console.log('The snack-bar was dismissed');
        });
      }
      // this.animal = result;
    });
  }

  onChangeRole(user, roleId) {
    console.log(user);
    console.log(roleId);
    this.snackBar.open('Role was updated!');
  }
  // onDelete(userId: string) {
  //   this.userService.deleteuser(userId);
  // }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
