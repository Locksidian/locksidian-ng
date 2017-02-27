export class Identity {

	public hash: string;
	public publicKey: string;

	constructor(payload: any) {
		this.hash = payload.hash;
		this.publicKey = payload.publicKey;
	}

	isValid(): boolean {
		return this.hash != null && this.hash.length == 40
			&& this.publicKey != null;
	}
}
