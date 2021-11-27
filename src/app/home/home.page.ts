import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { HistoricoDeConsultaService } from 'src/domain/services/historico-de-consulta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;
  history: City[];

  constructor(
    private readonly searchService: SearchCityService,
    private readonly router: Router,
    private readonly historicoDeConsultasService: HistoricoDeConsultaService
  ) {}

  async ngOnInit() {

    this.history = await this.historicoDeConsultasService.criaHistorico();
  }

  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }
 
  async onSelectCity(cityId: string) {
    // atualiza o historico

    this.history = await this.historicoDeConsultasService.salvaCidade(parseInt(cityId)); 
    this.router.navigateByUrl(`/weather/${cityId}`);
  }


}
