// https://forkify-api.herokuapp.com/v2

export const API_KEY = "f4e4af83-b0b1-4e40-a5e5-84c78bf553ab";
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const REC_PER_SIDE = 8;
export const TIMEOUT_SEC = 10;
export const MODAL_CLOSE_SEC = 1;
export const ALERT_CLOSE_SEC = 1;

export const ALERT_STATUS = {
   ADD_BOOKMARK: {
      data: "bookmark added",
      color: "green",
   },

   REMOVE_BOOKMARK: {
      data: "bookmark removed",
      color: "red",
   },

   ADD_ING: {
      data: "ingredients added",
      color: "green",
   },

   REMOVE_ING: {
      data: "ingredient removed",
      color: "red",
   },
};
