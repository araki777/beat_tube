import { Routes, Route } from "react-router-dom";
import { HeaderSearch } from "./Header";
import Home from "./Home";
import { useState, useEffect } from "react"; // useEffectを追加
import { fetchDefaultSearchList } from "./Api";
import useSWR from "swr";
import MovieShow from "./MovieShow";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const { data, error } = useSWR("/", fetchDefaultSearchList);

  useEffect(() => {
    if (data) {
      console.log(data);
      setSearchResults(data);
    }
  }, [data]);

  return (
    <>
      <HeaderSearch setSearchResults={setSearchResults} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/movie/show/:id" element={<MovieShow />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
