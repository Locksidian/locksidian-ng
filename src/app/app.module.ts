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
	MdInputModule,
	MdSnackBarModule
} from "@angular/material";
import {AgmCoreModule} from "angular2-google-maps/core";
import {ConnectComponent} from "./pages/connect/connect.component";
import {RootComponent} from "./pages/root/root.component";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {ShardService} from "./services/shard/shard.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PeersComponent} from "./pages/peers/peers.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {environment} from "../environments/environment";
import {PeerService} from "./services/peers/peer.service";

@NgModule({
	declarations: [
		RootComponent,
		LoadingComponent,
		ConnectComponent,
		DashboardComponent,
		PeersComponent
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
		MdRadioModule,
		MdSnackBarModule,

		AgmCoreModule.forRoot({
			apiKey: environment.googleMaps.apiKey
		})
	],
	providers: [
		ShardService,
		PeerService
	],
	bootstrap: [RootComponent]
})
export class AppModule {}
