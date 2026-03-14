import { fetchAllMedia } from '@/models/mediaModel';
import MediaCard from './MediaCard';
import LoadMore from './LoadMore';

const MediaList = async () => {
  const firstPage = await fetchAllMedia(1, 6);

  if (!firstPage) {
    return <p>Virhe ladattaessa mediaa.</p>;
  }

  return (
    <section className="p-8">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {firstPage.map((item) => (
          <MediaCard key={item.media_id} item={item} />
        ))}
        <LoadMore />
      </ul>
    </section>
  );
};

export default MediaList;