import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";
import {MetricService} from "../../services/metrics/metric.service";
import {MdSnackBar} from "@angular/material";

declare const particlesJS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
	}
}
