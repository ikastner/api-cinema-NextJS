'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { MovieCard } from '@/components/movie-card';
import { searchMovies } from '@/lib/tmdb';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);

    try {
      const { results = [] } = await searchMovies(searchQuery);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rechercher des Films</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Trouvez vos films préférés
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="search"
          placeholder="Rechercher un film..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" disabled={loading}>
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
      </form>

      {loading ? (
        <div className="text-center">Chargement...</div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : query && !loading ? (
        <div className="text-center text-gray-500">
          Aucun résultat trouvé pour "{query}"
        </div>
      ) : null}
    </div>
  );
}