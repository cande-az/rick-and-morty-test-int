import { Episode } from "../../interfaces/ricky-and-morty";
import EpisodeCard from "../EpisodeCard/EpisodeCard";
import styles from "./EpisodesCardsContainer.module.scss";

const EpisodesCardsContainer = ({
  episodes,
  className,
  compare
}: {
  episodes: Episode[];
  className: string;
  compare?: boolean;
}) => {
  return (
    <>
      {episodes?.length ? (
        <div
          className={styles[`episodesContainer${className ? className : ""}`]}
        >
          <div className={styles.episodesList}>
            {episodes?.map((e) => (
              <EpisodeCard key={e.id} currentEpisode={e as Episode} />
            ))}
          </div>
        </div>
      ) : compare ? (
        <p className={styles.errorMessage}>Nunca juntos en un episodio</p>
      ) : null}
    </>
  );
};

export default EpisodesCardsContainer;
