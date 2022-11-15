import React from "react";
import { Character } from "rickmortyapi/dist/interfaces";

const SelectCharacterCard = ({ character }: { character: Character }) => {
  const { name } = character;

  return <div>{name}</div>;
};

export default SelectCharacterCard;
