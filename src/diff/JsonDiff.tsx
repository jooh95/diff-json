import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './JsonDiff.css'

interface JsonInput {
  value: string;
  error?: boolean;
}

export default function JsonDiff() {
  const [jsonInputs, setJsonInputs] = useState<JsonInput[]>([{value: ""}, {value: ""}]);

  const jsonInputChangeHandler = (index: number): React.ChangeEventHandler<HTMLTextAreaElement> => (e) => {
    const newJsonInput :string= e.target.value;
    let isError = false;

    try {
      var input = JSON.parse(newJsonInput);

      if (input && typeof input !== "object") {
        isError = true;
      }
    } catch (error) {
      isError = true;
    }

    const updatedJsonInputs = [...jsonInputs];
    updatedJsonInputs[index] = {
      ...jsonInputs[index],
      value: newJsonInput,
      error: isError
    };
    setJsonInputs(updatedJsonInputs);
  };

  return (
    <div className="JsonDiff">
      <p>json diff</p>

      <div className="flex">
        {jsonInputs.map((jsonInput, i) => (
          <div className="flex-1" key={i}>
            { i == 0 ? 'source json' : 'target json'}
            <textarea className={jsonInput.error ? 'error' : 'correct'} value={jsonInput.value} onChange={jsonInputChangeHandler(i)} />
          </div>
        ))}
      </div>

      <ReactDiffViewer
        oldValue={jsonInputs[0].error ? "" : jsonInputs[0].value} 
        newValue={jsonInputs[1].error ? "" : jsonInputs[1].value} 
        splitView={true}
        showDiffOnly={false} 
        leftTitle={"source json"}
        rightTitle={"target json"}
      />
    </div>
  );
}
