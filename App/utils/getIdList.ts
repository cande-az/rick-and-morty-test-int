const getIdList = (list: string[] | undefined): number[] => {
  return list!.map((e) => {
    return parseInt(e.slice(e.lastIndexOf("/") + 1));
  });
};

export default getIdList;
