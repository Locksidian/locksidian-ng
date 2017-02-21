export class Shard {

	public identity: string;
	public publicKey: string;

	constructor(payload: any) {
		this.identity = payload.identity;
		this.publicKey = payload.publicKey;
	}
}