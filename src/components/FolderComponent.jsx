import { useEffect, useRef, useState } from "react";
import "./folder.css";
import useTraverseFolder from "../hooks/useTraverseFolder";

const FolderComponent = ({ explorer, addNewFolder = () => {} }) => {
  const { insert } = useTraverseFolder();
  //   console.log("rerender");
  const [count, setCount] = useState(0);
  const [visibility, setVisibility] = useState({
    visible: false,
    isFolder: false,
    showInput: false,
  });

  const input = useRef("");

  useEffect(() => {
    // count state is to check how many rerender occurs
    console.log("re rendered", count);
  }, [count]);

  const handleVisibility = (e) => {
    if (visibility.visible === false) {
      setVisibility({ ...visibility, visible: true, showInput: false });
      setCount(count + 1);
    } else {
      setVisibility({ ...visibility, visible: false, showInput: false });
      setCount(count + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("explorer data before sending ", visibility.isFolder);

      addNewFolder(input.current, explorer.id, visibility.isFolder);
      e.stopPropagation();
      input.current = "";

      e.stopPropagation();
      setVisibility({ ...visibility, showInput: false });
      setCount(count + 1);
    }
  };

  const handleBlur = () => {
    input.current = "";
    console.log(input.current);
    setVisibility({ ...visibility, showInput: false });
    setCount(count + 1);
  };
  return (
    <div>
      <div className="container">
        <button
          style={{ background: "none", border: 0, cursor: "pointer" }}
          onClick={(e) => handleVisibility(e)}
        >
          {explorer.isFolder ? <span>📂</span> : <span>📄</span>}
          {explorer.name}
        </button>

        {explorer.isFolder && (
          <div>
            {" "}
            <button
              className="addFolderButton"
              onClick={() => {
                setVisibility({
                  ...visibility,
                  visible: true,
                  isFolder: true,
                  showInput: true,
                });
              }}
            >
              + folder
            </button>
            <button
              className="addFileButton"
              onClick={() => {
                setVisibility({
                  ...visibility,
                  visible: true,
                  isFolder: false,
                  showInput: true,
                });
              }}
            >
              + file
            </button>
          </div>
        )}
      </div>

      {visibility.visible && (
        <div>
          {visibility.showInput && (
            <input
              type="text"
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                input.current = e.target.value;
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              onBlur={handleBlur}
            ></input>
          )}
          {explorer.isFolder && (
            <div style={{ marginLeft: "20px" }}>
              {explorer.items.map((item) => (
                <FolderComponent explorer={item} addNewFolder={addNewFolder} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderComponent;
