import React, { createContext, useContext, useState } from "react";
import characterList from "../generators/characterList";
import { charactersContainers, charactersContainersMap } from "../interfaces";
import { Character, Episode } from "../interfaces/ricky-and-morty";
import getIdList from "../utils/getIdList";
import removeDuplicates from "../utils/removeDuplicates";

export interface ICharactersSection {
  selected: Character | null;
  episodes: Episode[];
  characters: Character[];
  currentPage: number;
  side: charactersContainers;
  actions: characterList;
}

export interface ICharactersContext {
  leftCharacters: ICharactersSection;
  rightCharacters: ICharactersSection;
  common: {
    episodes: Episode[];
    actions: {
      updateCommonEpisodes: () => void;
    };
  };
}
export const chareactersContext = createContext<ICharactersContext | null>(
  null
);

export function useCharacters(): ICharactersContext {
  return useContext(chareactersContext)!;
}

export function CharactersContextProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [leftCharacters, setLeftCharacters] = useState<ICharactersSection>();
  const [rightCharacters, setRightCharacters] = useState<ICharactersSection>();
  const [bothChEpisodes, setBothChEpisodes] = useState<Episode[]>([]);

  const updateCommonEpisodes = () => {
    if (
      leftCharacters?.selected &&
      rightCharacters?.selected &&
      leftCharacters?.episodes &&
      rightCharacters?.episodes
    ) {
      let newEpisodes: Episode[] = [
        ...leftCharacters.episodes,
        ...rightCharacters.episodes,
      ];
      const filteredEpisodes = newEpisodes
        ? newEpisodes.filter((ep) => {
            const characters = getIdList(ep.characters);
            if (
              characters.includes(leftCharacters?.selected?.id!) &&
              characters.includes(rightCharacters?.selected?.id!)
            ) {
              return ep;
            }
          })
        : [];
      setBothChEpisodes(removeDuplicates(filteredEpisodes, "id"));
    }
  };
  const value: ICharactersContext = {
    leftCharacters: {
      ...leftCharacters!,
      side: charactersContainersMap.left,
      actions: new characterList(
        setLeftCharacters,
        leftCharacters,
        rightCharacters
      )
    },
    rightCharacters: {
      ...rightCharacters!,
      side: charactersContainersMap.right,
      actions: new characterList(
        setRightCharacters,
        rightCharacters,
        leftCharacters
      )
    },
    common: {
      episodes: bothChEpisodes,
      actions: {
        updateCommonEpisodes: updateCommonEpisodes,
      },
    },
  };

  return (
    <chareactersContext.Provider value={value}>
      {children}
    </chareactersContext.Provider>
  );
}
