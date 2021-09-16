export const API_KEY = "029c7aa3-d752-464a-8c27-d4aaba5e366d";
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const REC_PER_SIDE = 8;
export const TIMEOUT_SEC = 5;
export const MODAL_CLOSE_SEC = 1;
export const MODAL_ERROR_CLOSE_SEC = 3;
export const ALERT_CLOSE_SEC = 1;

export const ALERT_STATUS = {
   bookmark: {
      add: {
         data: "bookmark added",
         color: "green",
      },

      remove: {
         data: "bookmark removed",
         color: "red",
      },
   },

   ingList: {
      add: {
         data: "ingredients added",
         color: "green",
      },

      remove: {
         data: "ingredient removed",
         color: "red",
      },
   },

   upload: {
      ok: {
         data: "recipe uploaded",
         color: "green",
      },
      fail: {
         data: "upload failed",
         color: "red",
      },
   },

   clipboard: {
      ok: {
         data: "copied",
         color: "green",
      },
      fail: {
         data: "copy failed",
         color: "red",
      },
   },
};
