import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
              private router:Router,
              private alertCtrl: AlertController ){
  
  }

  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      // subHeader: 'Subtitle',
      // message: 'This is alert.',
      inputs: [
        {
          name:'titulo', type:'text', placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => { console.log('Cancelar')}
        },
        {
          text: 'Crear',
          handler: ( data ) => {

            if( data.titulo.length === 0){
              return;
            }

            const listaId = this.deseosService.crearLista( data.titulo );
            this.router.navigateByUrl(`/tabs/agregar/${ listaId }`);

          }
        }
      ]
    });

    await alert.present();
  }


  
}
