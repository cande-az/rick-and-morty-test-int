import { Episode } from "rickmortyapi/dist/interfaces";
import EpisodeCard from "../EpisodeCard/EpisodeCard";

const EpisodesCardsContainer = ({ episodes }: { episodes: Episode[] }) => {
  const typedEpisodes = episodes?.length ? episodes : [episodes];
  return (
    <div>
      {episodes?.map((e) => (
        <EpisodeCard currentEpisode={e as Episode} />
      ))}
    </div>
  );
};

export default EpisodesCardsContainer;
