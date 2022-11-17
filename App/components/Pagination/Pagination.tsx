import { useEffect } from "react";

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
    <div>
      {current !== 1 && (
        <button onClick={(e) => onClick(current, false)}>{current - 1}</button>
      )}
      <p>{current}</p>
      {current !== totalPages - 1 && (
        <button onClick={(e) => onClick(current, true)}>{current + 1}</button>
      )}
    </div>
  );
};

export default Pagination;
