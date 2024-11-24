import { Suspense } from 'react';
import { getUpcomingMovies } from '@/lib/tmdb';
import { MovieCard } from '@/components/movie-card';
import { LoadingMovies } from '@/components/loading-movies';
import { ErrorMessage } from '@/components/error-message';

async function UpcomingMovies() {
  try {
    const { results: movies = [] } = await getUpcomingMovies();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <ErrorMessage 
        title="Erreur de chargement" 
        message="Impossible de charger les prochaines sorties. Veuillez vérifier votre clé API TMDB."
      />
    );
  }
}

export default function UpcomingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Prochaines Sorties</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Les films à venir dans les prochaines semaines
        </p>
      </div>

      <Suspense fallback={<LoadingMovies />}>
        <UpcomingMovies />
      </Suspense>
    </div>
  );
}