import {
  getMovieByCat,
  getMovieByNational,
  getMovieBySearch,
  getMovieBySlugAndPage,
} from "@/_libs/service";
import removeAccents from "@/_utils/removeAccents";

export async function FetchMovieAll(
  type: string,
  name: string,
  page: string = "1"
) {
  const nameFormat = removeAccents(name);
  const dataList =
    type.toLowerCase() === "national"
      ? await getMovieByNational(nameFormat, page)
      : type.toLowerCase() === "movie-genre"
      ? await getMovieBySlugAndPage(nameFormat, page)
      : type.toLowerCase() === "category"
      ? await getMovieByCat(nameFormat, page)
      : await getMovieBySearch(nameFormat, page);
  return dataList;
}
