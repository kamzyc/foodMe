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
                  <span class="preview__sub-title">${
                     this._data.publisher
                  }</span>

                  <svg class="preview__icon ${
                     this._data.key ? "" : "hidden"
                  }" viewBox="0 0 24 24">
                     <path
                        d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
                  </svg>
                  
                  <img src="${this._data.imageUrl}" alt="${
         this._data.title
      }" class="preview__img" crossOrigin = "anonymous">
      
               </figure>
            </a>
         </li>`;
   }
}

export default new PreviewView();
