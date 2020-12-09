import React from "react";
const Description: React.FC<{}> = () => {
  return (
    <div className="Description">
      <h2>
        <img src="./icon48.png"></img>Bookmarklet Manager
      </h2>
      <p>
        Bookmarklet manager helps you to manage bookmarklets easily. And you can
        share/import useful bookmarklets. If you write code, plese make Pull
        Request at Github
        <a href="https://github.com/ktrueda/bookmarklet_manager"> repository</a>
        .
      </p>
      <h4>How to use</h4>
      <ol>
        <li>Click Import bookmarklet button.</li>
        <li>Choose one Bookmarklet and click Import button.</li>
        <li>Click Save Button.</li>
        <li>Open a website you like.</li>
        <li>Click Bookmarklet manager icon in Chrome Extension Area.</li>
        <li>Run your bookmarklet imported.</li>
      </ol>
    </div>
  );
};

export default Description;
