import {Component, OnInit} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";
import {PeerService} from "../../services/peers/peer.service";
import {MdSnackBar} from "@angular/material";
import {Peer} from "../../services/peers/peer.class";

declare const vis: any;

@Component({
	selector: 'app-peers',
	templateUrl: 'peers.component.html',
	styleUrls: ['peers.component.css']
})
export class PeersComponent implements OnInit {

	private map = {
		latitude: 25,
		longitude: 0,
		zoom: 3
	};

	private peers: Array<Peer>;

	constructor(
		private router: Router,
		private shardService: ShardService,
		private peerService: PeerService,
		private snackBar: MdSnackBar
	) {}

	ngOnInit() {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		this.loadPeers();
	}

	loadPeers(): void {
		this.peerService.getAll()
			.then(peers => {
				console.log(JSON.stringify(peers));
				this.peers = peers;

				this.peers.forEach(peer => {
					this.peerService.locate(peer)
						.then(payload => peer.locate(payload))
						.catch(err => console.error(JSON.stringify(err)));
				});
			})
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
				this.peers = [];
			})
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
