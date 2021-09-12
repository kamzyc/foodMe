"use strict";

export default class View {
   _data;

   render(data, onlyMarkup = false) {
      if (!data || (Array.isArray(data) && data.length === 0))
         return this.renderError();

      this._data = data;

      const markup = this._createMarkup();

      if (onlyMarkup) return markup;

      this._clear();
      this._display(markup);
   }

   update(data) {
      this._data = data;
      const newMarkup = this._createMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll("*"));
      const curElements = Array.from(this._container.querySelectorAll("*"));

      newElements.forEach((newEl, i) => {
         const curEl = curElements[i];
         // console.log(curEl, newEl.isEqualNode(curEl));

         // Updates changed TEXT
         if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim() !== ""
         ) {
            // console.log('💥', newEl.firstChild.nodeValue.trim());
            curEl.textContent = newEl.textContent;
         }

         // Updates changed ATTRIBUES
         if (!newEl.isEqualNode(curEl))
            Array.from(newEl.attributes).forEach((attr) =>
               curEl.setAttribute(attr.name, attr.value)
            );
      });
   }

   /**
    * Render spinner animation inside container
    */
   renderSpinner() {
      const markup = `
         <div class="spinner">
            <div></div>
            <div></div>
            <div></div>
         </div>`;

      this._clear();
      this._display(markup);
   }

   /**
    * Remove all HTML markup from container
    */
   _clear() {
      this._container.innerHTML = "";
   }

   /**
    * Display HTML markup inside container
    * @param {string} markup
    */
   _display(markup) {
      this._container.insertAdjacentHTML("afterbegin", markup);
   }

   /**
    * Display error messege inside container
    * @param {string | null} message - text of error message
    */
   renderError(message = this._error) {
      const markup = `
      <div class="message">
      <svg class="message__icon message__icon--red" viewBox="0 0 24 24">
         <path d="M0 0h24v24H0V0z" fill="none" />
         <path
            d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
      <p class="message__text">${message}</p>
   </div>`;

      this._clear();
      this._display(markup);
   }
}
