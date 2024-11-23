import dayjs from "dayjs";

import { useContext, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, ListGroup, ListGroupItem } from "react-bootstrap/";

import FilmForm from "./FilmForm";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import filmContext from "../contexts/filmContext";

function FilmPage(props) {
  const navigate = useNavigate();
  // const { filterName } = useParams(); // get dynamic param from the route
  const location = useLocation();
  const filterName = location.state?.filterName || "filter-all";
  const film = useContext(filmContext);
  
  const filteredFilms = props.films
    ? props.films.filter(film.filters[filterName].filterFunction)
    : props.films;

  return (
    <>
      <ListGroup id="films-list" variant="flush">
        {filteredFilms.map((film) => (
          <FilmInList
            key={film.id}
            filmData={film}
            setEditableFilm={props.setEditableFilm}
            setShowForm={props.setShowForm}
          />
        ))}
      </ListGroup>

      <Button
        variant="primary"
        className="rounded-circle fixed-right-bottom"
        onClick={() => {
          props.setShowForm(true);
          props.setEditableFilm();
          navigate("/films/add");
        }}
      >
        <i className="bi bi-plus" />
      </Button>
    </>
  );
}

FilmPage.propTypes = {
  films: PropTypes.array.isRequired,
  addFilm: PropTypes.func.isRequired,
  editFilm: PropTypes.func.isRequired,
};

function FilmInList(props) {
  return (
    <ListGroupItem>
      <Row className="gy-2">
        <Col
          xs={6}
          xl={3}
          className="favorite-title d-flex gap-2 align-items-center"
        >
          {props.filmData.title}
          <div className="d-xl-none actions">
            <FilmIcons
              filmData={props.filmData}
              setShowForm={props.setShowForm}
              setEditableFilm={props.setEditableFilm}
            />
          </div>
        </Col>
        <Col xs={6} xl={3} className="text-end text-xl-center">
          <span className="custom-control custom-checkbox">
            <span className="custom-control custom-checkbox">
              {/* Disabling the checkbox to suppress a warning. It is necessary to implement also the onChange function to properly manage the checkbox. */}
              <input
                type="checkbox"
                className="custom-control-input"
                checked={props.filmData.favorite}
                disabled={true}
              />
              <label className="custom-control-label">Favorite</label>
            </span>
          </span>
        </Col>

        <Col xs={4} xl={3} className="text-xl-center">
          {props.filmData.watchDate
            ? dayjs(props.filmData.watchDate).format("MMMM D, YYYY")
            : ""}
        </Col>
        <Col xs={8} xl={3} className="actions-container text-end">
          <div className="rating">
            <Rating rating={props.filmData.rating} maxStars={5} />
          </div>
          <div className="d-none d-xl-flex actions">
            <FilmIcons
              filmData={props.filmData}
              setShowForm={props.setShowForm}
              setEditableFilm={props.setEditableFilm}
            />
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

FilmInList.propTypes = {
  filmData: PropTypes.object.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setEditableFilm: PropTypes.func.isRequired,
};

function FilmIcons(props) {
  const navigate = useNavigate();

  return (
    <>
      <i
        className="bi bi-pencil"
        onClick={() => {
          props.setShowForm(true);
          props.setEditableFilm(props.filmData);
          navigate(`/films/${props.filmData.id}`);
        }}
      />
      <i className="bi bi-trash" />
    </>
  );
}

FilmIcons.propTypes = {
  filmData: PropTypes.object.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setEditableFilm: PropTypes.func.isRequired,
};

function Rating({ maxStars, rating }) {
  return [...Array(maxStars)].map((el, index) => (
    <i
      key={index}
      className={index < rating ? "bi bi-star-fill" : "bi bi-star"}
    />
  ));
}

Rating.propTypes = {
  maxStars: PropTypes.number.isRequired,
};

export default FilmPage;
