/* eslint-disable @next/next/no-img-element */
import { Character } from "rickmortyapi/dist/interfaces";
import { charactersContainers } from "../../interfaces";
import styles from "./CharacterCard.module.scss";

const CharacterCard = ({
  character,
  onSelect,
  side,
  className,
}: {
  character: Character;
  side: charactersContainers;
  onSelect: (character: Character, side: charactersContainers) => void;
  className?: string;
}) => {
  const { name, status, species, image } = character;
  return (
    <div
      onClick={() => onSelect(character, side)}
      className={styles[`container${className ? className : ""}`]}
    >
      <div
        className={styles.background}
        style={{ background: `url(${image})` }}
      ></div>

      <div className={styles.content}>
        <img
          src={image}
          alt={name}
          width={70}
          height={70}
          className={styles.img}
        />
        <div className={styles.info}>
          <h2>{name}</h2>
          <div className={styles.dataContainer}>
            <div>
              <label>Status</label> <p>{status}</p>
            </div>
            <div>
              <label>Especie</label> <p>{species}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
