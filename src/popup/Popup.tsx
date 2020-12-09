import React, { useState } from "react";
import { BMScriptMap } from "../types";
import { BMStorageSyncGet, evalOnActiveTab } from "../util";
import "./Popup.scss";
import { ScriptView } from "../common/ScriptView";

const Popup: React.FC<{}> = () => {
  const [curScript, setCurScript] = useState<BMScriptMap>({
    scripts: [],
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [curUrl, setCurUrl] = useState<string>(null);

  BMStorageSyncGet("curScript").then((result: BMScriptMap) => {
    if (!isLoaded && result) {
      setCurScript(result);
      setIsLoaded(true);
    }
  });

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const url = tabs[0].url;
      setCurUrl(url);
    }
  });

  const availableScripts = curScript.scripts.filter((e) => {
    const regexp = new RegExp(e.target, "g");
    return regexp.test(curUrl);
  });

  const linkToOption = (
    <p>
      <a
        className="LinkToOptionPage"
        onClick={() => {
          chrome.tabs.create({
            url: `chrome-extension://${chrome.runtime.id}/option.html`,
          });
        }}
      >
        Please register bookmarklet here.
      </a>
    </p>
  );

  if (availableScripts.length == 0) {
    return (
      <div className="PopupContainer">
        <h2>
          <img src="./icon16.png"></img>Bookmarklet Manager
        </h2>
        <p>You have 0 available bookmarklet.</p>
        {linkToOption}
      </div>
    );
  }

  return (
    <div className="PopupContainer">
      <h2>
        <img src="./icon16.png"></img>Bookmarklet Manager
      </h2>
      <p>Active URL: {curUrl}</p>
      {availableScripts.map((e) => (
        <ScriptView
          key={e.title}
          script={e}
          buttonText="Run"
          onClickButton={() => {
            evalOnActiveTab(e.body);
          }}
        />
      ))}
      {linkToOption}
    </div>
  );
};

export default Popup;
