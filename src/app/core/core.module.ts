import { NgModule, Optional, SkipSelf } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { RouterModule } from "@angular/router"
import { MessagesComponent } from "./components/messages/messages.component"
import { ToolbarComponent } from "./components/toolbar/toolbar.component"
import { MaterialModule } from "../material/material.module"
import { CommonModule } from "@angular/common"


const COMPONENTS = [
  MessagesComponent,
  ToolbarComponent,
]

const MODULES = [
  FlexLayoutModule,
  MaterialModule,
  RouterModule
]


@NgModule({
  declarations: [
    [COMPONENTS]
  ],
  imports: [
    CommonModule,
    MODULES
  ],
  exports:[
    MODULES, COMPONENTS
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentmodule?: CoreModule){
    if(parentmodule) {
      throw new Error('CoreModule has aleready been loaded. Import this module in the AppModule');

    }
  }
}
