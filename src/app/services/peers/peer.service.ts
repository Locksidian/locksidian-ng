import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ShardService} from "../shard/shard.service";
import {Peer} from "./peer.class";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const FREEGEOIP_URL: string = "https://freegeoip.net/json/";

@Injectable()
export class PeerService {

	constructor(
		private http: Http,
		private shardService: ShardService
	) {}

	getAll(): Promise<Array<Peer>> {
		return new Promise((resolve, reject) => {
			if(environment.production) {
				let shard = this.shardService.get();

				if (!shard)
					reject({code: 1, msg: 'Shard is not connected to any Locksidian node'});

				this.http.get(shard.address + '/peers')
					.map(data => data.json())
					.subscribe(
						payload => {
							let peers = [];

							payload.forEach(rawPeer => {
								let peer = new Peer(rawPeer);

								if (peer.isValid()) {
									peers.push(peer);
								}
							});

							resolve(peers);
						},
						err => reject({code: 0, msg: 'Unable to connect to the remote node', raw: err})
					);
			}
			else {
				resolve([
					new Peer({
						identity: 'b94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '7924110cde4fa051bfdc600a60620dc7aa9d3c6a',
						address: 'http://83.142.147.16:3000'
					}),
					new Peer({
						identity: 'c94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '8924110cde4fa051bfdc600a60620dc7aa9d3c6a',
						address: 'https://www.fries.io:443'
					}),
					new Peer({
						identity: 'd94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
						publicKey: '9924110cde4fa051bfdc600a60620dc7aa9d3c6a',
						address: 'https://reddit.com:443'
					})
				]);
			}
		});
	}

	locate(peer: Peer): Promise<any> {
		return new Promise((resolve, reject) => {
			let host = this.extractHost(peer.address);
			console.log('Probing ' + FREEGEOIP_URL + host + '...');

			this.http.get(FREEGEOIP_URL + host)
				.map(data => data.json())
				.subscribe(
					payload => resolve(payload),
					err => reject({code: 0, msg: 'Unable to connect to the GeoIP location provider', raw: err})
				);
		});
	}

	private extractHost(address: string): string {
		let protocol = address.indexOf('://');
		if(protocol > -1) {
			address = address.substr(protocol + 3);
		}

		let colon = address.indexOf(':');
		if(colon > -1) {
			address = address.substr(0, colon);
		}

		return address;
	}
}