'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Image as ImageIcon } from 'lucide-react';
import type { Movie } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="overflow-hidden transition-all hover:scale-105">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3]">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {movie.vote_average.toFixed(1)}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}