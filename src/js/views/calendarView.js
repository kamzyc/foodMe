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
      this._container.addEventListener("pointerdown", function (e) {
         e.preventDefault();
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
      return `${this._data.map(this._createDayMarkup.bind(this)).join("")}`;
   }

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

   _createDayNameMarkup({ name, recipe }) {
      if (isEmptyObject(recipe))
         return `<span class="calendar__day-name">${name}</span>`;
      return "";
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

   _createPreviewMarkup(recipe) {
      if (!isEmptyObject(recipe)) {
         return previewView.render(recipe, true).replaceAll("<li", "<div");
      }
      return "";
   }
}

export default new CalendarView();
