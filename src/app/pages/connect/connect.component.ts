import {Component, OnInit} from "@angular/core";

declare const particlesJS: any;

@Component({
	selector: 'app-root',
	templateUrl: 'connect.component.html',
	styleUrls: ['connect.component.css']
})
export class ConnectComponent implements OnInit {
	ngOnInit(): void {
		particlesJS.load('particles-js', '/assets/js/particles.json');
	}
}
