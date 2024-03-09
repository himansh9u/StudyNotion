import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const store = configureStore({
    reducer:rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store = {store}>
            <BrowserRouter>
                <App />
                <Toaster/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
