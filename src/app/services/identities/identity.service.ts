import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ShardService} from "../shard/shard.service";
import {Identity} from "./identity.class";
import {environment} from "../../../environments/environment";

@Injectable()
export class IdentityService {

	constructor(
		private http: Http,
		private shardService: ShardService
	) {}

	getAll(): Promise<Array<Identity>> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				let shard = this.shardService.get();

				if(!shard)
					reject({code: 1, msg: 'Shard is not connected to any Locksidian node'});

				this.http.get(shard.address + '/identities')
					.map(data => data.json())
					.subscribe(
						payload => resolve(payload.map(rawIdentity => new Identity(rawIdentity))),
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve([
					new Identity({
						hash: 'b95a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '7924110cde4fa051bfdc600a60620dc7aa9d3c6b'
					}),
					new Identity({
						hash: 'b96a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '7924110cde4fa051bfdc600a60620dc7aa9d3c6c'
					}),
					new Identity({
						hash: 'b97a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '7924110cde4fa051bfdc600a60620dc7aa9d3c6d'
					}),
					new Identity({
						hash: 'b98a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '7924110cde4fa051bfdc600a60620dc7aa9d3c6e'
					}),
				])
			}
		});
	}
}
