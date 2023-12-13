import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../routes";
// pages
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import UserDashboard from "./user/Dashboard";
import PostPost from "./user/PostPost";
import EditPost from "./user/EditPost";
import AdminDashboard from "./admin/Dashboard";
import VidePost from "./admin/VidePost";

// extra pages 

import NotFoundPage from "./NotFound";
import ServerError from "./ServerError";

// components
import Preloader from "../components/Preloader";
import TopNavbar from '../components/TopNavbar';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebarClient = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);



  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        {/* <Sidebar /> */}

        <TopNavbar />
        <main className="content">
          {/* <Navbar /> */}
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};


const HomePage = () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    <RouteWithSidebarClient exact path={Routes.UserDashboard.path} component={UserDashboard} />
    <RouteWithSidebarClient exact path={Routes.AdminDashboard.path} component={AdminDashboard} />
    <RouteWithSidebarClient exact path={Routes.PostPost.path} component={PostPost} />
    <RouteWithSidebarClient exact path={Routes.EditPost.path} component={EditPost} />
    <RouteWithSidebarClient exact path={Routes.VidePost.path} component={VidePost} />

    <Redirect to={Routes.NotFound.path} />

  </Switch>
);
export default HomePage;