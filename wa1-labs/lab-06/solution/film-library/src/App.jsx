import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import dayjs from "dayjs";

function App() {
  // Data Structure: id, title, favorite, watchDate, rating
  const movies = [
    {
      id: 1,
      title: "Pulp Fiction",
      favorite: true,
      watchDate: "2024-04-10",
      rating: 5,
    },
    {
      id: 2,
      title: "21 Grams",
      favorite: true,
      watchDate: "2024-04-17",
      rating: 4,
    },
    {
      id: 3,
      title: "Star Wars",
      favorite: false,
      watchDate: null,
      rating: null,
    },
    { id: 4, title: "Matrix", favorite: true, watchDate: null, rating: null },
    {
      id: 5,
      title: "Shrek",
      favorite: false,
      watchDate: "2024-04-21",
      rating: null,
    },
  ];
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedFilter, setSelectedFilter] = useState("All");
  // const filterList = useState([
  //   { name: "All", count: 0 },
  //   { name: "Favorite", count: 0 },
  //   { name: "Best Rated", count: 0 },
  //   { name: "Seen Last Month", count: 0 },
  //   { name: "Unseen", count: 0 },
  // ]);
  const filterList = [
    "All",
    "Favorite",
    "Best Rated",
    "Seen Last Month",
    "Unseen",
  ];
  const [filmsCount, setFilmsCount] = useState(0);

  const handleFilterMovies = (filterName) => {
    setSelectedFilter(filterName);
    setFilteredMovies(movies);

    switch (filterName) {
      case "All":
        setFilteredMovies(movies);
        // setfilterList((prevFilteres) =>  filterList.find("All").map(filter => filter.count = filteredMovies.length));
        setSelectedFilter("All");
        break;
      case "Favorite":
        setFilteredMovies(movies.filter((movie) => movie.favorite));
        // setfilterList((prevFilteres) =>  filterList.find("Favorite").map(filter => filter.count = filteredMovies.length));
        setSelectedFilter("Favorite");
        break;
      case "Best Rated":
        setFilteredMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.rating === 5)
        );
        // setfilterList((prevFilteres) =>  filterList.find("Best Rated").map(filter => filter.count = filteredMovies.length));
        setSelectedFilter("Best Rated");
        break;
      case "Seen Last Month":
        const diff = (movie) => {
          return dayjs().diff(dayjs(movie.watchDate), "month", true);
        };

        setFilteredMovies((prevMovies) =>
          prevMovies.filter((movie) => {
            if (!movie.watchDate) {
              return false;
            }
            return diff(movie) >= 0 && diff(movie) < 1;
          })
        );
        // setfilterList((prevFilteres) =>  filterList.find("Seen Last Month").map(filter => filter.count = filteredMovies.length));
        setSelectedFilter("Seen Last Month");
        break;
      case "Unseen":
        setFilteredMovies((prevMovies) =>
          prevMovies.filter((movie) => !movie.watchDate)
        );
        // setfilterList((prevFilteres) =>  filterList.find("Unseen").map(filter => filter.count = filteredMovies.length));
        setSelectedFilter("Unseen");
        break;

      default:
        throw new Error("Invalid filter name selected.");
        break;
    }
  };

  return (
    <Container fluid className="justify-content-md-center">
      <Row>
        <Navbar />
      </Row>
      {/* Body */}
      <Row className="my-5">
        <Col md={4}>
          <Sidebar
            filterList={filterList}
            filmsCount={filmsCount}
            selectedFilter={selectedFilter}
            onHandleFilterMovies={handleFilterMovies}
          />
        </Col>
        <Col md={8}>
          <MovieList movies={filteredMovies} selectedFilter={selectedFilter} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
