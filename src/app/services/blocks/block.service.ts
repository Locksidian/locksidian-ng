import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ShardService} from "../shard/shard.service";
import {environment} from "../../../environments/environment";
import {Block} from "./block.class";

@Injectable()
export class BlockService {

	constructor(
		private http: Http,
		private shardService: ShardService
	) {}

	getHead(): Promise<string> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				let shard = this.shardService.get();

				if(!shard)
					reject({code: 1, msg: 'Shard is not connected to any Locksidian node'});

				this.http.get(shard.address + '/blocks')
					.map(data => data.json())
					.subscribe(
						payload => {
							if(payload.head === undefined)
								reject({code: 0, msg: 'Invalid payload received from the remote node'});

							resolve(payload.head);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					)
			}
			else {
				resolve(new Block({
					'hash': '42dd8fe5ccb19ba61c4c0873d391e9879c95a64f'
				}));
			}
		})
	}

	get(hash: string): Promise<Block> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				let shard = this.shardService.get();

				if(!shard)
					reject({code: 1, msg: 'Shard is not connected to any Locksidian node'});

				this.http.get(shard.address + '/blocks/' + hash)
					.map(data => data.json())
					.subscribe(
						payload => {
							let block = new Block(payload);

							if(!block.isValid())
								reject({code: 0, msg: 'Invalid block received from the remote node'});
							resolve(block);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve(new Block({
					'hash': '42dd8fe5ccb19ba61c4c0873d391e9879c95a64f'
				}));
			}
		});
	}
}