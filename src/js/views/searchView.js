"use strict";

class SearchView {
   _container = document.querySelector(".search");
   _inputField = document.querySelector(".search__field");

   /**
    * Responsible for search feature
    * @param {Function} handler Function to be called when submit event happens
    */
   addHandlerSearch(handler) {
      this._container.addEventListener("submit", (e) => {
         e.preventDefault();
         handler();
      });
   }

   /**
    * Return searched query
    * @returns Query from search input
    */
   getQuery() {
      const query = this._inputField.value;
      this._clearInputField();
      return query;
   }

   /**
    * Clear search input field
    */
   _clearInputField() {
      this._inputField.value = "";
   }
}

export default new SearchView();
