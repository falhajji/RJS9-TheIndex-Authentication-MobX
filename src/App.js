import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";

// Forms
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

// Store
import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/BookStore";
import authStore from "./stores/AuthStore";

function App() {
  const getView = () => {
    if (authorStore.loading || bookStore.loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route path="/authors/" component={AuthorsList} />
          <Route path="/books/:bookColor?" component={BookList} />
          {authStore.user ? (
            <>
              <Redirect from="/loginform" to="/" />
              <Redirect from="/signupform" to="/" />
            </>
          ) : (
            <>
              <Route path="/loginform" component={LoginForm} />
              <Route path="/signupform" component={SignupForm} />
            </>
          )}
        </Switch>
      );
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content col-10">{getView()}</div>
      </div>
    </div>
  );
}

export default withRouter(observer(App));
