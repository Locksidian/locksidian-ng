export class Block {

	// Block Data
	public data: string;

	// Block Header
	public dataHash: string;
	public signature: string;
	public timestamp: number;
	public nonce: number;
	public previous: string;

	// Block Metadata
	public hash: string;
	public next: string;
	public height: number;
	public author: string;

	constructor(payload: any) {
		this.data = payload.data;

		this.dataHash = payload.dataHash;
		this.signature = payload.signature;
		this.timestamp = payload.timestamp;
		this.nonce = payload.nonce;
		this.previous = payload.previous;

		this.hash = payload.hash;
		this.next = payload.next;
		this.height = payload.height;
		this.author = payload.author;
	}

	isValid(): boolean {
		return this.hash != null;
	}
}