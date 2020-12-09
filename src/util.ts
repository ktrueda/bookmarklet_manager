import { BMStorageKey, BMScriptMap } from "./types";

export const BMStorageSyncGet = (key: BMStorageKey) => {
  return new Promise(function (resolve) {
    chrome.storage.sync.get([key], function (result) {
      resolve(result[key]);
    });
  });
};

export const BMStorageSyncSet = (storageKey: BMStorageKey, value: any) => {
  return new Promise(function (resolve) {
    chrome.storage.sync.set({ [storageKey]: value }, () => {
      console.log("saved", storageKey, value);
      resolve();
    });
  });
};

export const evalOnActiveTab = (script: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      chrome.tabs.sendMessage(tabs[0].id, { script: script }, (res) => {
        console.log(res);
      });
    } catch {
      alert("failed");
    }
  });
};

export const isValidTitle = (title: string) => {
  const msgs: string[] = [];
  if (title === undefined || title === null || title === "") {
    msgs.push("Empty title");
  }
  return msgs;
};

export const isValidScript = (script: string) => {
  const msgs: string[] = [];
  if (script === undefined || script === null || script === "") {
    msgs.push("Empty Script");
  }
  return msgs;
};

export const isValidTarget = (target: string) => {
  const msgs: string[] = [];
  if (target === undefined || target === null || target === "") {
    msgs.push("Empty target");
  }
  try {
    new RegExp(target);
  } catch {
    msgs.push(`${target} is not valid regular expression`);
  }
  return msgs;
};
