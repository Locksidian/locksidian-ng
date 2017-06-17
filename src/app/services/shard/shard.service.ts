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
							let shard = new Shard(address, payload);

							if(!shard.isValid())
								reject({code: 1, msg: 'No Locksidian node hosted at this address'});
							else if(shard.version !== environment.versionRequirement)
								reject({code: 2, msg: 'Node version is not compatible with this Shard client (required: v' + environment.versionRequirement + ')'});
							resolve(shard);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve(new Shard('http://127.0.0.1:8080', {
					"authors": "Valentin Fries, Aurélien Duval",
					"package": "locksidian",
					"description": "The one vault your data really need",
					"version": "0.1.2"
				}));
			}
		});
	}
}