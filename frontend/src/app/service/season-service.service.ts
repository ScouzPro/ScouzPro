import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private url: string = 'http://localhost:3001/season/';
  constructor() { }

  async getSeasonValues(playerId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.url}/${playerId}`);
      // Verifica si la respuesta es un objeto y no un array
      if (typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Si la respuesta es un objeto, simplemente devuélvela
        return response.data;
      } else {
        // Si la respuesta es un array o cualquier otro tipo, maneja el caso según tus necesidades
        // En este caso, puedes devolver null, lanzar un error o hacer cualquier otro manejo adecuado
        throw new Error('La respuesta no es un objeto');
      }
    } catch (error) {
      console.error(error);
      return null; // O devuelve null u otro valor según tus necesidades
    }
  }

  async saveSeason(formData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.url}`, formData);
      return response.data;
      
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateSeasonPlayer(playerId:string, updateSeason:any):Promise<boolean>{
    try {
      const response = await axios.put(`${this.url}${playerId}`, updateSeason);
      console.log('Datos de la season actualizados:', response.data);
      return true;
    }  catch (error) {
      console.error(error);
      return false;
      
    }
  }

  

}
