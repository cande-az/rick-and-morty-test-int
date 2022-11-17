/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import styles from "./Home.module.scss";
import { useCharacters } from "../../context/characters";
import { Character } from "rickmortyapi/dist/interfaces";
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
    leftCharacters.actions.init(characters);
    rightCharacters.actions.init(characters);
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
          <div className={styles.boxContainer}>
            <div className={styles.cardsContainer}>
              {leftCharacters?.characters?.map((character, idx) => (
                <CharacterCard
                  key={idx}
                  character={character}
                  onSelect={leftCharacters.actions.onSelectCharacter}
                  side={leftCharacters.side}
                  className={`${
                    leftCharacters?.selected?.id === character?.id
                      ? "Selected"
                      : ""
                  }${
                    rightCharacters?.selected?.id === character?.id
                      ? "Disabled"
                      : ""
                  }`}
                />
              ))}
            </div>
            {leftCharacters.currentPage ? (
              <Pagination
                current={leftCharacters.currentPage}
                totalPages={totalPages}
                onClick={leftCharacters.actions.updatePage}
              />
            ) : null}
          </div>
          <EpisodesCardsContainer
            episodes={leftCharacters.episodes}
            className={leftCharacters.side}
          />
        </section>
        <section className={styles.sectionBoth}>
          <EpisodesCardsContainer
            episodes={common.episodes}
            className={"mix"}
            compare={
              leftCharacters?.episodes?.length &&
              rightCharacters?.episodes?.length
                ? true
                : false
            }
          />
        </section>
        <section className={styles.charactersSectionRight}>
          <div className={styles.boxContainer}>
            <div className={styles.cardsContainer}>
              {rightCharacters?.characters?.map((character, idx) => (
                <CharacterCard
                  key={idx}
                  character={character}
                  side={rightCharacters.side}
                  onSelect={rightCharacters.actions.onSelectCharacter}
                  className={`${
                    rightCharacters?.selected?.id === character?.id
                      ? "Selected"
                      : ""
                  }${
                    leftCharacters?.selected?.id === character?.id
                      ? "Disabled"
                      : ""
                  }`}
                />
              ))}
            </div>
            <Pagination
              current={rightCharacters.currentPage}
              totalPages={totalPages}
              onClick={rightCharacters.actions.updatePage}
            />
          </div>
          <EpisodesCardsContainer
            episodes={rightCharacters.episodes}
            className={rightCharacters.side}
          />
        </section>
      </section>
      <section className={styles.episodesContainerSection}></section>
    </div>
  );
};

export default Home;
