"use strict";

import View from "../view.js";

import { Fraction } from "fractional";

class RecipieView extends View {
   _container = document.querySelector(".recipe");

   _error = "We could not find that recipe. Please try another one ;)";

   addHandlerRender(handler) {
      ["load", "hashchange"].forEach((event) =>
         window.addEventListener(event, handler)
      );
   }

   addHandlerServings(handler) {
      this._container.addEventListener("click", (e) => {
         e.preventDefault();
         const btn = e.target.closest(".btn-update");

         if (!btn) return;

         const { update } = btn.dataset;
         handler(+update || 1);
      });
   }

   addHandlerBookmarks(handler) {
      this._container.addEventListener("click", (e) => {
         e.preventDefault();
         const btn = e.target.closest(".btn-bookmark");

         if (!btn) return;
         handler();
      });
   }

   addHandlerIngList(handler) {
      this._container.addEventListener("click", (e) => {
         e.preventDefault();
         const btn = e.target.closest(".ingredients__add-ing");

         if (!btn) return;
         handler();
      });
   }

   _createMarkup() {
      return [
         this._createTitleMarkup(),
         this._createDetailsMarkup(),
         this._createIngredientsMarkup(),
         this._createLinkMarkup(),
      ].join("");
   }

   _createTitleMarkup() {
      return `
      <figure class="title">
         <h1 class="title__text">${this._data.title}</h1>
         <img src="${this._data.imageUrl}" class="title__img" alt="${this._data.title}" crossOrigin = "anonymous">
      </figure>
      `;
   }

   _createDetailsMarkup() {
      return `
      <section class="details">
         <div class="detail">
            <svg class="detail__icon" viewBox="0 0 24 24">

            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
               d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>

            <p class="detail__text">${this._data.cookingTime} minutes</p>
         </div>
   
         <div class="detail">
            <svg class="detail__icon" viewBox="0 0 24 24">
               <path
                  d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z" />
               <path
               d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z" />
            </svg>

            <p class="detail__text">${this._data.servings} Servings</p>


            <div class="detail__btns">
               <button class="btn btn-update" data-update="${
                  this._data.servings - 1
               }">
                  <svg class="btn__icon" viewBox="0 0 24 24">
                     <path d="M0 0h24v24H0z" fill="none" />
                     <path d="M19 13H5v-2h14v2z" />
                  </svg>
               </button>

               <button class="btn btn-update" data-update="${
                  this._data.servings + 1
               }">
                  <svg class="btn__icon" viewBox="0 0 24 24">
                     <path d="M0 0h24v24H0z" fill="none" />
                     <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
               </button>
            </div>
         </div>

         <div class="detail">
            <svg class="detail__icon detail__icon--user${
               this._data.key ? "-active" : ""
            }" viewBox="0 0 24 24">
               <path
                  d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
            </svg>
         </div>

         <button class="btn btn-bookmark ${
            this._data.bookmarked ? "btn--active" : ""
         }">
            <svg class="btn__icon" viewBox="0 0 24 24">
               <path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z" />
            </svg>
         </button>
      </section>
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
         </li>
      `;
   }

   _createIngredientsMarkup() {
      return `
      <section class="ingredients">
         <h3 class="ingredients__title">Recipie ingredients</h3>
         <ul class="ingredients__list">
            ${this._data.ingredients.map(this._createIngredientMarkup).join("")}
         </ul>

         <button class="btn ingredients__add-ing">
            <svg class="btn__icon" viewBox="0 0 24 24">
               <path d="M0 0h24v24H0z" fill="none" />
               <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add to list
         </button>
      </section>
      `;
   }

   _createLinkMarkup() {
      return `
      <section class="source">
         <h3 class="source__title">Wanna cook it?</h3>

         <p class="source__text">
         This recipe was carefully designed and tested by <strong>${this._data.publisher}</strong>. Please check out
         directions at their website.
         </p>

         <a class="source__link" href="${this._data.sourceUrl}" target="_blank">
            <div class="source__content">
               Full recipe
               <svg class="source__icon" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
               </svg>
            </div>
         </a>
      </section>
      `;
   }
}

export default new RecipieView();
