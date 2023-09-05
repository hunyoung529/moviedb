import { useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import List from "./component/List";
import Detail from "./component/Detail";
import { db } from "./component/Instance";
import Context, { MyContext } from "./Context";
import "./App.css";

function App() {
  useEffect(() => {
    (async function () {
      const data = await db.db_All();
      // Do something with data
    })();
  }, []);

  return (
    <Context>
      <HashRouter>
        <header>
          <div className="header_wrap container">
            <h2>HFLIX</h2>
            <nav>
              <Link to="/">HOME</Link>
              <Link to="/movie">Movies</Link>
              <Link to="/tv">TV Series</Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<List />} />
        </Routes>
        <footer>
          <div className="footer_wrap">
            <h2>HFLIX</h2>
          </div>
        </footer>
      </HashRouter>
    </Context>
  );
}

export default App;
