"use strict";

import View from "../view.js";

import { setMaxHeight } from "../utilities.js";

class CalendarView extends View {
   _container = document.querySelector(".calendar__list");

   _error =
      "No bookmarks yet! Pick your favourites and add them as favourites ;)";

   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   resize() {
      setMaxHeight(this._container.parentNode);
   }

   _createMarkup() {}

   _createDayMarkup() {}
}

export default new CalendarView();
