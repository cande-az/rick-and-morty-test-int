import React from "react";
import { Episode } from "rickmortyapi/dist/interfaces";

const EpisodeCard = ({ currentEpisode }: { currentEpisode: Episode }) => {
  return (
    <>
      {currentEpisode && (
        <div>
          <h2>
            {currentEpisode?.episode} {currentEpisode?.name}
          </h2>
          <p>{currentEpisode?.air_date}</p>
        </div>
      )}
    </>
  );
};

export default EpisodeCard;
