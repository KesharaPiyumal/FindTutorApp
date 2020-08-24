import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import {NbButtonModule, NbFormFieldModule, NbIconModule, NbInputModule} from '@nebular/theme';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [LocationPickerComponent],
    imports: [
        CommonModule,
        NbFormFieldModule,
        NbIconModule,
        NbInputModule,
        AgmCoreModule.forRoot({
            apiKey: '',
            libraries: ['places']
        }),
        NbButtonModule,
    ],
  exports: [LocationPickerComponent],
  providers: [Geolocation],
})
export class CommonSharedModule {}
