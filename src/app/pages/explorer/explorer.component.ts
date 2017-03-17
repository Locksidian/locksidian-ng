import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";
import {BlockService} from "../../services/blocks/block.service";
import {MdSnackBar} from "@angular/material";
import {Block} from "../../services/blocks/block.class";

declare const vis: any;

@Component({
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

	private syncing: boolean;
	private block: Block;

	// Vis.js network
	@ViewChild('explorer')
	private explorer: ElementRef;
	private nodes: Array<any>;
	private edges: Array<any>;

	constructor(
		private router: Router,
		private shardService: ShardService,
		private blockService: BlockService,
		private snackBar: MdSnackBar
	) {}

	ngOnInit() {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		this.redrawNetwork();
		this.syncChain('ORIGIN');
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

	syncChain(hash: string): void {
		this.syncing = true;

		// Mocked values
		this.nodes = [
			{id: 1, label: 'Node 1', group: 1},
			{id: 2, label: 'Node 2', group: 1},
			{id: 3, label: 'Node 3', group: 2},
			{id: 4, label: 'Node 4', group: 2},
			{id: 5, label: 'Node 5', group: 1},
			{id: 6, label: 'Node 6', group: 1},
			{id: 7, label: 'Node 7', group: 1},
			{id: 8, label: 'Node 8', group: 1},
		];

		this.edges = [
			{from: 1, to: 2},
			{from: 2, to: 3},
			{from: 3, to: 4},
			{from: 2, to: 5},
			{from: 5, to: 6},
			{from: 6, to: 7},
			{from: 7, to: 8},
		];

		this.blockService.get(hash)
			.then(block => {
				this.nodes.push({
					id: block.hash,
					label: block.hash,
					group: 1 // TODO: increment the group according to the fork depth of this block
				});

				if(block.previous) {
					this.edges.push({
						from: block.previous,
						to: block.hash
					});
				}

				this.redrawNetwork();

				if(block.next) {
					this.syncChain(block.next);
				}
			})
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});

		this.redrawNetwork();
		this.syncing = false;
	}

	onBlockSelected(params: any) {
		console.log('Selected: ' + params.nodes);

		let blockHash = params.nodes;
		this.blockService.get(blockHash)
			.then(block => {
				this.block = block;
				console.log(JSON.stringify(this.block));
			})
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
