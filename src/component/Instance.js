import axios from "axios";

export const themoviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: "f89a6c1f22aca3858a4ae7aef10de967" },
});

export let db = {
  cStr1: ["movie", "tv"],
  cStr_2: ["upcoming", "popular", "top_rated"],
  img_origin: "https://image.tmdb.org/t/p/original/",
  img_poster: "https://image.tmdb.org/t/p/w500/",

  db_All: async function () {
    //전체

    let a = themoviedb.get(`/${this.cStr1[0]}/${this.cStr_2[1]}`),
      b = themoviedb.get(`/${this.cStr1[0]}/${this.cStr_2[2]}`),
      c = themoviedb.get(`/${this.cStr1[1]}/${this.cStr_2[1]}`),
      d = themoviedb.get(`/${this.cStr1[1]}/${this.cStr_2[2]}`);

    let result = await Promise.all([a, b, c, d]);

    return {
      "Popular Movies": result[0],
      "Top Rated Movies": result[1],
      "Popular TV": result[2],
      "Top Rated TV": result[3],
    };
  },
  db_Movie: async function (str, n = 1) {
    //영화
    return await themoviedb.get(str, { params: { page: n } });
  }

};
