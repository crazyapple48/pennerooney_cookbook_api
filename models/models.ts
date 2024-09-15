import { DataTypes, Model } from "sequelize";
import { sequelize } from "../api/index";

export class Recipe extends Model {
  declare id: number;
  declare title: string;
  declare method_id: number;
  declare purpose: "Side" | "Entree" | string;
  declare genre: string;
  declare source: string | null;
  declare page: number | null;
  declare rating: number;
  declare recipe: string;
  declare ingredients: string;
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    page: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipe: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Recipe",
  }
);

export class Genre extends Model {
  declare id: number;
  declare genre: string;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    genre: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Genre",
  }
);

export class Method extends Model {
  declare id: number;
  declare method: string;
}

Method.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Method",
  }
);

export class Purpose extends Model {
  declare id: number;
  declare purpose: string;
}

Purpose.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purpose: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Method",
  }
);

export class Source extends Model {
  declare id: number;
  declare source: string;
}

Source.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    source: {
      type: DataTypes.STRING(1000),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Source",
  }
);

// associations
Method.hasMany(Recipe);
Recipe.belongsTo(Method, { foreignKey: { allowNull: false } });

Genre.hasMany(Recipe);
Recipe.belongsTo(Genre, { foreignKey: { allowNull: false } });

Purpose.hasMany(Recipe);
Recipe.belongsTo(Purpose, { foreignKey: { allowNull: false } });

Source.hasMany(Recipe);
Recipe.belongsTo(Source);
