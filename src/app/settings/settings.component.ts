import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  unit: string;

  constructor(private router: Router,
    private localStorageService:LocalStorageService) { 
      
    const myEmail= this.localStorageService.getData('email')
    const myUnit = this.localStorageService.getData(myEmail+".unit")
    if (myUnit == null){
      this.unit = 'Celsius';
    }
    else{

      this.unit = myUnit
      
    }
    }

  saveSettings() {
    
    const myEmail= this.localStorageService.getData('email')
    this.localStorageService.setData(myEmail+".unit", this.unit)

    this.router.navigate(['/main']);
  }

}
