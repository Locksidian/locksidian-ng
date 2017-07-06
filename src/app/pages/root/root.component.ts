import {Component} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";

@Component({
	selector: 'app-root',
	templateUrl: 'root.component.html',
	styleUrls: ['root.component.css']
})
export class RootComponent {

	constructor(
		public router: Router,
		public shardService: ShardService,
		public snackBar: MdSnackBar
	) {}

	showMenu(): boolean {
		let shard = this.shardService.get();
		return shard != undefined && shard != null;
	}

	disconnect(): void {
		this.shardService.set(null);
		this.router.navigateByUrl('/');
	}

	createBlocksFromFiles(files: Array<File>) {
		files.forEach(file => console.warn(file.name));
	}

	notifyInvalidFiles(files: Array<File>) {
		files.forEach(file => this.notify(file.name + ' is not a valid file'));
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
