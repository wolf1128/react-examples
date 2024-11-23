import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

function Sidebar(props) {
  return (
    <ListGroup as="ul">
      {props.filterList.map((filterName, index) => (
        <ListGroup.Item
          key={index}
          as="li"
          className="d-flex justify-content-between align-items-start"
          active={props.selectedFilter === filterName}
          onClick={() => props.onHandleFilterMovies(filterName)}
        >
          <span>{filterName}</span>{" "}
          <Badge bg="primary">{props.filmsCount}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Sidebar;
