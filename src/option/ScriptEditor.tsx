import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FormValue } from "../types";
import { faPen, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const errExpression = (errList: string[]) => {
  return errList ? (
    <ul className="ErrList">
      {errList.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  ) : null;
};

const ScriptEditor: React.FC<{
  deleteKey: number;
  title: FormValue<string>;
  target: FormValue<string>;
  script: FormValue<string>;
  status: "SAVED" | "EDITED";
  onClickDelete: (key: number) => void;
}> = (props) => {
  const titleErr = props.title.getErrMsgs(props.title.curValue);
  const scriptErr = props.script.getErrMsgs(props.script.curValue);
  const targetErr = props.target.getErrMsgs(props.target.curValue);
  return (
    <div className="ScriptEditor">
      <div className="Status">
        {props.status == "EDITED" ? (
          <FontAwesomeIcon icon={faPen} />
        ) : props.status == "SAVED" ? (
          <FontAwesomeIcon icon={faCloudUploadAlt} />
        ) : null}
      </div>
      <div className="TableRow">
        <label>Title:</label>
        <div>
          <input
            placeholder="e.g. Github remove ALL viewed @ PR"
            value={props.title.curValue}
            onChange={(event) => {
              props.title.setValue(event.target.value);
            }}
          ></input>
          {errExpression(titleErr)}
        </div>
      </div>
      <div className="TableRow">
        <label>Script:</label>
        <div>
          <textarea
            placeholder={`e.g. console.log("hello")`}
            value={props.script.curValue ? props.script.curValue : undefined}
            onChange={(event) => {
              props.script.setValue(event.target.value);
            }}
          ></textarea>
          {errExpression(scriptErr)}
        </div>
      </div>
      <div className="TableRow">
        <label>Target:</label>
        <div>
          <input
            placeholder="e.g. https:\/\/github\.com/.*"
            value={props.target.curValue}
            onChange={(event) => {
              props.target.setValue(event.target.value);
            }}
          ></input>
          {errExpression(targetErr)}
        </div>
      </div>
      <Button
        onClick={() => {
          props.onClickDelete(props.deleteKey);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default ScriptEditor;
