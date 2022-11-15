import Head from "next/head";
import styles from "../styles/Index.module.scss";
import { getCharacter, getCharacters, getEpisode } from "rickmortyapi";
import { Character, Episode } from "rickmortyapi/dist/interfaces";
import CharacterCard from "../App/components/CharacterCard/CharacterCard";
import { use, useEffect, useState } from "react";
import {
  charactersContainersMap,
  charactersContainers,
} from "../App/interfaces";
import SelectCharacterCard from "../App/components/SelectCharacterCard/SelectCharacterCard";
import EpisodesCardsContainer from "../App/components/EpisodesCardsContainer/EpisodesCardsContainer";
import getIdList from "../App/utils/getIdList";
import getOneList from "../App/utils/getOneList";

export default function Home({ characters }: { characters: Character[] }) {
  const [leftCurrentCharacter, setLeftCurrentCharacter] = useState<Character>();
  const [rightCurrentCharacter, setRightCurrentCharacter] =
    useState<Character>();
  const [leftCurCharEpisodes, setLeftCurCharEpisodes] = useState<Episode[]>();
  const [rightCurCharEpisodes, setRightCurCharEpisodes] = useState<Episode[]>();
  const [bothChEpisodes, setBothChEpisodes] = useState<Episode[]>();
  const onClickCharacter = (
    character: Character,
    side: charactersContainers
  ) => {
    switch (side) {
      case "left":
        if (character?.id !== rightCurrentCharacter?.id)
          setLeftCurrentCharacter(character);
        break;
      case "right":
        if (character?.id !== leftCurrentCharacter?.id)
          setRightCurrentCharacter(character);
        break;
    }
  };

  useEffect(() => {
    const getEpisodesData = async () => {
      const episodesIds: number[] = getIdList(leftCurrentCharacter!.episode);
      const currentChEpisodes = await getEpisode(episodesIds);
      setLeftCurCharEpisodes(getOneList(currentChEpisodes.data));
    };
    leftCurrentCharacter && getEpisodesData();
  }, [leftCurrentCharacter]);

  useEffect(() => {
    const getEpisodesData = async () => {
      const episodesIds: number[] = getIdList(rightCurrentCharacter!.episode);
      const currentChEpisodes = await getEpisode(episodesIds);
      setRightCurCharEpisodes(getOneList(currentChEpisodes.data));
    };
    rightCurrentCharacter && getEpisodesData();
  }, [rightCurrentCharacter]);

  useEffect(() => {
    let newEpisodes: Episode[] = [...rightCurCharEpisodes!,...leftCurCharEpisodes!];
    const filteredEpisodes = newEpisodes ? [...new Set(newEpisodes)] : [];

    setBothChEpisodes(filteredEpisodes);
  }, [rightCurrentCharacter, leftCurrentCharacter]);

  const RenderCurrentCharacter = ({ character }: { character: Character }) => {
    return <>{character && <SelectCharacterCard character={character} />}</>;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Lets do this test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.charactersListSection}>
          <section className={styles.charactersSectionLeft}>
            {characters.map((character) => (
              <CharacterCard
                character={character}
                onSelect={onClickCharacter}
                side={charactersContainersMap.left}
              />
            ))}
            <RenderCurrentCharacter character={leftCurrentCharacter!} />
          </section>
          <section className={styles.charactersSectionRight}>
            {characters.map((character) => (
              <CharacterCard
                character={character}
                side={charactersContainersMap.right}
                onSelect={onClickCharacter}
              />
            ))}
            <RenderCurrentCharacter character={rightCurrentCharacter!} />
          </section>
        </section>
        <section className={styles.episodesContainerSection}>
          <section>
            <EpisodesCardsContainer episodes={leftCurCharEpisodes!} />
          </section>
          <section>
            <EpisodesCardsContainer episodes={bothChEpisodes!} />
          </section>
          <section>
            <EpisodesCardsContainer episodes={rightCurCharEpisodes!} />
          </section>
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const characters = await getCharacters();
  console.log(characters);
  return {
    props: {
      characters: characters.data.results,
    },
  };
}
