const removeDuplicates = (list: any[],uniqueProp:string) => {
  return Array.from(
    new Set(list.map((a:any) => a[uniqueProp]))
  ).map((unique) => {
    return list.find((a:any) => a[uniqueProp] === unique);
  });
}

export default removeDuplicates;