"use strict";

import View from "../view.js";
import { setMaxHeight } from "../utilities.js";
import { Fraction } from "fraction.js";

class IngListView extends View {
   _container = document.querySelector(".ing-list__list");

   _error =
      "No ingredients added yet! Pick your favourite recipe and save ingredients list ;)";

   /**
    * Resposible for load ingredients list
    * @param {Function} handler Function to be called when load event happens
    */
   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   /**
    * Responsible for removing ingredient from ingredients list
    * @param {Function} handler Function to be called when pointerdown events happens
    */
   addHandlerRemoveIng(handler) {
      this._container.addEventListener(
         "pointerdown",
         function (e) {
            e.preventDefault();
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

   /**
    * Responsible for clipboard feature
    * @param {Function} handler Function to be called when click events happens
    */
   addHandlerClipboard(handler) {
      this._container.addEventListener("click", function (e) {
         const btn = e.target.closest(".ing-list__clipboard-btn");

         if (!btn) return;
         handler();
      });
   }

   /**
    * Responsible for removing all ingredients from ingredients list
    * @param {Function} handler Function to be called when click events happens
    */
   addHandlerRemoveAll(handler) {
      this._container.addEventListener("click", function (e) {
         const btn = e.target.closest(".ing-list__remove-all-btn");

         if (!btn) return;
         handler();
      });
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
      const ingredients = `${this._data
         .map(this._createIngredientMarkup)
         .join("")}`;

      return `${ingredients} ${this._createButtonsMarkup()}`;
   }

   /**
    * Create HTML markup for buttons
    * @returns {string} HTML markup
    */
   _createButtonsMarkup() {
      if (this._data.length) {
         return `
         <div class="ing-list__btns">
            ${this._createClipboardButtonMarkup()} ${this._createRemoveAllIngredientsButtonMarkup()}
         </div>
         `;
      }
      return "";
   }

   /**
    * Create HTML markup for clipboard button
    * @returns {string} HTML markup
    */
   _createClipboardButtonMarkup() {
      return `
      <button class="btn ing-list__clipboard-btn">
         add to clipboard
      </button>
      `;
   }

   /**
    * Create HTML markup for remove all ingredients button
    * @returns {string} HTML markup
    */
   _createRemoveAllIngredientsButtonMarkup() {
      return `
      <button class="btn ing-list__remove-all-btn">
         remove all
      </button>
   `;
   }

   /**
    * Create HTML markup for one ingredient
    * @param {Object} ingredient Object of ingredient {quantity, unit, description}
    * @returns {string} HTML markup of ingredient
    */
   _createIngredientMarkup(ingredient) {
      const quantityMarkup = ingredient.quantity
         ? `<div class="ingredients__item-quantity">${new Fraction(
              ingredient.quantity
           ).toFraction(true)}</div>`
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
