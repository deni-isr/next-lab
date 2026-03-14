'use client';

import { useEffect, useState, JSX } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchNextPage } from '@/actions/media';

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<JSX.Element[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (inView && hasMore) {
      fetchNextPage(page).then((res: JSX.Element[] | null) => {
        if (!res) {
          setHasMore(false);
        } else {
          setData((prev) => [...prev, ...res]);
          setPage((prev) => prev + 1);
        }
      });
    }
  }, [inView, hasMore, page]);

  return (
    <>
      {data}
      {hasMore && (
        <div ref={ref} className="col-span-full flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
        </div>
      )}
    </>
  );
}