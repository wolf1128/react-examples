import { Col, Row } from "react-bootstrap";

import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect } from "react";
import dayjs from "dayjs";

function FilmList(props) {
  const { films } = props;

  return (
    <ListGroup id="films-list" variant="flush">
      {films?.map((film) => (
        <FilmInList
          filmData={film}
          key={film.id}
          onSelectedFilm={props.onSelectedFilm}
          onSetMode={props.onSetMode}
          onEditFilm={props.onEditFilm}
        />
      ))}
    </ListGroup>
  );
}

FilmList.propTypes = {
  films: PropTypes.array.isRequired,
};

function FilmInList({ filmData, onSelectedFilm, onSetMode }) {
  const handleEditButton = () => {
    onSelectedFilm(filmData);
    onSetMode("edit");
  };

  return (
    <ListGroupItem>
      <Row className="gy-2">
        <Col
          xs={6}
          xl={3}
          className="favorite-title d-flex gap-2 align-items-center"
        >
          {filmData.title}
          <div className="d-xl-none actions">
            <i className="bi bi-pencil"></i>
            <i className="bi bi-trash"></i>
          </div>
        </Col>
        <Col xs={6} xl={3} className="text-end text-xl-center">
          <span className="custom-control custom-checkbox">
            <span className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={filmData.favorite}
                readOnly
              />
              <label className="custom-control-label">Favorite</label>
            </span>
          </span>
        </Col>

        <Col xs={4} xl={3} className="text-xl-center">
          {/* {dayjs(filmData.watchDate).format("YYYY-MM-DD")} */}
          {filmData?.watchDate
            ? dayjs(filmData.watchDate).format("YYYY-MM-DD")
            : "NOT WATCHED!"}
        </Col>
        <Col xs={8} xl={3} className="actions-container text-end">
          <div className="rating">
            <Rating rating={filmData.rating} maxStars={5} />
          </div>
          <div className="d-none d-xl-flex actions">
            <i className="bi bi-pencil" onClick={handleEditButton}></i>
            <i className="bi bi-trash"></i>
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

FilmInList.propTypes = {
  filmData: PropTypes.object.isRequired,
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

export default FilmList;
