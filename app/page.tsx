import { Suspense } from 'react';
import { getPopularMovies } from '@/lib/tmdb';
import { MovieCard } from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { LoadingMovies } from '@/components/loading-movies';
import { ErrorMessage } from '@/components/error-message';
import Link from 'next/link';

async function PopularMovies() {
  try {
    const { results: movies = [] } = await getPopularMovies();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <ErrorMessage 
        title="Erreur de chargement" 
        message="Impossible de charger les films populaires. Veuillez vérifier votre clé API TMDB."
      />
    );
  }
}

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Découvrez les Meilleurs Films
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Explorez notre sélection de films populaires, nouveautés et classiques du cinéma
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/movies">Explorer les Films</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/upcoming">Prochaines Sorties</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Films Populaires</h2>
        <Suspense fallback={<LoadingMovies />}>
          <PopularMovies />
        </Suspense>
      </section>
    </div>
  );
}