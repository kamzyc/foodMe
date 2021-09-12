"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

import { setMaxHeight } from "../utilities.js";

class BookmarksView extends View {
   _container = document.querySelector(".bookmarks__list");

   _error =
      "No bookmarks yet! Pick your favourites and add them as favourites ;)";

   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   resize() {
      setMaxHeight(this._container.parentNode);
   }

   _createMarkup() {
      return this._data
         .map((result) => previewView.render(result, true))
         .join("");
   }

   updateNotification(numBookmarks) {
      document.querySelector(".navbar__info-bookmarks").textContent =
         numBookmarks;
   }
}

export default new BookmarksView();
