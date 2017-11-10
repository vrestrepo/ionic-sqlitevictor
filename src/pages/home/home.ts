import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private database: SQLiteObject;
  personas : any;

  constructor(public navCtrl: NavController,  private sqlite: SQLite) {
    this.personas = [];
    this.sqlite.create({
      name: 'data2.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.database.executeSql('create table IF NOT EXISTS usuarios(nombre TEXT,telefono TEXT)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  insertar(nom,tel){
    this.database.executeSql(`INSERT INTO usuarios(nombre,telefono) VALUES ('${nom}','${tel}');`, {}).then((result)=>{
      this.personas.push(nom + " "+tel);
    })
    .catch(e => console.log(e));
  }
}
