import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as XLSX from 'xlsx';
import { CompetitorService } from 'src/app/services/competitor/competitor.service';
import { Competitor } from 'src/app/models/competitor';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MessengerService } from 'src/app/services/messenger/messenger.service';



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
    private competitorService: CompetitorService,
    private dialog: MatDialog,
    private messengerService: MessengerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId = this.user.user_id; 
  competitors: Competitor [] = [];
  excelData:any;

  ngOnInit(){
    this.competitorService.getCompetitorsOrder(this.data.category.category_of, this.data.category.id).subscribe((competitors) => {
      this.competitors = competitors.slice().reverse();
    })
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

  /**
   * @Author Antonio Ruiz Galvez
   * @description si el formulario es correcto se comunica con CategoryService
   */
  submitForm(){
    if(!this.createCategory.invalid){
      this.categoryService.createCategory(this.data.competitionId, this.createCategory.value);
      this.messengerService.showNotification("Saved category!", 2000);
    } 
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description abre una ventana modal, si devuelve true se comuinica con CategoryService y elimina la categoría
   * @param competitionId 
   * @param categoryId 
   */
  deleteForm(competitionId:number, categoryId:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Delete category?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.categoryService.deleteCategory(competitionId, categoryId);
        this.messengerService.showNotification("Category deleted!", 2000);
      }    
    })
    
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description crear un archivo .xlsx con una fila definida y ocupa el resto de filas con los resultados de una categoría
   */
  exportCategory(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(this.data.category.tag);
    worksheet.columns = [
      { header: 'Rank', key: 'rank', width: 5 },
      { header: 'Bib', key: 'bib', width: 5 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Seconds', key: 'time_seconds', width: 10 },
      { header: 'Time Points', key: 'time_points', width: 10 },
      { header: 'J1 J4', key: 'jump1_j4_points', width: 10 },
      { header: 'J1 J5', key: 'jump1_j5_points', width: 10 },
      { header: 'J1 Trick', key: 'jump1_trick', width: 10 },
      { header: 'J1 DD', key: 'jump1_dd', width: 10 },
      { header: 'J2 J4', key: 'jump2_j4_points', width: 10 },
      { header: 'J2 J5', key: 'jump2_j5_points', width: 10 },
      { header: 'J2 Trick', key: 'jump2_trick', width: 10 },
      { header: 'J2 DD', key: 'jump2_dd', width: 10 },
      { header: 'Air Total', key: 'jumps_total', width: 10 },
      { header: 'J1 B', key: 'turns_j1_b', width: 10 },
      { header: 'J1 D', key: 'turns_j1_d', width: 10 },
      { header: 'J2 B', key: 'turns_j2_b', width: 10 },
      { header: 'J2 D', key: 'turns_j2_d', width: 10 },
      { header: 'J3 B', key: 'turns_j3_b', width: 10 },
      { header: 'J3 D', key: 'turns_j3_d', width: 10 },
      { header: 'Turns Total', key: 'turns_total', width: 10 },
      { header: 'Run Score', key: 'run_score', width: 10 },
    ];

    
      this.competitors.forEach((competitor, index) => {
        worksheet.addRow({
          rank: index,
          bib: competitor.bib,
          name: competitor.name,
          time_seconds: competitor.time_seconds,
          time_points: competitor.time_points,
          jump1_j4_points: competitor.jump1_j4_points,
          jump1_j5_points: competitor.jump1_j5_points,
          jump1_trick: competitor.jump1_trick,
          jump1_dd: competitor.jump1_dd,
          jump2_j4_points: competitor.jump2_j4_points,
          jump2_j5_points: competitor.jump2_j5_points,
          jump2_trick: competitor.jump2_trick,
          jump2_dd: competitor.jump2_dd,
          jumps_total: competitor.jumps_total,
          turns_j1_b: competitor.turns_j1_b,
          turns_j1_d: competitor.turns_j1_d,
          turns_j2_b: competitor.turns_j2_b,
          turns_j2_d: competitor.turns_j2_d,
          turns_j3_b: competitor.turns_j3_b,
          turns_j3_d: competitor.turns_j3_d,
          turns_total: competitor.turns_total,
          run_score: competitor.run_score
        },'n')
      })
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, this.data.category.tag);
    })
    this.messengerService.showNotification("Results successfuly exported!", 2000);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description toma un archivo .xlsx por input, lo lee y se comunica con CompetitorService para crear por cada fila un competidor.
   * @param event 
   */
  importCategory(event:any){
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
        let workBook = XLSX.read(fileReader.result, {type:'binary'})
        let sheetNames = workBook.SheetNames;
        this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        this.excelData.forEach((element:any)=> {
        let data = {
          id: 0,
          bib: element.bib,
          name: element.name,
          time_seconds: 0,
          time_points: 0,
          jump1_j4_points: 0,
          jump1_j5_points: 0,
          jump1_trick: "",
          jump1_dd: 0,
          jump2_j4_points: 0,
          jump2_j5_points: 0,
          jump2_trick: "",
          jump2_dd: 0,
          jumps_total: 0,
          turns_j1_b: 0,
          turns_j1_d: 0,
          turns_j2_b: 0,
          turns_j2_d: 0,
          turns_j3_b: 0,
          turns_j3_d: 0,
          turns_total: 0,
          run_score: 0,
          competitor_of: 0,
        };
        this.competitorService.createCompetitor(this.data.competitionId, this.data.category.id, data);
        this.messengerService.showNotification("Competitors successfuly imported!", 2000);
      });
    }
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description abre una vetana moda que si devuelve true elimina todos los competidores de una categoría
   */
  deleteAllUsers(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Delete ALL competitors?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.competitorService.deleteAllCompetitors(this.data.competitionId, this.data.category.id);
        this.messengerService.showNotification("Competitors deleted!", 2000);
      }    
    })
  }
  
}