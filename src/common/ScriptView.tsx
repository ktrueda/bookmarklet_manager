import React from "react";
import { Button } from "react-bootstrap";
import { BMScript } from "../types";
import { evalOnActiveTab } from "../util";
import "./ScriptView.scss";

export const ScriptView: React.FC<{
  script: BMScript;
  buttonText: string;
  onClickButton: () => void;
}> = (props) => {
  return (
    <div className="Script">
      <p className="Title">{props.script.title}</p>
      {props.script.description ? (
        <p className="Description">{props.script.description}</p>
      ) : null}
      <p>Target: {props.script.target}</p>
      <p className="ScriptBody">{props.script.body}</p>
      <Button onClick={props.onClickButton}>{props.buttonText}</Button>
    </div>
  );
};
