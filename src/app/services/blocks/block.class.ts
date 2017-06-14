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
	public receivedAt: number;
	public receivedFrom: string;

	constructor(payload: any) {
		this.data = payload.data;

		this.dataHash = payload.data_hash;
		this.signature = payload.signature;
		this.timestamp = payload.timestamp;
		this.nonce = payload.nonce;
		this.previous = payload.previous;

		this.hash = payload.hash;
		this.next = payload.next;
		this.height = payload.height;
		this.author = payload.author;
		this.receivedAt = payload.received_at;
		this.receivedFrom = payload.received_from;
	}

	isValid(): boolean {
		return this.data != null && this.data.length > 0
			&& this.dataHash != null && this.dataHash.length == 128
			&& this.signature != null && this.signature.length > 0
			&& this.timestamp != null && this.timestamp > 0
			&& this.nonce !== null && this.nonce >= 0
			&& this.previous !== null
			&& this.hash != null && this.hash.length == 128
			&& this.next !== null
			&& this.height != null && this.height > 0
			&& this.author != null && this.author.length == 40
			&& this.receivedAt != null && this.receivedAt > 0
			&& this.receivedFrom != null && this.receivedFrom.length > 0;
	}
}