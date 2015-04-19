import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import Application from './Application';
import About from './About';
import Home from './Home';
import Page from './Page';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import AdminIndex from './Admin';
import Users from './Admin/Users';
import NotFound from './NotFound';

export default (
  <Route name="app" path="/" handler={Application}>
    <Route name="about" static="true" handler={About}/>
    <Route name="page" path="/page/:id" handler={Page}/>
    <Route name="dashboard" path="/dashboard" handler={Dashboard}/>
    <Route name="signin" path="/signin" handler={SignIn}/>
    <Route name="admin" path="/admin/">
      <Route name="users" path="/admin/users/" handler={Users} />
      <DefaultRoute name="adminDashboard" handler={AdminIndex}/>
    </Route>

    <DefaultRoute name="home" handler={Home}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);
