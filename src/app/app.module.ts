import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {
	MaterialModule,
	MdButtonModule,
	MdCardModule,
	MdIconModule,
	MdCheckboxModule,
	MdCoreModule,
	MdChipsModule,
	MdDialogModule,
	MdRadioModule,
	MdInputModule
} from "@angular/material";
import {ConnectComponent} from "./pages/connect/connect.component";
import {RootComponent} from "./pages/root/root.component";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {ShardService} from "./services/shard/shard.service";

@NgModule({
	declarations: [
		ConnectComponent,
		RootComponent
	],
	imports: [
		RouterModule.forRoot(AppRoutes),
		BrowserModule,
		FormsModule,
		HttpModule,

		// Angular Material
		MaterialModule.forRoot(),
		MdCoreModule,
		MdButtonModule,
		MdCardModule,
		MdIconModule,
		MdCheckboxModule,
		MdChipsModule,
		MdDialogModule,
		MdInputModule,
		MdRadioModule
	],
	providers: [
		ShardService
	],
	bootstrap: [RootComponent]
})
export class AppModule {}
