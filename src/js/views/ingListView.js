"use strict";

import View from "../view.js";
import { setMaxHeight } from "../utilities.js";
import { Fraction } from "fraction.js";

class IngListView extends View {
   _container = document.querySelector(".ing-list__list");

   _error =
      "No ingredients added yet! Pick your favourite recipe and save ingredients list ;)";

   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   addHandlerRemoveIng(handler) {
      this._container.addEventListener(
         "click",
         function (e) {
            const btn = e.target.closest(".ing-list__remove-btn");

            if (!btn) return;

            const i = [...this._container.children].findIndex(
               (element) => element === btn.parentNode
            );

            btn.parentNode.remove();
            handler(i);
         }.bind(this)
      );
   }

   addHandlerClipboard(handler) {
      this._container.addEventListener("click", function (e) {
         const btn = e.target.closest(".ing-list__clipboard-btn");

         if (!btn) return;
         handler();
      });
   }

   addHandlerRemoveAll(handler) {
      this._container.addEventListener("click", function (e) {
         const btn = e.target.closest(".ing-list__remove-all-btn");

         if (!btn) return;
         handler();
      });
   }

   resize() {
      setMaxHeight(this._container.parentNode);
   }

   _createMarkup() {
      const ingredients = `${this._data
         .map(this._createIngredientMarkup)
         .join("")}`;

      return `${ingredients} ${this._createClipboardButtonMarkup()} ${this._createRemoveAllIngredientsButtonMarkup()}`;
   }

   _createClipboardButtonMarkup() {
      if (this._data.length !== 0)
         return `
      <button class="btn ing-list__clipboard-btn">
         add to clipboard
      </button>
      `;
   }

   _createRemoveAllIngredientsButtonMarkup() {
      if (this._data.length !== 0)
         return `
      <button class="btn ing-list__remove-all-btn">
         remove all
      </button>
   `;
   }

   _createIngredientMarkup(ingredient) {
      const quantityMarkup = ingredient.quantity
         ? `<div class="ingredients__item-quantity">${new Fraction(
              ingredient.quantity
           ).toString()}</div>`
         : "";
      const unitMarkup = ingredient.unit
         ? `<div class="ingredients__item-unit">${ingredient.unit}</div>`
         : "";

      return `
         <li class="ingredients__item">
            <span class="ingredients__item-mark">&FilledSmallSquare;</span>
            ${quantityMarkup}
            ${unitMarkup}
            <div class="ingredients__item-text">${ingredient.description}</div>

            <button class="ing-list__remove-btn btn btn--very-small">
               <svg class="btn__icon" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 13H5v-2h14v2z" />
               </svg>
            </button>
         </li>
      `;
   }
}

export default new IngListView();
