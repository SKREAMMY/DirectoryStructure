const useTraverseFolder = () => {
  const insert = (name, explorer, explorerid) => {
    if (explorer.id === explorerid) {
      explorer.items.unshift({
        id: new Date().getTime(),
        name: name,
        isFolder: true,
        items: [],
      });
      console.log("new explorer", explorer);
      return explorer;
    }

    let data = [];
    data = explorer.items.map((item) => {
      return insert(name, item, explorerid);
    });
    return { ...explorer, items: data };
  };
  return { insert };
};

export default useTraverseFolder;
