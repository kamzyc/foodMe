"use strict";

import View from "../view.js";

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
         <p class="calendar__day-name">${Object.keys(day)}</p>
         
      </li>
      `;
   }
}

export default new CalendarView();
