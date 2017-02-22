export class Shard {

	public identity: string;
	public publicKey: string;
	public address: string;

	constructor(payload: any, address: string) {
		this.identity = payload.identity;
		this.publicKey = payload.publicKey;
		this.address = address;
	}

	isValid(): boolean {
		return this.identity != null && this.identity.length == 40
			&& this.publicKey != null && this.publicKey.length > 0
			&& this.address != null && this.address.length > 0;
	}
}