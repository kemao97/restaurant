import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import React from 'react';
import {secure, unSecure} from './components/Auth';
import {Main as MainLayout} from './layouts';
import {Home as HomeView, Login as LoginView, UserCreate as UserCreateView, UserList as UserListView,} from './views';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={unSecure(LoginView)} />
      <RouteWithLayout path='/' exact component={secure(HomeView)} layout={MainLayout} />
      <RouteWithLayout path='/users' exact component={secure(UserListView)} layout={MainLayout} />
      <RouteWithLayout path='/user' exact component={secure(UserCreateView)} layout={MainLayout} />
      <Route path='*' exact component={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
