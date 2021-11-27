import { CityRepository } from './protocols/city-repository';
import { Storage } from '@ionic/storage-angular';
import { City } from '../entities/city';

export class HistoricoDeConsultaService {
    constructor(
      private readonly cityRepo: CityRepository,
      private storage: Storage
    ) {}
  
    async criaHistorico(): Promise<City[]> {

        // cria um storage
        await this.storage.create();

        // se ja não existir um histórico, cria um vazio
        if (!(await this.storage.get('history'))) {
            await this.storage.set('history', []);
      }
      // retorna o histórico
      return await this.storage.get('history');
    }
  

    async salvaCidade(id: number): Promise<City[]> {
        
        // busca a cidade e o historico registrado
        const city = await this.cityRepo.getById(id);
        const history = await this.storage.get('history');

        // se a cidade ja existe, renmove ela e insere novamente
        const index = history.findIndex((c) => c.id === city.id);
        if (index > -1) {
            history.splice(index, 1);
        }

        history.unshift(city); 
        return await this.storage.set('history', history);
    }
}