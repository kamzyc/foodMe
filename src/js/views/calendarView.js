"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

import { setMaxHeight } from "../utilities.js";

class CalendarView extends View {
   _container = document.querySelector(".calendar__list");

   _error = "";

   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   resize() {
      setMaxHeight(this._container.parentNode);
   }

   _createMarkup() {
      return `${this._data.map(this._createDayMarkup).join("")}`;
   }

   _createDayMarkup(day) {
      return `
      <li class="calendar__day">
      <p class="calendar__day-name">${day.name}</p>
         ${day.recipe === {} ? "Set" : "EMPTY"}
    
      </li>
      `;
   }

   // _createButtonMarkup(day) {
   //    return `
   //       <button class="btn btn--small">
   //          ${
   //             day
   //                ? `<svg class="btn__icon" viewBox="0 0 24 24">
   //                      <path d="M0 0h24v24H0z" fill="none" />
   //                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
   //                   </svg>`
   //                : `<svg class="btn__icon" viewBox="0 0 24 24">
   //                      <path d="M0 0h24v24H0z" fill="none" />
   //                      <path d="M19 13H5v-2h14v2z" />
   //                   </svg>`
   //          }
   //       </button>
   //       `;
   // }
}

export default new CalendarView();
