"use strict";

import View from "../view.js";

class AddRecipeView extends View {
   _container = document.querySelector(".new-recipe");

   _window = document.querySelector(".new-recipe-window");
   _overlay = document.querySelector(".overlay");
   _btnOpen = document.querySelector(".navbar__btn--add-recipe");
   _btnClose = document.querySelector(".new-recipe-window__btn");

   _ingContainer = document.querySelector(".new-recipe__ing-area");
   _btnAddIng = document.querySelector(".new-recipe__ing-add-btn");

   constructor() {
      super();
      this._addHandlerShowWindow();
      this._addHandlerHideWindow();
   }

   addHandlerUpload(handler) {
      this._container.addEventListener("submit", function (e) {
         e.preventDefault();
         const dataArr = [...new FormData(this)];
         const data = Object.fromEntries(dataArr);
         handler(data);
      });
   }

   toggleWindow() {
      this._overlay.classList.toggle("hidden");
      this._window.classList.toggle("hidden");
   }

   _addHandlerShowWindow() {
      this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
   }

   _addHandlerHideWindow() {
      [this._btnClose, this._overlay].forEach((element) =>
         element.addEventListener("click", this.toggleWindow.bind(this))
      );
   }

   addHandlerAddIng(handler) {
      this._btnAddIng.addEventListener("click", handler);
   }

   addHandlerRemoveIng(handler) {
      this._ingContainer.addEventListener("click", function (e) {
         const btn = e.target.closest(".new-recipe__ing-remove-btn");

         if (!btn) return;
         btn.parentNode.remove();

         handler();
      });
   }

   addHandlerClearInputs() {
      this._btnOpen.addEventListener("click", this._clearInputs.bind(this));
   }

   renderForm() {
      const markup = this._createFormMarkup();
      this._clear();
      this._display(markup);
   }

   appendIngMarkup(i) {
      this._ingContainer.insertAdjacentHTML(
         "beforeend",
         this._createIngMarkup(i)
      );
   }

   updateIng() {
      const elements = [...this._ingContainer.children];

      elements.forEach((element, i) => {
         // update h5
         element.querySelector("h5").textContent = `Ingredient ${i + 1}`;

         // update name attr
         element.querySelectorAll("input").forEach((input) => {
            let attr = input.getAttribute("name");
            input.setAttribute("name", attr.slice(0, -1) + i);
         });
      });
   }

   _clearInputs() {
      this._container.querySelectorAll("input").forEach((input) => {
         !!input.value && (input.value = "");
      });

      [...this._ingContainer.children].forEach((child) => {
         child.remove();
      });

      this.appendIngMarkup(1);
   }

   _createIngMarkup(i) {
      return `
      <div class="new-recipe__ing-field">
         <h5>Ingredient ${i}</h5>
         
         <button class="new-recipe__ing-remove-btn btn btn--small" type="button">
            <svg class="btn__icon" viewBox="0 0 24 24" width="24px">
               <path d="M0 0h24v24H0z" fill="none" />
               <path
               d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
         </button>
         
         <div class="new-recipe__field">
            <label>Quantity</label>
            <input type="number" min="0" name="quantity-${
               i - 1
            }" placeholder="Quantity" autocomplete="off">
         </div>
         <div class="new-recipe__field">
            <label>Unit</label>
            <input type="text" pattern=".*\\S.*" name="unit-${
               i - 1
            }" placeholder="Unit" autocomplete="off">
         </div>
         <div class="new-recipe__field">
            <label>Description</label>
            <input type="text" pattern=".*\\S.*" name="description-${
               i - 1
            }" placeholder="Description of ingredient"
            autocomplete="off" required>
         </div>
      </div>
      `;
   }

   _createFormMarkup() {
      return `
         <div class="row row-data">
            <h3>Recipe data</h3>

            <div class="new-recipe__field">
               <label for="title">Title</label>
               <input type="text" pattern=".*\\S.*" minlength="4" name="title" id="title" placeholder="Title of recipe"
                  autocomplete="off" required>
               <small>at least 4 letters</small>
            </div>

            <div class="new-recipe__field">
               <label for="sourceUrl">Source URL</label>
               <input type="url" pattern="https?://.+" name="sourceUrl" title="must starts with http:// or https://"
                  id="sourceUrl" placeholder="URL for source" autocomplete="off" required>
               <small>starts with https:// or http://</small>
            </div>

            <div class="new-recipe__field">
               <label for="image">Image URL</label>
               <input type="url" pattern="https?://.+" title="must starts with http:// or https://" name="image"
                  id="image" placeholder=" URL of image" autocomplete="off" required>
               <small>starts with https:// or http://</small>
            </div>

            <div class="new-recipe__field">
               <label for="publisher">Publisher</label>
               <input type="text" pattern=".*\\S.*" minlength="4" name="publisher" id="publisher" placeholder="Publisher of recipe"
                  autocomplete="off" required>
               <small>at least 4 letters</small>
            </div>

            <div class="new-recipe__field">
               <label for="cookingTime">Prep time (min)</label>
               <input type="number" min="0" title="must be number (at least 0)" name="cookingTime" id="cookingTime"
                  placeholder="Preparation time" autocomplete="off" required>
            </div>

            <div class="new-recipe__field">
               <label for="servings">Servings</label>
               <input type="number" min="1" title="must be number (at least 1)" name="servings" id="servings"
                  placeholder="Amount of servings" autocomplete="off" required>
            </div>
         </div>

         <div class="row row-ing">
            <h3>Ingredients</h3>

            <div class="new-recipe__ing-area">

               <div class="new-recipe__ing-field">
                  <h5>Ingredient 1</h5>

                  <button class="new-recipe__ing-remove-btn btn btn--small" type="button">
                     <svg class="btn__icon" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                           d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                     </svg>
                  </button>

                  <div class="new-recipe__field">
                     <label>Quantity</label>
                     <input type="number" min="0" title="must a number" name="quantity-0" placeholder="Quantity"
                        autocomplete="off">
                  </div>
                  <div class="new-recipe__field">
                     <label>Unit</label>
                     <input type="text" pattern=".*\\S.*" name="unit-0" placeholder="Unit" autocomplete="off">
                  </div>
                  <div class="new-recipe__field">
                     <label>Description</label>
                     <input type="text" pattern=".*\\S.*" name="description-0" placeholder="Description of ingredient"
                        autocomplete="off" required>
                  </div>
               </div>
            </div>

            <button class="new-recipe__ing-add-btn btn" type="button">
               <svg class="btn__icon" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
               </svg>
            </button>
         </div>

         <button class="new-recipe__upload-btn" type="submit">
            <div class="new-recipe__content">
               Upload
               <svg class="new-recipe__icon" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
               </svg>
            </div>
         </button>
      `;
   }
}

export default new AddRecipeView();
