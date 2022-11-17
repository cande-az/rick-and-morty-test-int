import Head from "next/head";
import { getCharacters, getEndpoints, getEpisode } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";
import Home from "../App/components/Home/Home";
import { CharactersContextProvider } from "../App/context/characters";
import styles from "../styles/Index.module.scss";

export default function Index({
  characters,
  totalPages,
}: {
  characters: Character[];
  totalPages: number;
}) {
  return (
    <CharactersContextProvider>
      <div className={styles.container}>
        <Head>
          <title>Rick and Morty</title>
          <meta name="description" content="Lets do this test" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Home characters={characters} totalPages={totalPages}/>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </CharactersContextProvider>
  );
}

export async function getServerSideProps() {
  const characters = await getCharacters();
  console.log(characters.data);
  return {
    props: {
      characters: characters.data.results,
      totalPages: characters.data.info?.pages,
    },
  };
}
