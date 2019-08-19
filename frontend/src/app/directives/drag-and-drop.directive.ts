// source: https://medium.com/@mariemchabeni/angular-7-drag-and-drop-simple-file-uploadin-in-less-than-5-minutes-d57eb010c0dc

import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appDragDrop]"
})
export class DragAndDropDirective {
  private backgroundColor = "#f5fcff";
  private backgroundOnDrop = "#5fba59";

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding("style.background-color") private background = this
    .backgroundColor;
  @HostBinding("style.opacity") private opacity = "1";

  //Dragover listener
  @HostListener("dragover", ["$event"]) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = this.backgroundOnDrop;
    this.opacity = "0.6";
  }

  //Dragleave listener
  @HostListener("dragleave", ["$event"]) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = this.backgroundColor;
    this.opacity = "1";
  }

  //Drop listener
  @HostListener("drop", ["$event"]) public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = this.backgroundColor;
    this.opacity = "1";
    
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}