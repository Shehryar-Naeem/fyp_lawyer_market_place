import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { lawyerApi } from "./api/lawyerApi";

export const server = process.env.REACT_APP_API_URL;
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [lawyerApi.reducerPath]: lawyerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, lawyerApi.middleware),
});
