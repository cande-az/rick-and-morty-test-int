import { getCharacters, getEpisode } from "rickmortyapi";
import { Character } from "../interfaces/ricky-and-morty";
import getIdList from "../utils/getIdList";
import parseToList from "../utils/parseToList";

class characterList {
  _setState: React.Dispatch<React.SetStateAction<any>>;
  _state: any;
  _oposite: any;
  constructor(
    _setState: React.Dispatch<React.SetStateAction<any>>,
    _state: any,
    _oposite: any
  ) {
    this._setState = _setState;
    this._state = _state;
    this._oposite = _oposite;
  }

  init = (characters: Character[]) => {
    this._setState({
      ...this._state!,
      currentPage: 1,
      characters: characters,
    });
  };

  updatePage = async (currPage: number, action: boolean) => {
    const newPage = action ? currPage + 1 : currPage - 1;
    const nextPage = await getCharacters({ page: newPage });
    this._setState({
      ...this._state!,
      currentPage: newPage,
      characters: nextPage.data.results,
    });
  };

  onSelectCharacter = (character: Character) => {
    if (character?.id !== this._oposite?.selected?.id) {
      this._setState({
        ...this._state!,
        selected: character,
      });
    }
  };

  getEpisodesData = async () => {
    const episodesIds: number[] = getIdList(this._state.selected!.episode);
    const currentChEpisodes = await getEpisode(episodesIds);
    this._setState({
      ...this._state!,
      episodes: parseToList(currentChEpisodes.data),
    });
  };
}

export default characterList;
