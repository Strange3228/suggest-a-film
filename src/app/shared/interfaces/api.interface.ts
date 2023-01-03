export enum ListIds {
  watched = 8234322,
  suggested = 8234297
}

export interface itemFromDbInterface {
  id: number,
  name?: string,
  title?: string,
  vote_average: string,
  poster_path: string,
  backdrop_path: string,
  tagline?: string,
  overview: string,
  release_date?: string,
  runtime?: string,
  genres?: genres[],
  status?: string,
  first_air_date?: string,
  last_air_date?: string,
  number_of_seasons?: string,
  number_of_episodes?: string,
  episode_run_time: string[],
}
interface genres {
  name: string
}
export interface dbResponse {
  page: number,
  total_pages: number,
  total_results: number,
  results: itemFromDbInterface[]
}
