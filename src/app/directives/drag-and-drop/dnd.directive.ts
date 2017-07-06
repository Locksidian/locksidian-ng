import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from "@angular/core";
import {forEach} from "@angular/router/src/utils/collection";

@Directive({
	selector: '[drag-and-drop]'
})
export class DragAndDropDirective {

	@Input() public extensions: Array<string> = [];

	@Output() public onFilesDrop: EventEmitter<Array<File>> = new EventEmitter();
	@Output() public onInvalidFilesDrop: EventEmitter<Array<File>> = new EventEmitter();

	@HostBinding('style.background') public background = 'inherit';

	constructor() {}

	@HostListener('drop', ['$event']) public onDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		let files = event.dataTransfer.files;
		let validFiles: Array<File> = [];
		let invalidFiles: Array<File> = [];

		if(files.length > 0) {
			forEach(files, (file: File) => {
				if(this.extensions.length == 0) {
					validFiles.push(file);
				}
				else {
					let parts = file.name.split('.');

					if(parts.length > 1) {
						let extension = parts[parts.length - 1];

						if(this.extensions.indexOf(extension) != -1)
							validFiles.push(file);
						else
							invalidFiles.push(file);
					}
				}
			});

			if(validFiles.length > 0)
				this.onFilesDrop.emit(validFiles);
			if(invalidFiles.length > 0)
				this.onInvalidFilesDrop.emit(invalidFiles);
		}

		this.background = 'inherit'
	}

	@HostListener('dragover', ['$event']) public onDragOver(event){
		event.preventDefault();
		event.stopPropagation();

		this.background = '#485157';
	}

	@HostListener('dragleave', ['$event']) public onDragLeave(event){
		event.preventDefault();
		event.stopPropagation();

		this.background = 'inherit'
	}
}