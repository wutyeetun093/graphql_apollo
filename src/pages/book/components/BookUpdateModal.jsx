import React from "react";
import { Modal } from "rsuite";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";
import BookForm from "./BookForm";

const formName = "BookUpdateForm";

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: String!
    $name: String!
    $genre: GenreType!
    $authorId: ID!
  ) {
    updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        id
        name
      }
    }
  }
`;
const GET_BOOKS = gql`
  {
    books {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

const BookUpdateModal = props => {
  const [updateAuthor, { data }] = useMutation(UPDATE_BOOK);

  const { isShow, onClose, book } = props;
  console.log(book);
  const onFormSubmit = (values, actions) => {
    updateAuthor({
      variables: {
        id: book.id,
        ...values
      },
      refetchQueries: [{ query: GET_BOOKS }]
    });
    props.onClose();
  };
  return (
    <Modal show={isShow} onHide={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Book Upadate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BookForm onClose={onClose} onFormSubmit={onFormSubmit} {...props} />
      </Modal.Body>
    </Modal>
  );
};

export default connect(
  null,
  null
)(reduxForm({ form: formName, enableReinitialize: true })(BookUpdateModal));
