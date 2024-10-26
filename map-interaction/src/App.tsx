import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Ex1 from "./pages/Ex1";
import Ex2 from "./pages/Ex2";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ex1">Example#1 (google-map-react)</Link>
            </li>
            <li>
              <Link to="/ex2">Example#2 (React Leaflet)</Link>
            </li>
            <li>
              <Link to="/ex3">Example#3</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ex1" element={<Ex1 />} index />
          <Route path="/ex2" element={<Ex2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
