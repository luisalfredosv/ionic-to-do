import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, ToastController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;

  @ViewChild( IonList) lista: IonList;

  constructor(public deseosService: DeseosService,
              private router: Router,
              public toasterController: ToastController,
              public alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista:Lista ){

    if (this.terminada ){
      this.router.navigateByUrl(`/tabs/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/agregar/${ lista.id }`);
    }
  }

  async borrarLista( lista:Lista ){
    this.deseosService.borrarLista( lista );

    const toast = await this.toasterController.create({
      header: 'Notificacion',
      message: 'Se eliminó correctamente la tarea!',
      position: 'top',
      duration: 2000
    }); 

    toast.present();
  }



  async editarLista( lista:Lista ){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      // subHeader: 'Editar lista',
      // message: 'This is alert.',
      inputs: [
        {
          name:'titulo', type:'text', placeholder: 'Nombre de la lista', value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {

            if( data.titulo.length === 0){
              return;
            }

            lista.titulo = data.titulo
            this.lista.closeSlidingItems();
            this.deseosService.guardarStorage();

          }
        }
      ]
    });

    await alert.present();
  }

}
