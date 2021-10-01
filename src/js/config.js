import dotenv from "dotenv";

dotenv.config();
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;
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
      removeAll: {
         data: "all ingredeints removed",
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

   calendar: {
      add: {
         data: "day set",
         color: "green",
      },
      remove: {
         data: "day unset",
         color: "red",
      },
   },
};
