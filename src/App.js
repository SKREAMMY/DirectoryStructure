
import './App.css';
import { explorer } from "./data/folderData";
import FolderComponent from './components/FolderComponent';
import useTraverseFolder from './hooks/useTraverseFolder';
import { useState } from 'react';


function App() {

  const { insert } = useTraverseFolder();
  const [explorerData, setExplorerData] = useState(explorer);


  const newExplorerDataFunction = (name, explorerid, isFolder) => {
    console.log(name, " - ", explorerid, " - ", isFolder);
    const result = insert(name, explorerData, explorerid, isFolder);
    console.log(result);
  }


  return (
    <div className="App">

      <FolderComponent explorer={explorerData} addNewFolder={newExplorerDataFunction} />

    </div>
  );
}

export default App;
