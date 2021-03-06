import {Routes} from "@angular/router";
import {ConnectComponent} from "./pages/connect/connect.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PeersComponent} from "./pages/peers/peers.component";
import {IdentitiesComponent} from "./pages/identities/identities.component";
import {ExplorerComponent} from "./pages/explorer/explorer.component";

export const AppRoutes: Routes = [
	{path: '', component: ConnectComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'explorer', component: ExplorerComponent},
	{path: 'peers', component: PeersComponent},
	{path: 'identities', component: IdentitiesComponent}
];
