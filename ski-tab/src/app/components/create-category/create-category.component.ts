import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from '../../models/category';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
    private categoryService: CategoryService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId = this.user.user_id; 

ngOninit(){
 
}

createCategory = this.formBuilder.group({
  tag: [this.data.category.tag, Validators.required],
  name: [this.data.category.name, Validators.required],
  gender: [ this.data.category.gender, Validators.required], 
  slope_distance: [this.data.category.slope_distance, Validators.required],
  pace_time: [this.data.category.pace_time],
  id: [this.data.category.id],
  category_of: [this.data.category.category_of]
})

submitForm(){
  if(!this.createCategory.invalid){
    this.categoryService.createCategory(this.data.competitionId, this.createCategory.value);
  } 
}

deleteForm(competitionId:number, categoryId:number){
  this.categoryService.deleteCategory(competitionId, categoryId);
}


//DEVELOP WITH EXCEL IMPLEMENTATION
exportCategory(id:number){
  console.log("export");
}
}
