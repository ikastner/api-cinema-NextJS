const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const fetchTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    language: 'fr-FR',
    ...params,
  });

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
};

export async function getPopularMovies(page = 1): Promise<MovieResponse> {
  return fetchTMDB('/movie/popular', { page: page.toString() });
}

export async function getUpcomingMovies(page = 1): Promise<MovieResponse> {
  return fetchTMDB('/movie/upcoming', { page: page.toString() });
}

export async function searchMovies(query: string, page = 1): Promise<MovieResponse> {
  return fetchTMDB('/search/movie', {
    query: query,
    page: page.toString(),
  });
}

export async function getMovieDetails(id: number) {
  return fetchTMDB(`/movie/${id}`);
}