"use strict";

import View from "../view.js";

class PreviewView extends View {
   _container = null;

   /**
    * Create HTML markup
    * @returns {string} HTML markup
    */
   _createMarkup() {
      const id = window.location.hash.slice(1);

      return `
         <li class="preview">
            <a class="preview__link ${
               this._data.id === id ? "preview__link-active" : ""
            }" href="#${this._data.id}">
               <figure class="preview__card">
                  <h3 class="preview__title">${this._data.title}</h3>
                  <h4 class="preview__sub-title">${this._data.publisher}</h4>
                  <img src="${this._data.imageUrl}" alt="${
         this._data.title
      }" class="preview__img" crossOrigin = "anonymous">
      
               </figure>
            </a>
         </li>`;
   }
}

export default new PreviewView();
