import React, { useState } from "react";
import "./Option.scss";
import { Button } from "react-bootstrap";
import ScriptEditor from "./ScriptEditor";
import { BMStorage, BMScriptMap, BMScript } from "../types";
import {
  BMStorageSyncSet,
  BMStorageSyncGet,
  isValidTitle,
  isValidScript,
  isValidTarget,
} from "../util";
import Description from "./Description";
import ImportModal from "./ImportModal";

const isValidAll = (curScript: BMScriptMap) => {
  return curScript.scripts.every(
    (e) =>
      isValidTarget(e.target).length === 0 &&
      isValidScript(e.body).length === 0 &&
      isValidTitle(e.title).length === 0
  );
};

const contains = (curScript: BMScriptMap, script: BMScript) => {
  return curScript.scripts.some(
    (e) => JSON.stringify(e) === JSON.stringify(script)
  );
};

const Option: React.FC<{}> = () => {
  const [curScript, setCurScript] = useState<BMScriptMap>({
    scripts: [],
  });
  const [syncedScript, setSyncedScript] = useState<BMScriptMap>({
    scripts: [],
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  BMStorageSyncGet("curScript").then((result: BMScriptMap) => {
    if (!isLoaded && result) {
      setCurScript(result);
      setSyncedScript(result);
      setIsLoaded(true);
    }
  });

  return (
    <div className="Container">
      <Description />
      {curScript.scripts.map((e, i) => (
        <ScriptEditor
          key={i}
          deleteKey={i}
          status={
            syncedScript.scripts.length > i &&
            syncedScript.scripts[i].body === e.body &&
            syncedScript.scripts[i].target === e.target &&
            syncedScript.scripts[i].title === e.title
              ? "SAVED"
              : "EDITED"
          }
          title={{
            curValue: e.title,
            getErrMsgs: isValidTitle,
            setValue: (v) => {
              const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
              obj.scripts[i] = new BMScript(
                v.toString(),
                obj.scripts[i].body,
                obj.scripts[i].target,
                obj.scripts[i].description
              );
              setCurScript(obj);
            },
          }}
          target={{
            curValue: e.target,
            getErrMsgs: isValidTarget,
            setValue: (v) => {
              const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
              obj.scripts[i] = new BMScript(
                obj.scripts[i].title,
                obj.scripts[i].body,
                v.toString(),
                obj.scripts[i].description
              );
              setCurScript(obj);
            },
          }}
          script={{
            curValue: e.body,
            getErrMsgs: isValidScript,
            setValue: (v) => {
              const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
              obj.scripts[i] = new BMScript(
                obj.scripts[i].title,
                v.toString(),
                obj.scripts[i].target,
                obj.scripts[i].description
              );
              setCurScript(obj);
            },
          }}
          onClickDelete={(key) => {
            const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
            obj.scripts.splice(key, 1);
            setCurScript(obj);
          }}
        ></ScriptEditor>
      ))}
      <div className="Actions">
        <Button
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          Import bookmarklet
        </Button>
        <Button
          onClick={() => {
            const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
            obj.scripts.push({
              body: "",
              target: "",
              title: "",
            });
            setCurScript(obj);
          }}
        >
          New bookmarklet
        </Button>
        <Button
          disabled={!isValidAll(curScript)}
          onClick={() => {
            BMStorageSyncSet("curScript", curScript).then(() => {
              setSyncedScript(curScript);
            });
          }}
        >
          Save
        </Button>
      </div>
      <ImportModal
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        onImport={(v) => {
          const obj = JSON.parse(JSON.stringify(curScript)) as BMScriptMap;
          if (!contains(obj, v)) {
            obj.scripts.push(v);
            setCurScript(obj);
          }
        }}
      ></ImportModal>
    </div>
  );
};

export default Option;
