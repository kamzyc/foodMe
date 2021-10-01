"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

import { setMaxHeight, isEmptyObject } from "../utilities.js";

class CalendarView extends View {
   _container = document.querySelector(".calendar__list");

   _error = "";

   /**
    * Responsible for load calendar
    * @param {Function} handler Function to be called when load events happens
    */
   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   /**
    * Responsible for adding recipe into calendar
    * @param {Function} handler Function to be called when pointerdown events happens
    */
   addHandlerAddRecipe(handler) {
      this._container.addEventListener("pointerdown", function (e) {
         e.preventDefault();
         const btn = e.target.closest(".calendar__btn");
         if (!btn) return;

         const { day } = btn.dataset;
         handler(+day);
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
      return `${this._data.map(this._createDayMarkup.bind(this)).join("")}`;
   }

   /**
    * Create HTML markup for given day
    * @param {Object} day Object of given day {name, recipe}
    * @param {number} i Number of given day
    * @returns
    */
   _createDayMarkup(day, i) {
      return `
      <li class="calendar__day">
         ${this._createDayNameMarkup(day)}
         <button class="btn btn--small calendar__btn" data-day="${i}">
            ${this._createIconMarkup(day.recipe)}
         </button>
         ${this._createPreviewMarkup(day.recipe)}
      </li>
      `;
   }

   /**
    * Create HTML markup for given day name
    * @param {Object} day Object of given day {name, recipe}
    * @returns {string} HTML markup
    */
   _createDayNameMarkup(day) {
      if (isEmptyObject(day.recipe))
         return `<span class="calendar__day-name">${day.name}</span>`;
      return "";
   }

   /**
    * Create HTML markup for icon
    * @returns {string} HTML markup
    */
   _createIconMarkup(recipe) {
      if (isEmptyObject(recipe))
         return `
         <svg class="btn__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
         </svg>`;
      return `
      <svg class="btn__icon" viewBox="0 0 24 24">
         <path d="M0 0h24v24H0z" fill="none" />
         <path d="M19 13H5v-2h14v2z" />
      </svg>`;
   }

   /**
    * Create HTML markup for one preview
    * @returns {string} HTML markup
    */
   _createPreviewMarkup(recipe) {
      if (!isEmptyObject(recipe)) {
         return previewView.render(recipe, true).replaceAll("<li", "<div");
      }
      return "";
   }
}

export default new CalendarView();
