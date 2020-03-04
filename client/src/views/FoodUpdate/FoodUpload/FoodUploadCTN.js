import {gql} from 'apollo-boost';
import {branch, compose, lifecycle, withHandlers, withProps} from 'recompose';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

const ATTACHMENT_QUERY = gql`
  query foodAttachments($foodId: ID!) {
    food(id: $foodId) {
      foodAttachments {
        id
        path
      }
    }
  }
`;

const ATTACH_UPLOAD_QUERY = gql`
  mutation createFoodAttachment($foodId: ID!, $file: Upload!) {
    createFoodAttachment(foodId: $foodId, file: $file)
  }
`;

export default compose(
  withRouter,
  withProps(({foodId, match}) => ({foodId: foodId || match.params.id})),
  graphql(ATTACHMENT_QUERY, {name: 'attachmentQuery'}),
  graphql(ATTACH_UPLOAD_QUERY, {
    name: 'createFoodAttachmentQuery',
    options: {
      fetchPolicy: 'no-cache',
    },
  }),
  branch(
    ({attachmentQuery}) => attachmentQuery.food,
    withProps(({attachmentQuery}) => ({
      foodAttachments: attachmentQuery.food.foodAttachments,
      foodAttachmentRefetch: attachmentQuery.refetch,
    })),
  ),
  withHandlers({
    handleChange: ({createFoodAttachmentQuery, foodAttachmentRefetch, foodId}) => async (e) => {
      const file = e.target.validity.valid && e.target.files[0];
      await createFoodAttachmentQuery({variables: {foodId, file}});
      foodAttachmentRefetch();
    },
  }),
);
