export class Peer {

	public address: string;
	public key: string;

	public latitude: number;
	public longitude: number;
	public timeZone: string;
	public country: string;
	public countryCode: string;

	constructor(payload: any) {
		this.address = payload.address;
		this.key = payload.key;
	}

	isValid(): boolean {
		return this.key != null && this.key.length > 0
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