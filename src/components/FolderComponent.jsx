import { useRef, useState } from "react";
import "./folder.css";
import useTraverseFolder from "../hooks/useTraverseFolder";

const FolderComponent = ({ explorer, change }) => {
  const { insert } = useTraverseFolder();
  console.log("rerender");

  const [visibility, setVisibility] = useState({
    visible: false,
    isFolder: false,
    showInput: false,
  });

  const input = useRef("");

  const handleVisibility = (e) => {
    if (visibility.visible === false) {
      setVisibility({ ...visibility, visible: true, showInput: false });
    } else {
      setVisibility({ ...visibility, visible: false, showInput: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      change(insert(input.current, explorer, explorer.id));
      input.current = "";
      e.stopPropagation();
      setVisibility({ ...visibility, showInput: false });
    }
  };

  const handleBlur = () => {
    input.current = "";
    console.log("blurred");
    console.log(input.current);
    setVisibility({ ...visibility, showInput: false });
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
            <button className="addFileButton">+ file</button>
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
                <FolderComponent explorer={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderComponent;
