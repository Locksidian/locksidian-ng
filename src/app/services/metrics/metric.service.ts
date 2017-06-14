import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ShardService} from "../shard/shard.service";
import {Metric} from "./metric.class";
import {environment} from "../../../environments/environment";

@Injectable()
export class MetricService {

	constructor(
		private http: Http,
		private shardService: ShardService
	) {}

	getAll(): Promise<Array<Metric>> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				let shard = this.shardService.get();

				if(!shard)
					reject({code: 1, msg: 'Shard is not connected to any Locksidian node'});

				this.http.get(shard.address + '/metrics')
					.map(data => data.json())
					.subscribe(
						payload => {
							let metrics = [];

							payload.forEach(json => {
								let metric = new Metric(json);

								if(metric.isValid())
									metrics.push(metric);
							});

							resolve(metrics);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve([
					new Metric({
						name: 'Blocks',
						value: 2809
					}),
					new Metric({
						name: 'Forks',
						value: 2
					}),
					new Metric({
						name: 'Peers',
						value: 3
					})
				]);
			}
		});
	}
}
