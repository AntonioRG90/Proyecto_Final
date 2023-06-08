import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompetitionComponent } from '../create-competition/create-competition.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { Subject, take } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryService } from '../../services/category/category.service';
import { CreateCompetitorComponent } from '../create-competitor/create-competitor.component';
import { CompetitorService } from '../../services/competitor/competitor.service';
import { GeneralService } from '../../services/general/general.service';

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
    public generalService: GeneralService,
    
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  competitionsFiltered: any[] = [];
  categoryId: number = 0;
  categories: any[] = [];
  emptyData: any[] = [];
  show = false;
  userId = this.user.user_id; 
  @Output() competitionsCount = new EventEmitter<number>();
 
  ngOnInit(){
    this.getCompetitions();
    this.getShow();
   
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
      
    })
  }

  openCreateCategory(competitionId:any, category:any){
    const dialogRef = this.dialog.open(CreateCategoryComponent,{
      width: '350px',
      data: {competitionId, category},
    })
    dialogRef.afterClosed().subscribe(( )=>{
     
    })
  }

  openCreateCompetitor(competitionId:number, categoryId:number){
    const dialogRef = this.dialog.open(CreateCompetitorComponent,{
      width: '350px',
      data:{competitionId, categoryId},
    })
    dialogRef.afterClosed().subscribe(( )=>{
      
    })
  }

  getCategories(competitionId:number){
    this.categoryService.getCategories(competitionId).subscribe((snap) => {
      this.categories = snap;
    } )
  }

  getCompetitions(){
    this.competitionService.getAvailableCompetitions(this.userId).subscribe((snap) => {
      this.competitionsFiltered = snap;
      snap.forEach((competition) => {
        this.getCategories(competition.id);
      })
    } )
  }
  
  shareDataToBoard(competitionId: number, categoryId: number, categoryPaceTime: number, categoryGender:string){
    this.competitorService.shareDataToBoard([competitionId, categoryId, categoryPaceTime, categoryGender]);
  }

  getShow(){
   this.generalService.sharedData.subscribe(e =>{
      this.show = e;
    })
  }

}
