import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styles: [ ':host { position: relative; bottom: 100%; color: #fff }' ],
  styleUrls: ['./compose-message.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ComposeMessageComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  details: string;
  sending: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  send(): void {
    this.sending = true;
    this.details = 'sending message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1500);
  }

  cancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this._router.navigate([{ outlets: { popup: null }}]);
  }

}
