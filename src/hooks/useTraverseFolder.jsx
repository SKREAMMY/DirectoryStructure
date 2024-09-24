const useTraverseFolder = () => {
  const insert = (name, explorer, explorerid, isFolder) => {
    // console.log(
    //   "explorer id is ",
    //   explorerid,
    //   explorer,
    //   "folder status ",
    //   isFolder
    // );

    if (explorer.id === explorerid) {
      explorer.items.unshift({
        id: new Date().getTime(),
        name: name,
        isFolder: isFolder,
        items: [],
      });

      return explorer;
    } else {
      let data = [];
      data = explorer.items.map((item, index) => {
        return insert(name, item, explorerid, isFolder);
      });

      // console.log("explorer is ", data);
      return { ...explorer, items: data };
    }
  };
  return { insert };
};

export default useTraverseFolder;
