chrome.runtime.onMessage.addListener((message) => {
  const script = message.script;
  console.log(`eval ${script}`);
  try {
    eval(script);
  } catch (e) {
    const errExp = `
    Error from Bookmarklet manager

    ${e}
    `;
    alert(errExp);
  }
});
