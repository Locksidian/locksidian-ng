export class Metric {

	public name: string;
	public value: any;

	constructor(payload: any) {
		this.name = payload.name;
		this.value = payload.value;
	}

	isValid(): boolean {
		return this.name != null && this.name.length > 0 && this.value != null;
	}
}