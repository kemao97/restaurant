import React from 'react';
import {Redirect} from 'react-router-dom';
import {branch, compose, renderComponent} from 'recompose';
import {connect} from 'react-redux';

const secure = (wrappedComponent) =>
  compose(
    connect(({viewer}) => ({viewer})),
    branch(
      ({viewer}) => !viewer.id,
      renderComponent(() => <Redirect to="/login" />),
    ),
  )(wrappedComponent);

const unSecure = (wrappedComponent) =>
  compose(
    connect(({viewer}) => ({viewer})),
    branch(
      ({viewer}) => viewer.id,
      renderComponent(() => <Redirect to="/" />),
    ),
  )(wrappedComponent);

export {secure, unSecure};
