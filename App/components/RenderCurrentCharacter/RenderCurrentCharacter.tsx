import { Character } from "../../interfaces/ricky-and-morty";
import SelectCharacterCard from "../SelectCharacterCard/SelectCharacterCard";

const RenderCurrentCharacter = ({ character }: { character: Character }) => {
  return <>{character && <SelectCharacterCard character={character} />}</>;
};

export default RenderCurrentCharacter;
