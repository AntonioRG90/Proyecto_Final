import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AsideNavbarComponent } from '../aside-navbar/aside-navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompetitorService } from 'src/app/services/competitor/competitor.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  constructor(
    private competitorService: CompetitorService,
  ){}

  competitionId: number = 0;
  

  ngOnInit(){
    this.getData();
  }

  ngOnDestroy(){
    
  }

  getData(){
    this.competitorService.sharedData.subscribe( data => {
      this.competitionId = data[0];
    })
  }

}
