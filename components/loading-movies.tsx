'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingMovies({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="aspect-[2/3] w-full" />
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-12" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}