
import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor() { }

  async getPlayerMetrics(playerId: string): Promise<any> {
    try {
      const response = await axios.get(`http://localhost:3001/metrics/${playerId}`);
      
      
      // Verifica si la respuesta es un objeto
      if (typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Si la respuesta es un objeto, envuélvelo en un array
        const formattedData = [response.data];
        return formattedData;
      } else {
        // Si la respuesta es un array o cualquier otro tipo, devuelve la respuesta como está
        return response.data;
      }
      
    } catch (error) {
      console.error(error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  async submitMetrics(formData: any): Promise<any> {
    try {
      const response = await axios.post('http://localhost:3001/metrics', formData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async editPlayerMetrics(playerId: string, updatedMetrics: any): Promise<any> {
    try {
      const response = await axios.put(`http://localhost:3001/metrics/${playerId}`, updatedMetrics);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deletePlayerMetrics(_id: string): Promise<any> {
    try {
      const options = {
        headers: {
          'auth': localStorage.getItem('token admin')!
        }
      }
      const response = await axios.delete(`http://localhost:3001/metrics/${_id}`, options);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPlayerMetricsById(playerId: string): Promise<any> {
    try {
      const response = await axios.get(`http://localhost:3001/metrics/${playerId}`);      
      return response.data;
    } catch (error) {
      console.error(error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }
}

