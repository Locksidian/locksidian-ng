import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ShardService {

	private shardAddress: string;

	constructor(private http: Http) {
		//this.shardAddress = "localhost:8080";
	}

	getShardAddress(): string {
		return this.shardAddress;
	}
}