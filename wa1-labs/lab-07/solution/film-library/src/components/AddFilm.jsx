import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import dayjs from "dayjs";

function AddFilm(props) {
  const [title, setTitle] = useState(
    (props.selectedFilm && props.selectedFilm.title) || ""
  );
  const [favorite, setFavorite] = useState(
    (props.selectedFilm && props.selectedFilm.favorite) || false
  );
  const [rating, setRating] = useState(
    (props.selectedFilm && props.selectedFilm.rating) || ""
  );
  const [watchDate, setWatchDate] = useState(
    props.selectedFilm && props.selectedFilm.watchDate
      ? dayjs(props.selectedFilm.watchDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD")
  );
  const [userId, setUserId] = useState(1);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isRatingInvalid, setIsRatingInvalid] = useState(false);
  const [isWatchDateInvalid, setIsWatchDateInvalid] = useState(false);

  const isFormValid = () => {
    if (title.trim().length === 0) {
      alert("Title must not be empty!");
      setIsTitleInvalid(true);
      return false;
    }
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      setIsRatingInvalid(true);
      return false;
    }
    if (dayjs(watchDate).diff(dayjs(), "hour") > 0) {
      alert("Watch date must not be in the future");
      setIsWatchDateInvalid(true);
      return false;
    }

    return true;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    switch (props.mode) {
      case "add":
        // TODO: must reset the form before adding the film
        if (isFormValid()) {
          props.onAddFilm({ title, favorite, rating, watchDate, userId });
          handleResetForm();
        }
        break;
      case "edit":
        if (isFormValid()) {
          props.onEditFilm(props.selectedFilm, {
            userId,
            title,
            favorite,
            rating,
            watchDate,
          });
          handleResetForm();
        }
        break;
      default:
        throw new Error("Invalid mode");
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setFavorite(false);
    setRating("");
    setWatchDate(dayjs().format("YYYY-MM-DD"));
    setUserId(1);

    props.onSetMode("default");
  };

  return (
    <Form className="b-2 m-5 p-5" onSubmit={(event) => handleSubmitForm(event)}>
      {/* <fieldset disabled> */}
      {/* <fieldset> */}
      <legend>{props.mode === "add" ? "Add Film" : "Edit Film"}</legend>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          className={`${isTitleInvalid ? "border border-danger" : ""}`}
          value={title}
          onChange={(event) => {
            setIsTitleInvalid(false);
            setTitle(event.target.value);
          }}
          required
        />
        {isTitleInvalid && (
          <Form.Text className="text-danger">title is invalid</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label>Favorite</Form.Label> */}
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Is Favorite?"
          onChange={(event) => setFavorite(event.target.checked)}
          value={favorite}
          checked={favorite}
        />
      </Form.Group>

      <Form.Select
        aria-label="Default select example"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        className={`${isRatingInvalid ? "border border-danger" : ""}`}
        required
      >
        <option defaultChecked>Select rating</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
      </Form.Select>
      {isRatingInvalid && (
        <Form.Text className="text-danger">rating is invalid</Form.Text>
      )}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="date"
          placeholder="Enter watch date"
          className={`${isWatchDateInvalid ? "border border-danger" : ""}`}
          value={watchDate}
          onChange={(event) => setWatchDate(event.target.value)}
          required
        />
        {isWatchDateInvalid && (
          <Form.Text className="text-danger">watch date is invalid</Form.Text>
        )}
      </Form.Group>

      <Button type="submit" className="mr-2">
        {props.mode === "add" ? "ADD" : "EDIT"}
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          props.onSetMode("default");
          console.log("cancel");
        }}
      >
        Cancel
      </Button>
      {/* </fieldset> */}
    </Form>
  );
}

export default AddFilm;
