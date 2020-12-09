class InvalidScriptError extends Error {}
export class BMScript {
  public constructor(
    readonly title: string,
    readonly body: string,
    readonly target: string,
    readonly description?: string
  ) {
    if (this.title.length > 100) {
      throw new InvalidScriptError("script.title.lenght must be less than 100");
    }

    if (this.body.length > 10000) {
      throw new InvalidScriptError(
        "script.body.lenght must be less than 10000"
      );
    }
    if (this.target.length > 1000) {
      throw new InvalidScriptError(
        "script.target.lenght must be less than 1000"
      );
    }
    if (this.description && this.description.length > 1000) {
      throw new InvalidScriptError(
        "script.description.lenght must be less than 1000"
      );
    }
  }
}
export interface BMScriptMap {
  scripts: BMScript[];
}

export interface BMStorage {
  curScript: BMScriptMap;
}

export type BMStorageKey = keyof BMStorage;

export interface FormValue<T> {
  curValue: T;
  setValue: (v: T) => void;
  getErrMsgs: (v: T) => string[];
}
