import {gql} from 'apollo-boost';
import {branch, compose, withHandlers, withProps} from 'recompose';
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

const DELETE_FILE_QUERY = gql`
  mutation deleteFoodAttachment($id: ID!) {
    deleteFoodAttachment(id: $id)
  }
`;

export default compose(
  withRouter,
  withProps(({foodId, match}) => ({foodId: foodId || match.params.id})),
  graphql(ATTACHMENT_QUERY, {name: 'attachmentQuery'}),
  graphql(ATTACH_UPLOAD_QUERY, {name: 'createFoodAttachmentQuery'}),
  graphql(DELETE_FILE_QUERY, {name: 'deleteFileQuery'}),
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
    handleDelete: ({deleteFileQuery, attachmentQuery}) => (fileId) => async (e) => {
      await deleteFileQuery({
        variables: {
          id: fileId,
        },
      });
      attachmentQuery.refetch();
    },
  }),
);
