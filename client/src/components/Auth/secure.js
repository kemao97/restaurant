import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {branch, compose, lifecycle, renderComponent} from 'recompose';
import {connect} from 'react-redux';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';

const authorizationQuery = gql`
  mutation isAccept($input: String!) {
    isAccept(input: $input)
  }
`;

export const secure = (wrappedComponent) =>
  compose(
    connect(({viewer}) => ({viewer})),
    branch(
      ({viewer}) => !viewer.id,
      renderComponent(() => <Redirect to="/login" />),
    ),
  )(wrappedComponent);

export const unSecure = (wrappedComponent) =>
  compose(
    connect(({viewer}) => ({viewer})),
    branch(
      ({viewer}) => viewer.id,
      renderComponent(() => <Redirect to="/" />),
    ),
  )(wrappedComponent);

export const auth = (path) => (wrappedComponent) =>
  compose(
    withRouter,
    graphql(authorizationQuery, {name: 'authQuery'}),
    lifecycle({
      async componentDidMount() {
        const {authQuery, history} = this.props;
        const result = await authQuery({
          variables: {
            input: path,
          },
        });
        if (!result.data.isAccept) {
          history.replace('/');
        }
      },
    }),
  )(wrappedComponent);
