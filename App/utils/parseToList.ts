import { Episode } from "rickmortyapi/dist/interfaces";

const parseToList = (list: any) => {
  if (list && list?.length) {
    return list;
  }
  return [list];
};

export default parseToList;
