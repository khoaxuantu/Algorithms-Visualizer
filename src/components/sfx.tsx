"use clients";

import { getSpeedOption } from "@/helpers/util";
import { useEffect, useState } from "react";

interface SFXProps {
  [key: string]: {
    name: string;
    file: string;
  };
}

const sfxInfo: SFXProps = {
  "back-button-click": {
    name: "Back button click",
    file: "back-button-click.wav",
  },
  "back-button-hover": {
    name: "Back button hover",
    file: "back-button-hover.wav",
  },
  "click-close": {
    name: "Click close",
    file: "click-close.wav",
  },
  "click-short-confirm": {
    name: "Click short confirm",
    file: "click-short-confirm.wav",
  },
  "combobreak": {
    name: "Combo break",
    file: "combobreak.wav",
  },
  "count2s": {
    name: "Count 2s",
    file: "count2s.wav",
  },
  "drum-hitclap": {
    name: "Drum hit clap",
    file: "drum-hitclap.wav",
  },
  "drum-hitfinish": {
    name: "Drum hit finish",
    file: "drum-hitfinish.wav",
  },
  "drum-hitnormal": {
    name: "Drum hit normal",
    file: "drum-hitnormal.wav",
  },
  "key-press": {
    name: "Key press",
    file: "key-press-1.wav",
  },
  "menuback": {
    name: "Menu back",
    file: "menuback.wav",
  },
  "menuhit": {
    name: "Menu hit",
    file: "menuhit.wav",
  },
  "normal-hitnormal": {
    name: "Normal hit normal",
    file: "normal-hitnormal.wav",
  },
  "normal-hitwhistle": {
    name: "Normal hit whistle",
    file: "normal-hitwhistle.wav",
  },
  "soft-hitfinsih": {
    name: "Soft hit finish",
    file: "soft-hitfinish.wav",
  },
};

export default class SFX {
  private sfxFiles: SFXProps = sfxInfo;
  private canPlaySFX: boolean = true;

  private static instance: SFX;

  public static init() {
    if (!SFX.instance) SFX.instance = new SFX();
    return SFX.instance;
  }

  private constructor() {}

  checkPlaySFXRight(speedFactor: number): boolean {
    this.canPlaySFX = speedFactor < 100;
    return this.canPlaySFX;
  }

  play() {
    const sfxVal = (document.getElementById("sfx-options") as HTMLOptionElement)
      .value;
    if (this.canPlaySFX) {
      const audio = new Audio(`/sfx/${this.sfxFiles[sfxVal].file}`);
      audio.volume = 0.5;
      audio.play();
    }
  }
}

export function SFXOptions() {
  const [canPlaySFX, setCanPlaySFX] = useState(true);

  function checkSFXPlayableHandler() {
    const sfx = SFX.init();
    const speedOpt = getSpeedOption();

    setCanPlaySFX(sfx.checkPlaySFXRight(speedOpt as number));
  }

  useEffect(() => {
    let speedOptList = document.getElementsByName("spd-opt");
    speedOptList.forEach((elem) => {
      elem.addEventListener("click", () => checkSFXPlayableHandler());
    });

    checkSFXPlayableHandler();
  }, []);

  return (
    <div className="p-2">
      <label htmlFor="sfx-options" className="d-block">
        Sound effect
      </label>
      <select name="sfx-options" id="sfx-options">
        {Object.keys(sfxInfo).map((key) => {
          return (
            <option key={key} value={key}>
              {sfxInfo[key].name}
            </option>
          );
        })}
      </select>
      {!canPlaySFX && (
        <div className="text-danger">
          Your current speed option is too high, to protect your ears the sound
          is disabled
        </div>
      )}
    </div>
  );
}
