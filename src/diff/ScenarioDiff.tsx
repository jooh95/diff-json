import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './ScenarioDiff.css'
import Scenario from './Scenario';

interface JsonInput {
  value: string;
  error?: boolean;
}

export default function ScenarioDiff() {
  const [jsonInputs, setJsonInputs] = useState<JsonInput[]>([{value: ""}, {value: ""}]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const jsonInputChangeHandler = (index: number): React.ChangeEventHandler<HTMLTextAreaElement> => (e) => {
    const newJsonInput :string= e.target.value;
    let isError = false;

    try {
      const updatedScenarios: Scenario[] = [...scenarios];
      updatedScenarios[index] = new Scenario(newJsonInput);
      setScenarios(updatedScenarios);
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
    <div className="ScenarioDiff">
      <p>시나리오 비교</p>

      <div className="flex">
        {jsonInputs.map((jsonInput, i) => (
          <div className="flex-1" key={i}>
            { i == 0 ? 'source 시나리오' : 'target 시나리오'}
            <textarea className={jsonInput.error ? 'error' : 'correct'} value={jsonInput.value} onChange={jsonInputChangeHandler(i)} />
          </div>
        ))}
      </div>

      <ReactDiffViewer
        oldValue={JSON.stringify(scenarios[0], null, 2)} 
        newValue={JSON.stringify(scenarios[1], null, 2)} 
        splitView={true} 
        showDiffOnly={false} 
        leftTitle={"source 시나리오"}
        rightTitle={"target 시나리오"}
      />
    </div>
  );
}
