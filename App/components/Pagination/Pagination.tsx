import { useEffect } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  current,
  totalPages,
  onClick,
}: {
  current: number;
  totalPages: number;
  onClick: (currPage: number, action: boolean) => void;
}) => {
  useEffect(() => undefined, [current]);
  return (
    <>
      {current && (
        <div className={styles.pagContainer}>
          {current !== 1 && (
            <>
              <svg
                onClick={(e) => onClick(2, false)}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1.3rem"
                width="1rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                ></path>
              </svg>
              <button
                className={styles.prevButton}
                onClick={(e) => onClick(current, false)}
              >
                {current - 1}
              </button>
            </>
          )}
          <p className={styles.currentButton}>{current}</p>
          {current !== totalPages - 1 && (
            <>
              <button
                className={styles.nextButton}
                onClick={(e) => onClick(current, true)}
              >
                {current + 1}
              </button>
              <svg
                onClick={(e) => onClick(totalPages-2, true)}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1.3rem"
                width="1rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                ></path>
              </svg>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
