import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";
import {MetricService} from "../../services/metrics/metric.service";
import {MdSnackBar} from "@angular/material";
import {Metric} from "../../services/metrics/metric.class";

declare const particlesJS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private metrics: Array<Metric>;

	constructor(
		private router: Router,
		private shardService: ShardService,
		private metricService: MetricService,
		private snackBar: MdSnackBar
	) {}

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
