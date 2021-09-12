"use strict";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import ingListView from "./views/ingListView.js";
import addRecipeView from "./views/addRecipeView.js";
import alertView from "./views/alertView.js";

import { MODAL_CLOSE_SEC } from "./config.js";

//////////////////////////////////////////////////////////////////////
//^ RECIPE CONTROLLER
const controlRecipe = async () => {
   try {
      // get id from url
      const id = window.location.hash.slice(1);
      if (!id) return;

      // render spinner
      recipeView.renderSpinner();

      // update results view
      resultsView.update(model.loadPageSearchResults());

      // update bookmarks view
      bookmarksView.update(model.state.bookmarks);
      bookmarksView.updateNotification(model.state.bookmarks.length);

      // update list view
      ingListView.update(model.state.list);

      // load recipe from api
      await model.loadRecipe(id);

      // render recipe
      recipeView.render(model.state.recipe);

      // update max-height
      ingListView.resize();
      bookmarksView.resize();
   } catch (err) {
      recipeView.renderError();
   }
};

const controlServings = (servings) => {
   model.updateServings(servings);

   // update recipie view
   recipeView.update(model.state.recipe);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ SEARCH CONTROLLER
const controlSearchResults = async () => {
   try {
      // render spinner
      resultsView.renderSpinner();

      // get query
      const query = searchView.getQuery();
      if (!query) return;

      // search recipies from api
      await model.loadSearchResults(query);

      // render page results
      resultsView.render(model.loadPageSearchResults());

      // render pagination
      paginationView.render(model.state.search);
   } catch (err) {
      resultsView.renderError();
   }
};

const controlPagination = (page) => {
   // render new results
   resultsView.render(model.loadPageSearchResults(page));

   // render new pagination btns
   paginationView.render(model.state.search);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ BOOKMARKS CONTROLLER
const controlBookmark = () => {
   if (!model.state.recipe.bookmarked) {
      model.addBookmark(model.state.recipe);
      alertView.render("bookmarkAdded");
   } else {
      model.removeBookmark(model.state.recipe.id);
      alertView.render("bookmarkRemoved");
   }

   // update recipe view
   recipeView.update(model.state.recipe);

   // render bookmarks
   bookmarksView.render(model.state.bookmarks);
   bookmarksView.updateNotification(model.state.bookmarks.length);
};

const controlBookmarks = () => {
   bookmarksView.render(model.state.bookmarks);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ ING LIST CONTROLLER
const controlAddIngsToList = () => {
   model.addIngsTolist();
   ingListView.render(model.state.list);
   alertView.render("ingAdded");
};

const controlRemoveIngFromList = (i) => {
   model.removeIngFromList(i);
   ingListView.render(model.state.list);
   alertView.render("ingRemoved");
};

const controlList = () => {
   ingListView.render(model.state.list);
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ ADD RECIPE CONTROLLER
const controlAddIng = () => {
   model.state.addRecipe.numIngredients++;
   addRecipeView.appendIngMarkup(model.state.addRecipe.numIngredients);
};

const controlRemoveIng = () => {
   model.state.addRecipe.numIngredients--;
   addRecipeView.updateIng();
};

const controlAddRecipe = async (newRecipe) => {
   try {
      // render spinner
      addRecipeView.renderSpinner();

      // upload recipe
      await model.uploadRecipe(newRecipe);

      // render recipe
      recipeView.render(model.state.recipe);

      // show succes message
      // render bookmark view
      bookmarksView.render(model.state.bookmarks);

      // change id in url
      window.history.pushState(null, "", `#${model.state.recipe.id}`);

      // close modal
      setTimeout(() => {
         addRecipeView.toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);

      // show alert
      alertView.render("uploaded");

      // resize bookmarks and ingredients max-height
      bookmarksView.resize();
      ingListView.resize();
   } catch (err) {
      addRecipeView.renderError(err.message);
   }
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
(function () {
   bookmarksView.addHandlerRender(controlBookmarks);

   ingListView.addHandlerRender(controlList);
   ingListView.addHandlerRemoveIng(controlRemoveIngFromList);

   recipeView.addHandlerRender(controlRecipe);
   recipeView.addHandlerServings(controlServings);
   recipeView.addHandlerBookmarks(controlBookmark);
   recipeView.addHandlerIngList(controlAddIngsToList);

   searchView.addHandlerSearch(controlSearchResults);

   paginationView.addHandlerClick(controlPagination);

   addRecipeView.addHandlerUpload(controlAddRecipe);
   addRecipeView.addHandlerAddIng(controlAddIng);
   addRecipeView.addHandlerRemoveIng(controlRemoveIng);
})();
