import {Component, OnInit} from "@angular/core";
import {ShardService} from "../../services/shard/shard.service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Identity} from "../../services/identities/identity.class";
import {IdentityService} from "../../services/identities/identity.service";

@Component({
	selector: 'app-identities',
	templateUrl: './identities.component.html',
	styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent implements OnInit {

	private identities: Array<Identity>;

	constructor(
		private router: Router,
		private shardService: ShardService,
		private identityService: IdentityService,
		private snackBar: MdSnackBar
	) {}

	ngOnInit() {
		if(!this.shardService.get()) {
			this.router.navigateByUrl('/');
		}

		this.loadIdentities();
	}

	loadIdentities(): void {
		this.identityService.getAll()
			.then(identities => this.identities = identities.filter(id => id.isValid()))
			.catch(err => {
				console.error(JSON.stringify(err));
				this.notify(err.msg);
			});
	}

	exportPublicKey(identity: Identity): void {
		let publicKeyBlob = new Blob([identity.publicKey], {type: 'application/x-pem-file'});
		let publicKeyUrl = URL.createObjectURL(publicKeyBlob);
		window.open(publicKeyUrl);
	}

	notify(message: string) {
		this.snackBar.open(message, "Close", {duration: 5000});
	}
}
