import React from "react";
import { Form, Table } from "react-bootstrap";

function MovieList(props) {
  return (
    <>
      <h1>
        <i className="bi bi-funnel-fill"></i> {props.selectedFilter}
      </h1>
      <Table striped>
        <thead>
          <tr>
            {/* <th>#</th>
            <th>title</th>
            <th>favorite</th>
            <th>watchDate</th>
            <th>rating</th> */}
          </tr>
        </thead>
        <tbody>
          {props.movies.map((movie, index) => (
            <tr key={movie.id}>
              {/* <rd>{index}</rd> */}
              <td>{movie.title}</td>
              <td>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Favorite"
                    defaultChecked={movie.favorite}
                  />
                </Form>
              </td>
              <td>{movie.watchDate ? movie.watchDate : "not watched"}</td>
              <td>{movie.rating ? movie.rating : "not rated"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MovieList;
