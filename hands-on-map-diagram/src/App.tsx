import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Example#1 Map Diagram interaction</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} index />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
