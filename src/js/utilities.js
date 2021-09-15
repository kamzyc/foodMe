"use strict";

/**
 * Format string into camelCase
 * @param {string} name
 * @returns {string} name in camelCase
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
 * Create {} with recipe data in camelCase notation
 * @param {object} recipe
 * @returns {object} - formatted object
 */
export const createRecipeObject = (recipe) => {
   const formattedRecipe = {};

   Object.entries(recipe).forEach((property) => {
      formattedRecipe[`${formatName(property[0])}`] = property[1];
   });

   return formattedRecipe;
};

export const timeout = function (s) {
   return new Promise(function (_, reject) {
      setTimeout(function () {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
};

/**
 * Apply max-height property on element, equal to height of .recipe container
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
