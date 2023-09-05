import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function List() {
  const { category } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(1);
  const [searchCount, setSearchCount] = useState(0);

  const dbData = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: "f89a6c1f22aca3858a4ae7aef10de967" },
  });

  useEffect(() => {
    let endpoint = `/movie/popular?page=1`;
    if (category === "tv") {
      endpoint = `/tv/popular?page=1`;
    }
    dbData.get(endpoint).then((res) => {
      const initialData = res.data.results;
      setMovieData(initialData);
    });
  }, [category]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }

    setSearchCount(searchCount + 1);
    dbData.get(`/search/${category}?query=${searchQuery}`).then((res) => {
      const searchData = res.data.results;
      setMovieData(searchData);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const more = () => {
    const newCount = clickCount + 1;
    dbData.get(`/${category}/popular?page=${newCount}`).then((res) => {
      const moreData = res.data.results;
      setMovieData((prevData) => [...prevData, ...moreData]);
      setClickCount(newCount);
    });
  };

  return (
    <>
      <section>
        <h1 style={{ marginTop: "100px" }}>{`${category.toUpperCase()}`}</h1>
        <div className="search_wrap">
          <div className="movie_search">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>search</button>
          </div>
        </div>
        <div className="list_container">
          {movieData.map((item) => (
            <a key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} />
              <h2>{item.title || item.name}</h2>
            </a>
          ))}
        </div>
      </section>
      <div className="load">
        <button className="more" onClick={more}>
          더보기
        </button>
      </div>
    </>
  );
}

export default List;
