import { Routes, Route } from "react-router-dom";
import { HeaderSearch } from "./Header";
import Home from "./Home";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <HeaderSearch setSearchResults={setSearchResults} />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home searchResults={searchResults} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
