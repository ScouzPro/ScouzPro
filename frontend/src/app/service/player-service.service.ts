// import { Injectable } from '@angular/core';
// import axios from 'axios';

// @Injectable({
//   providedIn: 'root'
// })
// export class PlayerServiceService {

//   constructor() { }

//   async CreatePlayer(newPlayer: any) {
//     try {
//       const response = await axios.post('http://localhost:3001/players', newPlayer);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor() { }

  async CreatePlayer(newPlayer: any) {
    try {
      // Aquí puedes incluir solo los campos que deseas enviar al servidor
      const playerData = {
        name: newPlayer.name,
        age: newPlayer.age,
        actualTeam: newPlayer.actualTeam,
        photo: newPlayer.photo,
        dorsal: newPlayer.dorsal,
        nationality: newPlayer.nationality,
        position: newPlayer.position,
        weight: newPlayer.weight,
        height: newPlayer.height,
        strongFoot: newPlayer.strongFoot
      };

      const response = await axios.post('http://localhost:3001/player', playerData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
