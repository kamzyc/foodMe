"use strict";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import ingListView from "./views/ingListView.js";
import calendarView from "./views/calendarView.js";
import addRecipeView from "./views/addRecipeView.js";
import alertView from "./views/alertView.js";

import {
   MODAL_CLOSE_SEC,
   MODAL_ERROR_CLOSE_SEC,
   ALERT_STATUS,
} from "./config.js";

import { isEmptyObject } from "./utilities.js";

//////////////////////////////////////////////////////////////////////
//^ RECIPE CONTROLLER
/**
 * Controler - Load recipe from hash or render error
 * @returns {Promise} Fullfiled (recipe) or Rejected (error)
 */
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

      // update calendar view
      calendarView.update(model.state.calendar);

      // load recipe from api
      await model.loadRecipe(id);

      // render recipe
      recipeView.render(model.state.recipe);

      // update max-height
      ingListView.resize();
      bookmarksView.resize();
      calendarView.resize();
   } catch (err) {
      recipeView.renderError();
   }
};

/**
 * Controler - responsible for servings
 * @param {number} servings
 */
const controlServings = (servings) => {
   model.updateServings(servings);
   recipeView.update(model.state.recipe);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ SEARCH CONTROLLER
/**
 * Controler - load search results or render error
 * @returns {Promise} Fullfiled (search results) or Rejected (error)
 */
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

/**
 * Controler - load search results on given page
 * @param {number} page Number of page with search results to load
 */
const controlPagination = (page) => {
   // render new page results
   resultsView.render(model.loadPageSearchResults(page));

   // render new pagination btns
   paginationView.render(model.state.search);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ BOOKMARKS CONTROLLER
/**
 * Controler - resposible for add/remove bookmark
 */
const controlBookmark = () => {
   if (!model.state.recipe.bookmarked) {
      model.addBookmark(model.state.recipe);
      alertView.toggle(ALERT_STATUS.bookmark.add);
   } else {
      model.removeBookmark(model.state.recipe.id);
      alertView.toggle(ALERT_STATUS.bookmark.remove);
   }

   // update recipe view
   recipeView.update(model.state.recipe);

   // render bookmarks
   bookmarksView.render(model.state.bookmarks);
   bookmarksView.updateNotification(model.state.bookmarks.length);
};

/**
 * Controler - resposible for bookmarks
 */
const controlBookmarks = () => {
   bookmarksView.resize();
   bookmarksView.render(model.state.bookmarks);
   bookmarksView.updateNotification(model.state.bookmarks.length);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ ING LIST CONTROLLER
/**
 * Controler - add ingredients into ingredients list
 */
const controlAddIngsToList = () => {
   model.addIngsToList();
   ingListView.render(model.state.list);
   alertView.toggle(ALERT_STATUS.ingList.add);
};

/**
 * Controler - remove ingredient from ingredients list
 * @param {number} i Number of ingredient on list in state
 */
const controlRemoveIngFromList = (i) => {
   model.removeIngFromList(i);
   ingListView.update(model.state.list);
   alertView.toggle(ALERT_STATUS.ingList.remove);
};

/**
 * Controler - remove all ingredients from ingredients list
 */
const controlRemoveAllIngsFromList = () => {
   model.removeAllIngsFromList();
   ingListView.render(model.state.list);
   alertView.toggle(ALERT_STATUS.ingList.removeAll);
};

/**
 * Controler - resposible for ingredients list
 */
const controlList = () => {
   ingListView.resize();
   ingListView.render(model.state.list);
};

/**
 * Controler - responsible for clipboard
 */
const controlClipboard = async () => {
   try {
      await model.clipboardIngList();
      alertView.toggle(ALERT_STATUS.clipboard.ok);
   } catch (err) {
      alertView.toggle(ALERT_STATUS.clipboard.fail);
   }
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ CALENDAR CONTROLLER
/**
 * Controler - resposible for calendar
 */
const controlCalendar = () => {
   calendarView.resize();
   calendarView.render(model.state.calendar);
};

/**
 * Controler - update given day in calendar
 * @param {number} day Number of day to be updated in state
 */
const controlCalendarDay = (day) => {
   if (isEmptyObject(model.state.calendar[day].recipe)) {
      if (!isEmptyObject(model.state.recipe)) {
         alertView.toggle(ALERT_STATUS.calendar.add);
      }
   } else {
      alertView.toggle(ALERT_STATUS.calendar.remove);
   }
   model.updateCalendar(day);
   calendarView.render(model.state.calendar);
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ ADD RECIPE CONTROLLER
/**
 * Controler - add new ingredient field in add recipe window
 */
const controlAddIng = () => {
   model.state.addRecipe.numIngredients++;
   addRecipeView.appendIngMarkup(model.state.addRecipe.numIngredients);
};

/**
 * Controler - remove ingredient field in add recipe window
 */
const controlRemoveIng = () => {
   model.state.addRecipe.numIngredients--;
   addRecipeView.updateIng();
};

/**
 * Controler - set number of ingredients in add recipe window to default(1)
 */
const controlClearInputs = () => {
   model.state.addRecipe.numIngredients = 1;
};

/**
 * Controler - resposible for upload new recipe into API
 * @param {Object} newRecipe Recipe Object fetched to API
 */
const controlAddRecipe = async (newRecipe) => {
   try {
      // render spinner
      addRecipeView.renderSpinner();

      // upload recipe
      await model.uploadRecipe(newRecipe);

      // render recipe
      recipeView.render(model.state.recipe);

      // render bookmark view
      bookmarksView.render(model.state.bookmarks);

      // resize bookmarks and ingredients max-height
      bookmarksView.resize();
      ingListView.resize();

      // change id in url
      window.history.pushState(null, "", `#${model.state.recipe.id}`);

      // alert
      alertView.toggle(ALERT_STATUS.upload.ok);

      // close window
      setTimeout(() => {
         addRecipeView.toggleWindow();
         addRecipeView.renderForm();
      }, MODAL_CLOSE_SEC * 1000);
   } catch (err) {
      alertView.toggle(ALERT_STATUS.upload.fail);
      addRecipeView.renderError(err.message);

      setTimeout(() => {
         addRecipeView.toggleWindow();
         addRecipeView.renderForm();
      }, MODAL_ERROR_CLOSE_SEC * 1000);
   }
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
(function () {
   bookmarksView.addHandlerRender(controlBookmarks);
   calendarView.addHandlerRender(controlCalendar);

   ingListView.addHandlerRender(controlList);
   ingListView.addHandlerClipboard(controlClipboard);
   ingListView.addHandlerRemoveAll(controlRemoveAllIngsFromList);

   recipeView.addHandlerRender(controlRecipe);
   recipeView.addHandlerServings(controlServings);
   recipeView.addHandlerBookmarks(controlBookmark);
   recipeView.addHandlerIngList(controlAddIngsToList);

   searchView.addHandlerSearch(controlSearchResults);

   paginationView.addHandlerClick(controlPagination);

   ingListView.addHandlerRemoveIng(controlRemoveIngFromList);

   calendarView.addHandlerAddRecipe(controlCalendarDay);

   addRecipeView.addHandlerUpload(controlAddRecipe);
   addRecipeView.addHandlerAddIng(controlAddIng);
   addRecipeView.addHandlerRemoveIng(controlRemoveIng);
   addRecipeView.addHandlerClearInputs(controlClearInputs);
})();
