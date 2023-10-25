import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globalconstants } from 'src/app/global-constants';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'edit'];
  dataSource: any;
  responseMessage: any;
  data: any;
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.categoryService.getCategory(this.data).subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          Globalconstants.error
        );
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: null,
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  editCategorie(element){

  }
  supprimerCategorie(element){
    
  }
}
