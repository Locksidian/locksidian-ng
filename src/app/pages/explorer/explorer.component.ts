import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";
import {BlockService} from "../../services/blocks/block.service";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {Block} from "../../services/blocks/block.class";
import {RootComponent} from "../root/root.component";

declare const vis: any;

@Component({
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

	public syncing: boolean;
	public selectedBlock: Block;

	// Vis.js network
	@ViewChild('explorer')
	public explorer: ElementRef;
	public nodes: Array<any>;
	public edges: Array<any>;

	constructor(
		public router: Router,
		public shardService: ShardService,
		public blockService: BlockService,
		public snackBar: MdSnackBar,
		public dialog: MdDialog
	) {
		this.blockService.documentSubject.subscribe(_ => this.syncChain());
	}

	ngOnInit() {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		this.redrawNetwork();
		this.syncChain();
	}

	redrawNetwork(): void {
		let data = {
			nodes: this.nodes,
			edges: this.edges
		};

		let options = {
			nodes: {
				shape: 'dot'
			},
			edges: {
				smooth: {
					type: 'cubicBezier',
					forceDirection: 'horizontal',
					roundness: 0.4
				},
				color: {
					inherit: true
				}
			},
			layout: {
				hierarchical: {
					direction: 'LR',
					sortMethod: 'directed'
				}
			},
			physics: false,
			interaction: {
				dragNodes: false
			}
		};

		let network = new vis.Network(this.explorer.nativeElement, data, options);
		network.on('select', params => this.onBlockSelected(params));
	}

	syncChain(): void {
		this.syncing = true;
		this.nodes = [];
		this.edges = [];

		this.blockService.getHead()
			.then(head => this.syncBlock(head))
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});

		this.redrawNetwork();
		this.syncing = false;
	}

	syncBlock(hash: string) {
		this.blockService.get(hash)
			.then(block => {
				this.nodes.push({
					id: block.hash,
					label: block.hash.substring(0, 7),
					group: 1 // TODO: increment the group according to the fork depth of this block
				});

				if(block.next) {
					this.edges.push({
						from: block.hash,
						to: block.next
					});
				}

				this.redrawNetwork();

				if(block.previous) {
					this.syncBlock(block.previous);
				}
			})
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});
	}

	onBlockSelected(params: any) {
		let blockHash = params.nodes;

		if(blockHash == '')
			return;

		this.blockService.get(blockHash)
			.then(block =>
				//this.selectedBlock = block
				this.showQRCode(block)
			)
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});
	}

	showQRCode(block: Block): void {
		let shard = this.shardService.get();

		if(!shard) {
			this.notify('Shard is not connected to any Locksidian node');
			return;
		}

		let qrblockDialog = this.dialog.open(QRBlockDialog, {
			width: '250px'
		});

		qrblockDialog.componentInstance.url = shard.address + '/blocks/' + block.hash;
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}

@Component({
	selector: 'qrblock-dialog',
	templateUrl: 'qrblock.dialog.html'
})
export class QRBlockDialog {
	public url: string;
	constructor(private dialogRef: MdDialogRef<QRBlockDialog>) {}
}
