/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import styles from "./Home.module.scss";
import { useCharacters } from "../../context/characters";
import { Character } from "rickmortyapi/dist/interfaces";
import RenderCurrentCharacter from "../RenderCurrentCharacter/RenderCurrentCharacter";
import CharacterCard from "../CharacterCard/CharacterCard";
import EpisodesCardsContainer from "../EpisodesCardsContainer/EpisodesCardsContainer";
import Pagination from "../Pagination/Pagination";
const Home = ({
  characters,
  totalPages,
}: {
  characters: Character[];
  totalPages: number;
}) => {
  const { leftCharacters, rightCharacters, common } = useCharacters();

  useEffect(() => {
    leftCharacters.actions.updateCharacters(characters);
    rightCharacters.actions.updateCharacters(characters);
    leftCharacters.actions.setInitialPage();
    rightCharacters.actions.setInitialPage();
  }, []);

  useEffect(() => {
    leftCharacters.selected && leftCharacters.actions.getEpisodesData();
  }, [leftCharacters.selected]);

  useEffect(() => {
    rightCharacters.selected && rightCharacters.actions.getEpisodesData();
  }, [rightCharacters.selected]);

  useEffect(() => {
    common.actions.updateCommonEpisodes();
  }, [
    leftCharacters.episodes,
    rightCharacters.episodes,
    leftCharacters.selected,
    rightCharacters.selected,
  ]);

  return (
    <div>
      <section className={styles.charactersListSection}>
        <section className={styles.charactersSectionLeft}>
          {leftCharacters?.characters?.map((character, idx) => (
            <CharacterCard
              key={idx}
              character={character}
              onSelect={leftCharacters.actions.onSelectCharacter}
              side={leftCharacters.side}
            />
          ))}
          {leftCharacters.currentPage && (
            <Pagination
              current={leftCharacters.currentPage}
              totalPages={totalPages}
              onClick={leftCharacters.actions.updatePage}
            />
          )}
          <RenderCurrentCharacter character={leftCharacters.selected!} />
        </section>
        <section className={styles.charactersSectionRight}>
          {rightCharacters?.characters?.map((character, idx) => (
            <CharacterCard
              key={idx}
              character={character}
              side={rightCharacters.side}
              onSelect={rightCharacters.actions.onSelectCharacter}
            />
          ))}
          <Pagination
            current={rightCharacters.currentPage}
            totalPages={totalPages}
            onClick={rightCharacters.actions.updatePage}
          />
          <RenderCurrentCharacter character={rightCharacters.selected!} />
        </section>
      </section>
      <section className={styles.episodesContainerSection}>
        <section>
          <EpisodesCardsContainer episodes={leftCharacters.episodes} />
        </section>
        <section>
          <EpisodesCardsContainer episodes={common.episodes} />
        </section>
        <section>
          <EpisodesCardsContainer episodes={rightCharacters.episodes} />
        </section>
      </section>
    </div>
  );
};

export default Home;
