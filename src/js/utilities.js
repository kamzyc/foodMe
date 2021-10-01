"use strict";

/**
 * Format string into camelCase notation
 * @param {string} name Name to be formatted
 * @returns {string} Name in camelCase
 */
const formatName = (name) => {
   return name
      .split("_")
      .map((word, i) =>
         i === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join("");
};

/**
 * Create Object with recipe data in camelCase notation
 * @param {Object} recipe Recipe Object
 * @returns {Object} Formatted object
 */
export const createRecipeObject = (recipe) => {
   const formattedRecipe = {};

   Object.entries(recipe).forEach((property) => {
      formattedRecipe[`${formatName(property[0])}`] = property[1];
   });

   return formattedRecipe;
};

/**
 * Set async timeout function, which reject after set seconds
 * @param {number} s Number of seconds
 * @returns {Promise} Rejected Promise with throwed error
 */
export const timeout = function (s) {
   return new Promise(function (_, reject) {
      setTimeout(function () {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
};

/**
 * Apply max-height property on element, equal to height of current recipe container
 * @param {DOM element} element
 */
export const setMaxHeight = (element) => {
   let value = window
      .getComputedStyle(document.querySelector(".recipe"))
      .getPropertyValue("height")
      .slice(0, -2);

   element.style.maxHeight = `${
      value > 1000 ? value - 100 + "px" : value + "px"
   }`;
};

/**
 * Check if passed Object is empty
 * @param {Object} object Object which will be checked if is empty
 * @returns {boolean} Return true if passed Object is empty, false if it is not empty
 */
export const isEmptyObject = (object) => {
   return (
      object &&
      Object.keys(object).length === 0 &&
      object.constructor === Object
   );
};
