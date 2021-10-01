"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

import { setMaxHeight } from "../utilities.js";

class BookmarksView extends View {
   _container = document.querySelector(".bookmarks__list");

   _error =
      "No bookmarks yet! Pick your favourites and add them as favourites ;)";

   /**
    * Responsible for load bookmarks
    * @param {Function} handler Function to be called when load events happens
    */
   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   /**
    * Set max-height property of container
    */
   resize() {
      setMaxHeight(this._container.parentNode);
   }

   /**
    * Create HTML markup
    * @returns {string} HTML markup
    */
   _createMarkup() {
      return this._data
         .map((result) => previewView.render(result, true))
         .join("");
   }

   /**
    * Update number of bookmarks in the DOM element (inside button)
    * @param {number} numBookmarks Number of bookmarks in state
    */
   updateNotification(numBookmarks) {
      document.querySelector(".navbar__info-bookmarks").textContent =
         numBookmarks;
   }
}

export default new BookmarksView();
