import {Component, OnInit} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";
import {PeerService} from "../../services/peers/peer.service";
import {MdSnackBar, MdDialogRef, MdDialog} from "@angular/material";
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
		private snackBar: MdSnackBar,
		private dialog: MdDialog
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
				this.peers = peers;

				this.peers.forEach(peer => {
					this.peerService.locate(peer)
						.then(payload => peer.locate(payload))
						.catch(err => {
							console.error(JSON.stringify(err));
							this.notify(err.msg);
						});
				});
			})
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
				this.peers = [];
			})
	}

	showPeer(peer: Peer): void {
		let peerDialog = this.dialog.open(PeerDialog, {
			width: '500px'
		});
		peerDialog.componentInstance.peer = peer;

	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}

@Component({
	selector: 'peer-dialog',
	templateUrl: 'peer.dialog.html',
	styleUrls: ['peer.dialog.css']
})
export class PeerDialog {

	public peer: Peer;

	constructor(private dialogRef: MdDialogRef<PeerDialog>) {}
}
