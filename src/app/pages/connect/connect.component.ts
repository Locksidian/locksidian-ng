import {Component, OnInit} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";

declare const particlesJS: any;

@Component({
	selector: 'app-root',
	templateUrl: 'connect.component.html',
	styleUrls: ['connect.component.css']
})
export class ConnectComponent implements OnInit {

	private connecting: boolean;

	constructor(
		private router: Router,
		private shardService: ShardService,
		private snackBar: MdSnackBar
	) {}

	ngOnInit(): void {
		if(this.shardService.get()) {
			this.router.navigateByUrl('/dashboard');
		}

		this.connecting = false;
		particlesJS.load('particles-js', 'assets/js/particles.json');
	}

	connect(address: string): void {
		this.connecting = true;
		console.log("Connecting to shard: " + address);

		this.shardService.lookup(address)
			.then((shard) => {
				console.log(JSON.stringify(shard));
				this.shardService.set(shard);
				this.connecting = false;

				this.router.navigateByUrl('/dashboard');
			})
			.catch((err) => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
				this.connecting = false;
			});
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
