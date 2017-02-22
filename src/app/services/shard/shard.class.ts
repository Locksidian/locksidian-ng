export class Shard {

	public identity: string;
	public publicKey: string;

	constructor(payload: any) {
		this.identity = payload.identity;
		this.publicKey = payload.publicKey;
	}

	isValid(): boolean {
		return this.identity != null && this.identity.length == 40
			&& this.publicKey != null && this.publicKey.length > 0;
	}
}