import { Character } from "rickmortyapi/dist/interfaces";
import { charactersContainers } from "../../interfaces";

const CharacterCard = ({
  character,
  onSelect,
  side,
}: {
  character: Character;
  side: charactersContainers;
  onSelect: (
    character: Character,
    side: charactersContainers
  ) => void;
}) => {
  const { name, id } = character;
  return <div onClick={() => onSelect(character, side)}>{name}</div>;
};

export default CharacterCard;
