import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import React from 'react';
import {secure, unSecure, auth} from './components/Auth';
import {Main as MainLayout} from './layouts';
import {
  Account as AccountView,
  Cart as CartView,
  Dashboard as DashboardView,
  FoodCreate as FoodCreateView,
  FoodList as FoodListView,
  FoodUpdate as FoodUpdateView,
  Home as HomeView,
  Login as LoginView,
  UserCreate as UserCreateView,
  UserList as UserListView,
} from './views';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomeView} />
      <Route path='/cart' exact component={CartView} />
      <Route path='/login' exact component={unSecure(LoginView)} />
      <RouteWithLayout path='/dashboard' exact component={secure(DashboardView)} layout={MainLayout} />
      <RouteWithLayout path='/users' exact component={secure((auth('user.read'))(UserListView))} layout={MainLayout} />
      <RouteWithLayout path='/user' exact component={secure((auth('user.create'))(UserCreateView))} layout={MainLayout} />
      <RouteWithLayout path="/account" component={secure(AccountView)} exact layout={MainLayout} />
      <RouteWithLayout path="/food" component={secure((auth('food.create'))(FoodCreateView))} exact layout={MainLayout} />
      <RouteWithLayout path="/food/:id" component={secure((auth('food.update'))(FoodUpdateView))} exact layout={MainLayout} />
      <RouteWithLayout path="/foods" component={secure(FoodListView)} exact layout={MainLayout} />
      <Route path='*' exact component={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
