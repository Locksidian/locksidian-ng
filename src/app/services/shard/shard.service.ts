import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Shard} from "./shard.class";
import {environment} from "../../../environments/environment";

@Injectable()
export class ShardService {

	private shard: Shard;

	constructor(private http: Http) {}

	set(shard: Shard) {
		this.shard = shard;
	}

	get(): Shard {
		return this.shard;
	}

	lookup(address: string): Promise<Shard> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				this.http.get(address)
					.map(data => data.json())
					.subscribe(
						payload => {
							let shard = new Shard(payload, address);

							if(!shard.isValid())
								reject({code: 1, msg: 'Remote node provided an invalid identity'});
							resolve(shard);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve(new Shard({
					identity: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
					publicKey: '6924110cde4fa051bfdc600a60620dc7aa9d3c6a'
				}, 'https://www.fries.io/'));
			}
		});
	}
}