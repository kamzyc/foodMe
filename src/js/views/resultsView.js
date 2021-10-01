"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

class ResultsView extends View {
   _container = document.querySelector(".results");

   _error = "No recipies found! Please try another one.";

   /**
    * Create HTML markup
    * @returns {string} HTML markup
    */
   _createMarkup() {
      return this._data
         .map((result) => previewView.render(result, true))
         .join("");
   }
}

export default new ResultsView();
