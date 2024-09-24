
import './App.css';
import { explorer } from "./data/folderData";
import FolderComponent from './components/FolderComponent';
import useTraverseFolder from './hooks/useTraverseFolder';
import { useState } from 'react';


function App() {

  const traverseTree = useTraverseFolder();
  const [explorerData, setExplorerData] = useState(explorer);

  const newExplorerDataFunction = (data) => {
    setExplorerData(data);
    console.log("working", data);
  }


  return (
    <div className="App">

      <FolderComponent traverseTree={traverseTree} explorer={explorerData} change={newExplorerDataFunction} />

    </div>
  );
}

export default App;
