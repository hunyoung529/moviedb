import React, { useEffect, useState } from "react";
import { db } from "./Instance";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async function () {
      const fetchedData = await db.db_All();
      setData(fetchedData);
    })();
  }, []);

  return (
    <>
      <div className="visual">
        {data["Popular Movies"] && (
          <Swiper slidesPerView={1}>
            {data["Popular Movies"].data.results.map((movie, index) => (
              <SwiperSlide key={index}>
                <div
                  className="visual_wrap"
                  style={{
                    backgroundImage: `url(${db.img_origin}${movie.poster_path})`,
                  }}
                >
                  <div className="content_wrap">
                    <div className="text">
                      <h2 className="title">{movie.title}</h2>
                      <p className="overview">
                        {" "}
                        {movie.overview ||
                          "No overview available for this movie."}
                      </p>
                      <div className="btns">
                        <button>Watch now</button>
                        <button>Watchtrailer</button>
                      </div>
                    </div>
                    <div className="poster">
                      <img src={`${db.img_poster}${movie.poster_path}`} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="container">
        {/* Popular Movies Section */}
        {data["Popular Movies"] && (
          <div className="test">
            <div className="section_header">
              <h2>Popular Movies</h2>
              <Link className="view_more" to="/movie">View More</Link>
            </div>

            <Swiper slidesPerView={"auto"} spaceBetween={20}>
              {data["Popular Movies"].data.results.map((movie, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${db.img_poster}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {data["Top Rated Movies"] && (
          <div className="test">
            <div className="section_header">
              <h2>Top Rated Movies</h2>
            </div>
            <Swiper slidesPerView={"auto"} spaceBetween={20}>
              {data["Top Rated Movies"].data.results.map((movie, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${db.img_poster}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {data["Popular TV"] && (
          <div className="test">
            <div className="section_header">
              <h2>Popular TV</h2>
              <Link className="view_more" to="/tv">View More</Link>
            </div>
            <Swiper slidesPerView={"auto"} spaceBetween={20}>
              {data["Popular TV"].data.results.map((tv, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${db.img_poster}${tv.poster_path}`}
                    alt={tv.name}
                  />
                  <h3>{tv.name}</h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {data["Top Rated TV"] && (
          <div className="test">
            <div className="section_header">
              <h2>Top Rated TV</h2>
            </div>
            <Swiper slidesPerView={"auto"} spaceBetween={20}>
              {data["Top Rated TV"].data.results.map((tv, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${db.img_poster}${tv.poster_path}`}
                    alt={tv.name}
                  />
                  <h3>{tv.name}</h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
