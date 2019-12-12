import React from "react";
import { Form, Button } from "rsuite";
import { Formik } from "formik";
import Field from "../../../components/fields/Field";
import AuthorField from "../../../components/fields/AuthorField";
import GenreField from "../../../components/fields/GenreField";

const BookForm = props => {
  const { onClose, onFormSubmit, book } = props;

  console.log(book);
  let initialValues;
  if (book) {
    initialValues = {
      name: book.name || "",
      genre: book.genre || "",
      authorId: (book.author && book.author.id) || ""
    };
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues || { name: "", genre: "", authorId: "" }}
      onSubmit={onFormSubmit}
      render={({ handleSubmit }) => (
        <Form fluid onSubmit={handleSubmit}>
          <Field name="name" label="Name" type="text" isRequired />

          <GenreField name="genre" />

          <AuthorField name="authorId" />
          <div className="d-flex justify-content-end">
            <Button onClick={onClose} appearance="subtle" className="mr-2">
              Cancel
            </Button>
            <Button color="cyan" type="submit">
              {book ? <>Update</> : <>Create</>}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default BookForm;
