import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import Cats from "./components/cats.jsx";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import CatForm from "./components/catForm";


import './App.css';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <div className="img-background">
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <main className="container mt-5">
            <Switch>
              <Route exact path="/" component={Cats} />
              <Route exact path="/cats" component={Cats} />
              <Route path="/cat/new" component={CatForm} />
              <Route path="/cat/:id" component={CatForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </BrowserRouter>
        </div>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
