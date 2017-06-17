import {Component} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: 'root.component.html',
	styleUrls: ['root.component.css']
})
export class RootComponent {

	constructor(
		public router: Router,
		public shardService: ShardService
	) {}

	showMenu(): boolean {
		let shard = this.shardService.get();
		return shard != undefined && shard != null;
	}

	disconnect(): void {
		this.shardService.set(null);
		this.router.navigateByUrl('/');
	}
}
