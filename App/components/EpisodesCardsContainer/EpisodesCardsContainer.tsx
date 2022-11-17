import { Episode } from "../../interfaces/ricky-and-morty";
import EpisodeCard from "../EpisodeCard/EpisodeCard";

const EpisodesCardsContainer = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div>
      {episodes?.map((e) => (
        <EpisodeCard key={e.id} currentEpisode={e as Episode} />
      ))}
     {!episodes?.length && <p> No hay episodios para mostrar</p>}
    </div>
  );
};

export default EpisodesCardsContainer;
