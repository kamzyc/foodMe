"use stict";

import { API_URL, API_KEY, REC_PER_SIDE, TIMEOUT_SEC } from "./config";
import { createRecipeObject, timeout, isEmptyObject } from "./utilities";

export const state = {
   recipe: {},
   search: {
      query: "",
      results: [],
      page: 1,
      recipiesPerSide: REC_PER_SIDE,
   },
   bookmarks: [],
   addRecipe: {
      numIngredients: 1,
   },
   list: [],
   calendar: [
      { name: "monday", recipe: {} },
      { name: "tuesday", recipe: {} },
      { name: "wednseday", recipe: {} },
      { name: "thursday", recipe: {} },
      { name: "friday", recipe: {} },
      { name: "saturday", recipe: {} },
      { name: "sunday", recipe: {} },
   ],
};

//////////////////////////////////////////////////////////////////////
//^ LOAD DATA
/**
 * Fetch recipe data from API and set it in state
 * @param {string} id ID of recipe
 */
export const loadRecipe = async (id) => {
   try {
      const res = await Promise.race([
         fetch(API_URL + id),
         timeout(TIMEOUT_SEC),
      ]);

      if (!res.ok)
         throw new Error(`💥💥💥 ${res.status} - ${data.message} 💥💥💥`);

      const { data } = await res.json();
      const { recipe } = data;

      state.recipe = createRecipeObject(recipe);

      // update bookmarked property
      if (state.bookmarks.some((bookmark) => bookmark.id === id))
         state.recipe.bookmarked = true;
      else state.recipe.bookmarked = false;

      //update inCalendar property
      if (state.calendar.some((day) => day.recipe.id === id))
         state.recipe.inCalendar = true;
      else state.recipe.inCalendar = false;
   } catch (err) {
      throw err;
   }
};

/**
 * Fetch search recipes data from API and set it in state
 * @param {string} query Query used in search call
 */
export const loadSearchResults = async (query) => {
   try {
      state.search.query = query;

      const res = await Promise.race([
         fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes?search=${state.search.query}&key=${API_KEY}`
         ),
         timeout(TIMEOUT_SEC),
      ]);

      if (!res.ok)
         throw new Error(`💥💥💥 ${res.status} - ${data.message} 💥💥💥`);

      const { data } = await res.json();
      const { recipes } = data;
      state.search.results = recipes.map(createRecipeObject);
      state.search.page = 1;
   } catch (err) {
      throw err;
   }
};

/**
 * Return part of search results on given page
 * @param {number} page Number of page with recipes to be returned
 * @returns {Object[]} Array of recipes on given page
 */
export const loadPageSearchResults = (page = state.search.page) => {
   state.search.page = page;

   const start = (page - 1) * state.search.recipiesPerSide;
   const end = page * state.search.recipiesPerSide;

   return state.search.results.slice(start, end);
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ RECIPIE
/**
 * Update ingredients count in recipe
 * @param {number} updatedServings Number of servings
 */
export const updateServings = (updatedServings) => {
   state.recipe.ingredients.forEach((ingredient) => {
      ingredient.quantity =
         (ingredient.quantity * updatedServings) / state.recipe.servings;
   });

   state.recipe.servings = updatedServings;
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ BOOKMARKS
/**
 * Store bookmars in Local Storage
 */
const storeBookmarks = () => {
   localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

/**
 * Add recipe into bookmarks
 * @param {Object} recipe Recipe which will be added to bookmarks in state
 */
export const addBookmark = (recipe) => {
   // add recipe to bookmarks []
   state.bookmarks.push(recipe);

   // set bookmarked property as true
   state.recipe.bookmarked = true;

   storeBookmarks();
};

/**
 * Remove recipe from bookmarks
 * @param {number} id ID of recipe which will be removed from bookmarks in state
 */
export const removeBookmark = (id) => {
   // find index in bookmarks []
   const index = state.bookmarks.findIndex((recipe) => recipe.id === id);
   state.bookmarks.splice(index, 1);

   // set bookmarked property as false
   state.recipe.bookmarked = false;

   storeBookmarks();
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ ING LIST
/**
 * Store ingredient list in Local Storage
 */
const storeIngList = () => {
   localStorage.setItem("list", JSON.stringify(state.list));
};

/**
 * Add ingredients from current recipe into ingredient list
 */
export const addIngsToList = () => {
   let copy = {};
   let onList = false;

   state.recipe.ingredients.forEach((ing) => {
      copy = Object.assign({}, ing);

      if (state.list.length === 0) {
         state.list.push(copy);
      } else {
         onList = false;
         state.list.forEach((ingOnList) => {
            if (
               ing.unit === ingOnList.unit &&
               ing.description === ingOnList.description
            ) {
               ingOnList.quantity += copy.quantity;
               onList = true;
            }
         });

         !onList && state.list.push(copy);
      }
   });

   storeIngList();
};

/**
 * Remove ingredient from ingredients list
 * @param {number} i Number of ingredient to be removed from list in state
 */
export const removeIngFromList = (i) => {
   state.list.splice(i, 1);
   storeIngList();
};

/**
 * Remove all ingredients from ingredients list
 */
export const removeAllIngsFromList = () => {
   state.list = [];
   storeIngList();
};

/**
 * Clipboard all ingredients from ingredients list
 */
export const clipboardIngList = async () => {
   try {
      let text = "";
      state.list.forEach(({ quantity, unit, description }) => {
         text += `${quantity ? quantity : ""} ${
            unit ? unit : ""
         } ${description}\n`;
      });

      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      await navigator.clipboard.write(data);
   } catch (err) {
      throw err;
   }
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ CALENDAR DATA
/**
 * Update given day in calendar
 * @param {number} day Number of day to be updated in state
 */
export const updateCalendar = (day) => {
   if (isEmptyObject(state.calendar[day].recipe)) {
      if (!isEmptyObject(state.recipe)) {
         state.recipe.inCalendar = true;
         state.calendar[day].recipe = state.recipe;
      }
   } else {
      state.calendar[day].recipe.inCalendar = false;
      state.calendar[day].recipe = {};
   }

   storeCalendar();
};

/**
 * Store calendar in Local Storage
 */
const storeCalendar = () => {
   localStorage.setItem("calendar", JSON.stringify(state.calendar));
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//^ UPLOAD DATA
/**
 * Upload new recipe into API
 * @param {Object} newRecipe Recipe Object fetched to API
 */
export const uploadRecipe = async (newRecipe) => {
   try {
      const ingredients = [];
      const ingArr = Object.entries(newRecipe)
         .filter((entry) => entry[0].includes("-"))
         .map((value) => value[1]);

      for (let i = 0; i + 2 < ingArr.length; i += 3) {
         ingredients.push({
            quantity: ingArr[i] ? +ingArr[i] : null,
            unit: ingArr[i + 1] ? ingArr[i + 1] : null,
            description: ingArr[i + 2],
         });
      }

      const recipeObject = {
         title: newRecipe.title,
         source_url: newRecipe.sourceUrl,
         image_url: newRecipe.image,
         publisher: newRecipe.publisher,
         cooking_time: +newRecipe.cookingTime,
         servings: +newRecipe.servings,
         ingredients,
      };

      const res = await Promise.race([
         fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeObject),
         }),
         timeout(TIMEOUT_SEC),
      ]);

      const data = await res.json();
      const { recipe } = data.data;

      if (!res.ok)
         throw new Error(`💥💥💥 ${res.status} - ${data.message} 💥💥💥`);

      state.recipe = createRecipeObject(recipe);
      addBookmark(state.recipe);
   } catch (err) {
      throw err;
   }
};

(function () {
   let storage;
   ["bookmarks", "list", "calendar"].forEach((property) => {
      storage = localStorage.getItem(property);
      if (storage) state[property] = JSON.parse(storage);
   });
})();
