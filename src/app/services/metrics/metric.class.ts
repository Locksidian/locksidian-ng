export class Metric {

	public name: string;
	public value: string;

	constructor(payload: any) {
		this.name = payload.name;
		this.value = payload.value;
	}
}