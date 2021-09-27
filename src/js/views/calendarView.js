"use strict";

import View from "../view.js";
import previewView from "./previewView.js";

import { setMaxHeight, isEmptyObject } from "../utilities.js";

class CalendarView extends View {
   _container = document.querySelector(".calendar__list");

   _error = "";

   addHandlerRender(handler) {
      window.addEventListener("load", handler);
   }

   addHandlerAddRecipe(handler) {
      this._container.addEventListener("click", function (e) {
         const btn = e.target.closest(".calendar__btn");

         if (!btn) return;

         const { day } = btn.dataset;
         handler(+day);
      });
   }

   resize() {
      setMaxHeight(this._container.parentNode);
   }

   _createMarkup() {
      const markup = `${this._data
         .map(this._createDayMarkup.bind(this))
         .join("")}`;

      return markup;
   }

   // _createMarkup() {
   //    return this._data
   //       .map((result) => previewView.render(result, true))
   //       .join("");
   // }

   _createDayMarkup(day, i) {
      return `
      <li class="calendar__day">
         <span class="calendar__day-name">${day.name}</span>
            <button class="btn btn--small calendar__btn" data-day="${i}">
               ${this._createIconMarkup(day.recipe)}
            </button>
      </li>
      `;
   }

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
}

export default new CalendarView();
