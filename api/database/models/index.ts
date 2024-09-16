import type { Sequelize, Model } from "sequelize";
import { Recipe } from "./Recipe";
import { Method } from "./Method";
import { Genre } from "./Genre";
import { Purpose } from "./Purpose";
import { Source } from "./Source";

export { Recipe, Method, Genre, Purpose, Source };

export function initModels(sequelize: Sequelize) {
  Recipe.initModel(sequelize);
  Method.initModel(sequelize);
  Genre.initModel(sequelize);
  Purpose.initModel(sequelize);
  Source.initModel(sequelize);

  return {
    Recipe,
    Method,
    Genre,
    Purpose,
    Source,
  };
}
