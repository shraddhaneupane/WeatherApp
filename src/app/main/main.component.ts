import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';
import { LocalStorageService } from '../local-storage.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  cities: any = [
    //  { name: "Ashburn", temp: 60, lowHigh: '30/70', outcast: "Cloudy" },
    //   { name: "DC", temp: 50, lowHigh: '40/90', outcast: "Rainy" },

  ];

  myUnit: string = "";
  unitSymbol = 'C';
  showCity = false;
  cityToView:any = [];
  loading =false;

  constructor(private http: HttpClient,
    private router: Router,
    private weatherApiService: WeatherApiService,
    private localStorageService: LocalStorageService) {


  }

  ngOnInit(): void {

    const myEmail = this.localStorageService.getData('email')
    const oldCities = this.localStorageService.getData(myEmail)
    this.myUnit = this.localStorageService.getData(myEmail + ".unit")

    if (this.myUnit == null) {
      this.myUnit = 'Celsius';
    }

    for (let i = 0; i < oldCities.length; i++) {
      console.log(oldCities[i]);
      this.weatherApiService.getWeather(oldCities[i]).subscribe((response) => {


        console.log(response)
        this.cities.push(response)

      });

    }

    console.log(this.cities)



  }

  viewCity(cityName: string) {
    
    this.loading = true;
    this.showCity = true;

    this.weatherApiService.getForecast(cityName).subscribe((response) => {


      console.log(response)
      this.cityToView.length = 0;
      this.cityToView.push(response) 
      this.loading = false;
    },
    (err)=>{
      this.loading = false;
    }
    );

    


  }
  deleteCity(cityName: string) {
    const myEmail = this.localStorageService.getData('email')
    let oldCities = this.localStorageService.getData(myEmail)

    let citiesAfterDeletion = oldCities.filter((i: string) => i !== cityName);

    console.log(citiesAfterDeletion)

    this.localStorageService.setData(myEmail, citiesAfterDeletion)
    location.reload()
  }

  kelvinToUnit(kelvin: number): number {

    if (this.myUnit == "Celsius") {
      return kelvin - 273.15;
    }
    else {
      this.unitSymbol = 'F';
      return (kelvin - 273.15) * 1.8 + 32;
    }

  }



}

