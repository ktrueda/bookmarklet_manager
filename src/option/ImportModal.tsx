import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ScriptView } from "../common/ScriptView";
import { BMScript } from "../types";

const PUBLIC_SCRIPT_URL =
  "https://raw.githubusercontent.com/ktrueda/tmp/main/public_scripts.json";

const fetchPublicScripts = () => {
  return fetch(PUBLIC_SCRIPT_URL)
    .then((response) => response.json())
    .then((data: BMScript[]) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const ImportModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onImport: (v: BMScript) => void;
}> = (props) => {
  const [publicScripts, setPublicScripts] = useState<BMScript[]>([]);

  // initalize
  useEffect(() => {
    fetchPublicScripts().then((scripts) => {
      if (scripts) {
        setPublicScripts(scripts);
      }
    });
  }, []);

  return (
    <Modal show={props.show} onHide={props.onHide} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Import Bookmarklet</Modal.Title>
        <Button
          className="ReloadButton"
          onClick={() => {
            setPublicScripts([]);
            fetchPublicScripts().then((scripts) => {
              if (scripts) {
                setPublicScripts(scripts);
              }
            });
          }}
        >
          Reload
        </Button>
      </Modal.Header>
      <Modal.Body>
        {publicScripts.map((e, i) => (
          <ScriptView
            key={i}
            script={e}
            buttonText="Import"
            onClickButton={() => {
              props.onImport(e);
            }}
          />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ImportModal;
