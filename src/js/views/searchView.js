"use strict";

class SearchView {
   _container = document.querySelector(".search");
   _inputField = document.querySelector(".search__field");

   addHandlerSearch(handler) {
      this._container.addEventListener("submit", (e) => {
         e.preventDefault();
         handler();
      });
   }

   getQuery() {
      const query = this._inputField.value;
      this._clearInputField();
      return query;
   }

   _clearInputField() {
      this._inputField.value = "";
   }
}

export default new SearchView();
