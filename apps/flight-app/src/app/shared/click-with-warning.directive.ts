import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickWithWarning]',
})
export class ClickWithWarningDirective implements OnInit {
  @Input() warning: string = 'Are you sure?';
  @Output() clickWithWarning = new EventEmitter();
  @HostBinding('class') cssClass: string | undefined;

  ngOnInit() {
    this.cssClass = 'btn btn-danger';
  }

  @HostListener('click', ['$event'])
  handleClick($event: Event): void {
    console.log('handleClick', $event);
    if (confirm(this.warning)) {
      this.clickWithWarning.emit();
    }
  }
}
