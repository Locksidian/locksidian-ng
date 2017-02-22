export class Peer {

	public identity: string;
	public publicKey: string;
	public address: string;

	public latitude: number;
	public longitude: number;
	public timeZone: string;
	public country: string;
	public countryCode: string;

	constructor(payload: any) {
		this.identity = payload.identity;
		this.publicKey = payload.publicKey;
		this.address = payload.address;
	}

	isValid(): boolean {
		return this.identity != null && this.identity.length == 40
			&& this.publicKey != null && this.publicKey.length > 0
			&& this.address != null && this.address.length > 0;
	}

	locate(payload): void {
		this.latitude = payload.latitude;
		this.longitude = payload.longitude;
		this.timeZone = payload.time_zone;
		this.country = payload.country_name;
		this.countryCode = payload.country_code;
	}
}