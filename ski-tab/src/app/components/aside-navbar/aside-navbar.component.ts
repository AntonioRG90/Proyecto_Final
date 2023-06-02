import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompetitionComponent } from '../create-competition/create-competition.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';

import { BehaviorSubject } from 'rxjs';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryService } from '../../services/category/category.service';
import { CreateCompetitorComponent } from '../create-competitor/create-competitor.component';
import { CompetitorService } from '../../services/competitor/competitor.service';

@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.scss']
})
export class AsideNavbarComponent {
   
  constructor(
    private dialog: MatDialog,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
    private competitionService: CompetitionsService,
    private categoryService: CategoryService,
    private competitorService: CompetitorService,
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId = this.user.user_id; 
  competitionsFiltered: any[] = [];
  categoryId: number = 0;
  categories: any[] = [];
  emptyData: any[] = [];



  ngOnInit(){
    this.competitionsFiltered.length = 0;
    this.categories.length = 0;
    this.getCompetitions();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialog.closeAll();
  }

  openCreateCompetition(competition: any){
    const dialogRef = this.dialog.open(CreateCompetitionComponent,{
      width: '350px',
      data: {competition},
    })
    dialogRef.afterClosed().subscribe(( )=>{
      this.ngOnInit();
    })
  }

  openCreateCategory(competitionId:any, category:any){
    const dialogRef = this.dialog.open(CreateCategoryComponent,{
      width: '350px',
      data: {competitionId, category},
    })
    dialogRef.afterClosed().subscribe(( )=>{
      this.ngOnInit();
    })
  }

  openCreateCompetitor(competitionId:number, categoryId:number){
    const dialogRef = this.dialog.open(CreateCompetitorComponent,{
      width: '350px',
      data:{competitionId, categoryId},
    })
    dialogRef.afterClosed().subscribe(( )=>{
      this.ngOnInit();
    })
  }

  getCategories(competitionId:number){
    this.categoryService.getCategories(competitionId).subscribe((snap) => {
      snap.forEach((cat) => {
        if(cat.category_of == competitionId){
          this.categories.push(cat);
        }
      })
    } )
  }

  getCompetitions(){
    this.competitionsFiltered.length = 0;
    this.competitionService.getAvailableCompetitions(this.userId).subscribe((snap) => {
      snap.forEach((competition) => {
        this.competitionsFiltered.push(competition);
        this.getCategories(competition.id);
      })
    } )
  }
  
  shareDataToBoard(competitionId: number, categoryId: number, categoryPaceTime: number, categoryGender:string){
    this.competitorService.shareDataToBoard([competitionId, categoryId, categoryPaceTime, categoryGender]);
  }

}
