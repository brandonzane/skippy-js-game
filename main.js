import { level1Config } from "./content/level1/config.js";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { Player } from "./entities/Player.js";
import kaboom from "./libs/kaboom.mjs";
import { Camera } from "./utils/Camera.js";
import { Level } from "./utils/Level.js";
import { uiManager } from "./utils/UIManager.js";
import { load } from "./utils/loader.js";

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
});

load.fonts();
load.assets();
load.sounds();

const scenes = {
  menu: () => {
    uiManager.displayMainMenu();
  },
  controls: () => {
    uiManager.displayControlsMenu();
  },
  1: () => {
    const level1 = new Level();
    level1.drawBackground("forest-background");
    level1.drawMapLayout(level1Layout, level1Mappings);

    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    );

    const camera = new Camera();
    camera.attach(player.gameObj, 0, -200, null, 200);

    level1.drawWaves("water", "wave");
  },
  2: () => {},
  3: () => {},
  gameover: () => {},
  end: () => {},
};

for (const key in scenes) {
  scene(key, scenes[key]);
}

go("menu");
