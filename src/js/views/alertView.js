"use strict";

import View from "../view.js";

import { ALERT_CLOSE_SEC } from "../config.js";

class AlertView extends View {
   _container = document.querySelector(".alert");

   toggle(data) {
      this.render(data);
      this._container.classList.toggle("hidden");

      setTimeout(
         () => this._container.classList.toggle("hidden"),
         ALERT_CLOSE_SEC * 1000
      );
   }

   _createMarkup() {
      return this._data.data;
   }

   // _createMarkup() {
   //    switch (this._data) {
   //       case "ingAdded":
   //          return "ingAdded";

   //       case "ingRemoved":
   //          return "ingRemoved";

   //       case "bookmarkAdded":
   //          return `
   //          <svg class="alert__icon" viewBox="0 0 24 24">
   //             <path
   //                d="M19,21l-7-3l-7,3V5c0-1.1,0.9-2,2-2l7,0c-0.63,0.84-1,1.87-1,3c0,2.76,2.24,5,5,5c0.34,0,0.68-0.03,1-0.1V21z M17.83,9 L15,6.17l1.41-1.41l1.41,1.41l3.54-3.54l1.41,1.41L17.83,9z" />
   //          </svg>
   //          <p class="alert__text">Bookmark added</p>
   //          `;

   //       case "bookmarkRemoved":
   //          return `
   //          <svg class="alert__icon" viewBox="0 0 24 24">
   //             <rect/>
   //             <path
   //                d="M21,7h-6V5h6V7z M19,10.9c-0.32,0.07-0.66,0.1-1,0.1c-2.76,0-5-2.24-5-5c0-1.13,0.37-2.16,1-3L7,3C5.9,3,5,3.9,5,5v16l7-3 l7,3V10.9z" />
   //          </svg>
   //          <p class="alert__text">Bookmark removed</p>
   //          `;
   //       case "uploaded":
   //          return "uploaded";
   //    }
   // }
}

export default new AlertView();
