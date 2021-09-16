"use strict";

import View from "../view.js";

import { ALERT_CLOSE_SEC, ALERT_STATUS } from "../config.js";

class AlertView extends View {
   _container = document.querySelector(".alert");

   toggle(data) {
      this.render(data);
      this._setColor();
      this._container.classList.toggle("alert__pop");

      setTimeout(() => {
         this._container.classList.toggle("alert__pop");
      }, ALERT_CLOSE_SEC * 1000);
   }

   _setColor() {
      this._container.classList.remove(
         `alert--${this._data.color === "red" ? "green" : "red"}`
      );
      this._container.classList.add(`alert--${this._data.color}`);
   }

   _createMarkup() {
      return `
      ${this._createIcon()}
      <p class="alert__text">${this._data.data}</p>`;
   }

   _createIcon() {
      // ing remove
      if (this._data.data === ALERT_STATUS.ingList.remove.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 13H5v-2h14v2z"/>
         </svg>
         `;

      //ing add
      if (this._data.data === ALERT_STATUS.ingList.add.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
         </svg>
         `;

      // bookmark add
      if (this._data.data === ALERT_STATUS.bookmark.add.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <rect fill="none" height="24" width="24"/>
            <path d="M19,21l-7-3l-7,3V5c0-1.1,0.9-2,2-2l7,0c-0.63,0.84-1,1.87-1,3c0,2.76,2.24,5,5,5c0.34,0,0.68-0.03,1-0.1V21z M17.83,9 L15,6.17l1.41-1.41l1.41,1.41l3.54-3.54l1.41,1.41L17.83,9z"/>
         </svg>
         `;

      // bookmark remove
      if (this._data.data === ALERT_STATUS.bookmark.remove.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <rect fill="none" height="24" width="24"/>
            <path d="M21,7h-6V5h6V7z M19,10.9c-0.32,0.07-0.66,0.1-1,0.1c-2.76,0-5-2.24-5-5c0-1.13,0.37-2.16,1-3L7,3C5.9,3,5,3.9,5,5v16l7-3 l7,3V10.9z"/>
         </svg>
         `;

      // upload ok
      if (this._data.data === ALERT_STATUS.upload.ok.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
         </svg>
         `;

      // upload fail
      if (this._data.data === ALERT_STATUS.upload.fail.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
         </svg>
         `;

      // clipboard ok
      if (this._data.data === ALERT_STATUS.clipboard.ok.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <g>
               <rect fill="none" height="24" width="24"/>
            </g>
            <g>
               <g>
                  <path d="M5,5h2v3h10V5h2v5h2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14 c0,1.1,0.9,2,2,2h6v-2H5V5z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z"/><polygon points="21,11.5 15.51,17 12.5,14 11,15.5 15.51,20 22.5,13"/>
               </g>
            </g>
         </svg>
         `;

      // clipboard fail
      if (this._data.data === ALERT_STATUS.clipboard.fail.data)
         return `
         <svg class="alert__icon" viewBox="0 0 24 24">
            <rect fill="none" height="24" width="24"/>
            <path d="M21.19,21.19L2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61L21.19,21.19z M5,19V7.83L16.17,19H5z M17,8V5 h2v11.17l2,2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5.83l5,5H17z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1 s-1-0.45-1-1S11.45,3,12,3z"/>
         </svg>
      `;
   }
}

export default new AlertView();
