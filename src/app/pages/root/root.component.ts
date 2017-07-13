import {Component} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {BlockService} from "../../services/blocks/block.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
	selector: 'app-root',
	templateUrl: 'root.component.html',
	styleUrls: ['root.component.css']
})
export class RootComponent {

	constructor(
		public router: Router,
		private shardService: ShardService,
		private blockService: BlockService,
		private snackBar: MdSnackBar
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
		files.forEach(file => {
			this.blockService.createBlock(file)
				.then(hash => {
					console.log(hash);
					this.notify(file.name + ' stored in block ' + hash);
				})
				.catch(err => {
					console.error(JSON.stringify(err));
					this.notify(err.msg);
				});
			return;
		});
	}

	notifyInvalidFiles(files: Array<File>) {
		files.forEach(file => this.notify(file.name + ' is not a valid file'));
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
