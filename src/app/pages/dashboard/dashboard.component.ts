import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";
import {MetricService} from "../../services/metrics/metric.service";
import {MdSnackBar} from "@angular/material";
import {Metric} from "../../services/metrics/metric.class";
import {BlockService} from "../../services/blocks/block.service";

declare const particlesJS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public metrics: Array<Metric>;

	constructor(
		public router: Router,
		public shardService: ShardService,
		public metricService: MetricService,
		public blockService: BlockService,
		public snackBar: MdSnackBar
	) {
		this.blockService.documentSubject.subscribe(_ => this.loadMetrics());
	}

	ngOnInit(): void {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		particlesJS.load('particles-js', 'assets/js/particles.json');
		this.loadMetrics();
	}

	loadMetrics(): void {
		this.metricService.getAll()
			.then(metrics => this.metrics = metrics)
			.catch(err => {
				console.error(err);
				this.notify(err.msg);
			});
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
