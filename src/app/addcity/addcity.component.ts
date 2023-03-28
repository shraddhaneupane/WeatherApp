import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent {
  newCity="";

  constructor(private router: Router, private localStorage: LocalStorageService){

  }
  add(){
    console.log("city:" ,this.newCity)
    if(this.newCity===""){
      alert("please add a City Name")
    }
    
    else{
      const myEmail= this.localStorage.getData('email')
      const oldCities = this.localStorage.getData(myEmail)
      if (oldCities == null){
        this.localStorage.setData(myEmail, [this.newCity])
      }
      else{
        if(!oldCities.includes(this.newCity)) oldCities.push(this.newCity)
        this.localStorage.setData(myEmail, oldCities)
        
      }
      
      
      this.router.navigate(['/main']);
    }
    

    
}
}
