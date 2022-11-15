import { Episode } from "rickmortyapi/dist/interfaces";

const getOneList = (list: any) => {
  if (list && (list as Episode[])?.length) {
    return list;
  }
  return [list];
};

export default getOneList;
