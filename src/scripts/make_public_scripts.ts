import toml from "toml";
import fs from "fs";
import { BMScript } from "../types";

const PUBLIC_SCRIPT_DIR = "./public_scripts";

const tomlToObj = (tomlStr: string): BMScript => {
  const data = toml.parse(tomlStr);

  return new BMScript(
    data.script.title,
    data.script.body,
    data.script.target,
    data.script.description
  );
};

const files = fs.readdirSync(PUBLIC_SCRIPT_DIR);
const scripts = files.map((path) => {
  const fullPath = `${PUBLIC_SCRIPT_DIR}/${path}`;
  const tomlContent = fs.readFileSync(fullPath, "utf8");
  try {
    const script = tomlToObj(tomlContent);
    return script;
  } catch (e) {
    throw new Error(`${e} in ${fullPath}`);
  }
});
fs.writeFileSync("./public_scripts.json", JSON.stringify(scripts));
