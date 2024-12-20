import PropTypes from "prop-types";
import { NavItem, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * This components requires:
 * - the list of filters labels to show,
 * - the filter that is currently selected
 * - the handler to notify a new selection
 */
function Filters(props) {
  const navigate = useNavigate();
  const { items, selected, onSelect } = props;

  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);

  return (
    <ul className="nav nav-pills flex-column gap-2 mb-auto">
      {filterArray.map(([filterName, { label }]) => {
        return (
          <NavItem key={filterName}>
            <NavLink
              onClick={() => {
                onSelect(filterName);
                navigate("/films", { state: { filterName } }); // WAY#1
                // navigate(`/films/${filterName}`); // WAY#2
              }}
              className={selected === filterName ? "" : "link-dark"}
              active={selected === filterName}
            >
              {label}
            </NavLink>
          </NavItem>
        );
      })}
    </ul>
  );
}

Filters.propTypes = {
  items: PropTypes.object,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Filters;
