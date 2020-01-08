import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from '../models/UserDTO';

@Pipe({
  name: 'connectionsSearch'
})
export class ConnectionsSearchPipe implements PipeTransform {

  transform(connections: UserDTO[], searchText:string): any {
    if(searchText === '') return connections;

    return connections.filter((connection) => connection.username.toLowerCase()
    .includes(searchText.toLowerCase()));
  }

}
