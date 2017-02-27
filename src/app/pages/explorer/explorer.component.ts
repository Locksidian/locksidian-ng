import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";

declare const vis: any;

@Component({
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

	@ViewChild('explorer') explorer: ElementRef;

	constructor(
		private router: Router,
		private shardService: ShardService
	) {}

	ngOnInit() {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		this.drawNetwork();
	}

	drawNetwork(): void {
		// Mocked values
		let nodes = new vis.DataSet([
			{id: 1, label: 'Node 1', group: 1},
			{id: 2, label: 'Node 2', group: 1},
			{id: 3, label: 'Node 3', group: 2},
			{id: 4, label: 'Node 4', group: 2},
			{id: 5, label: 'Node 5', group: 1},
			{id: 6, label: 'Node 6', group: 1},
			{id: 7, label: 'Node 7', group: 1},
			{id: 8, label: 'Node 8', group: 1},
		]);

		let edges = new vis.DataSet([
			{from: 1, to: 2},
			{from: 2, to: 3},
			{from: 3, to: 4},
			{from: 2, to: 5},
			{from: 5, to: 6},
			{from: 6, to: 7},
			{from: 7, to: 8},
		]);

		// Network initialisation
		let data = {
			nodes: nodes,
			edges: edges
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

	onBlockSelected(params: any) {
		console.log('Selected: ' + params.nodes);
	}
}
