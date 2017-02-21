import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ShardService} from "../../services/shard/shard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		private router: Router,
		private shardService: ShardService
	) {}

	ngOnInit(): void {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}
	}
}
