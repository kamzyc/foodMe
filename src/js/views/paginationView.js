"use strict";

import View from "../view.js";

class PaginationView extends View {
   _container = document.querySelector(".pag");

   addHandlerClick(handler) {
      this._container.addEventListener("click", (e) => {
         const btn = e.target.closest(".pag__btn");

         if (!btn) return;

         const { goto } = btn.dataset;
         handler(+goto);
      });
   }

   _createMarkup() {
      const numPages = Math.ceil(
         this._data.results.length / this._data.recipiesPerSide
      );

      // PAGE 1 AND THERE ARE NEXT:
      // currPage btn
      // next page btn
      // last page btn
      if (this._data.page === 1 && numPages > 1)
         return (
            this._createCurrPageButtonMarkup() +
            this._createNextPageButtonMarkup() +
            this._createLastPageButtonMarkup(numPages)
         );

      // LAST PAGE :
      // first page btn
      // prev btn
      // currPage btn
      if (this._data.page !== 1 && this._data.page === numPages)
         return (
            this._createFirstPageButtonMarkup() +
            this._createPrevPageButtonMarkup() +
            this._createCurrPageButtonMarkup()
         );

      // OTHER PAGE:
      // first page btn
      // prev btn
      // currPage btn
      //next btn
      //last page btn
      if (this._data.page > 1 && this._data.page < numPages) {
         return (
            this._createFirstPageButtonMarkup() +
            this._createPrevPageButtonMarkup() +
            this._createCurrPageButtonMarkup() +
            this._createNextPageButtonMarkup() +
            this._createLastPageButtonMarkup(numPages)
         );
      }

      // just 1 page
      if (this._data.results.length > 0)
         return this._createCurrPageButtonMarkup();

      // if no results
      return "";
   }

   _createCurrPageButtonMarkup() {
      return `
      <button data-goto="${this._data.page}" class="pag__btn btn btn--active">
         ${this._data.page}
      </button>`;
   }

   _createNextPageButtonMarkup() {
      return `
      <button data-goto="${this._data.page + 1}" class="pag__btn btn">
         <svg class="btn__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
         </svg>
      </button>`;
   }

   _createPrevPageButtonMarkup() {
      return `
      <button data-goto="${this._data.page - 1}" class="pag__btn btn">
         <svg class="btn__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
         </svg>
      </button>`;
   }

   _createFirstPageButtonMarkup() {
      return `
      <button data-goto="${1}" class="pag__btn btn">
         <svg class="btn__icon" viewBox="0 0 24 24">
            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
            <path d="M24 24H0V0h24v24z" fill="none" />
         </svg>
      </button>`;
   }

   _createLastPageButtonMarkup(numPages) {
      return `
      <button data-goto="${numPages}" class="pag__btn btn">
         <svg class="btn__icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
         </svg>
      </button>`;
   }
}

export default new PaginationView();
