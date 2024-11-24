import Image from 'next/image';
import { getMovieDetails } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function MoviePage({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(parseInt(params.id));
    
    if (!movie || movie.success === false) {
      notFound();
    }

    return (
      <div className="space-y-8">
        <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
          {movie.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              {movie.vote_average && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
              )}
              {movie.release_date && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                </Badge>
              )}
              {movie.runtime && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {movie.runtime} min
                </Badge>
              )}
            </div>

            {movie.overview && (
              <p className="text-gray-500 dark:text-gray-400">{movie.overview}</p>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    notFound();
  }
}