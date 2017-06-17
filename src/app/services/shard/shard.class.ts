export class Shard {

	public address: string;

	public name: string;
	public version: string;
	public description: string;
	public authors: string;

	constructor(address: string, payload: any) {
		this.address = address;

		this.name = payload.package;
		this.version = payload.version;
		this.description = payload.description;
		this.authors = payload.authors;
	}

	isValid(): boolean {
		return this.name != null && this.name.length > 0
			&& this.version != null && this.version.length > 0
			&& this.description != null && this.description.length > 0
			&& this.authors != null && this.authors.length > 0
			&& this.address != null && this.address.length > 0;
	}
}