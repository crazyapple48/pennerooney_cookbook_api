import { db } from "../../utils/db.server";
import type { Genre } from "../genre/genre.service";
import type { Method } from "../method/method.service";
import type { Purpose } from "../purpose/purpose.service";
import type { Source } from "../source_route/source.service";

export type RecipeRead = {
  id: number;
  title: string;
  page: number | null;
  rating: number;
  recipe: string;
  ingredients: string;
  nickelaLevel: number;
  isFavorite: boolean;
  method: Method;
  genre: Genre;
  source: Source;
  purpose: Purpose;
};

export type RecipeWrite = {
  title: string;
  page: number | null;
  rating: number;
  recipe: string;
  ingredients: string;
  nickelaLevel: number;
  isFavorite: boolean;
  methodId: number;
  genreId: number;
  sourceId: number;
  purposeId: number;
};

export const listRecipes = async (): Promise<RecipeRead[]> => {
  return db.recipe.findMany({
    select: {
      id: true,
      title: true,
      page: true,
      rating: true,
      recipe: true,
      ingredients: true,
      nickelaLevel: true,
      isFavorite: true,
      method: {
        select: {
          id: true,
          method: true,
        },
      },
      genre: {
        select: {
          id: true,
          genre: true,
        },
      },
      purpose: {
        select: {
          id: true,
          purpose: true,
        },
      },
      source: {
        select: {
          id: true,
          source: true,
          hasManyRecipes: true,
        },
      },
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

export const getRecipe = async (id: number): Promise<RecipeRead | null> => {
  return db.recipe.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      page: true,
      rating: true,
      recipe: true,
      ingredients: true,
      nickelaLevel: true,
      isFavorite: true,
      method: {
        select: {
          id: true,
          method: true,
        },
      },
      genre: {
        select: {
          id: true,
          genre: true,
        },
      },
      purpose: {
        select: {
          id: true,
          purpose: true,
        },
      },
      source: {
        select: {
          id: true,
          source: true,
          hasManyRecipes: true,
        },
      },
    },
  });
};

export const createRecipe = async (
  new_recipe: Omit<RecipeRead, "id" & "isFavorite">
): Promise<RecipeRead> => {
  console.log(new_recipe);
  const {
    title,
    page,
    rating,
    recipe,
    ingredients,
    nickelaLevel,
    method,
    genre,
    source,
    purpose,
  } = new_recipe;
  return db.recipe.create({
    data: {
      title,
      page,
      rating,
      recipe,
      ingredients,
      nickelaLevel,
      method: {
        connect: {
          id: method.id,
        },
      },
      genre: {
        connect: {
          id: genre.id,
        },
      },
      source: {
        connect: {
          id: source.id,
        },
      },
      purpose: {
        connect: {
          id: purpose.id,
        },
      },
    },
    select: {
      id: true,
      title: true,
      page: true,
      rating: true,
      recipe: true,
      ingredients: true,
      nickelaLevel: true,
      isFavorite: true,
      method: {
        select: {
          id: true,
          method: true,
        },
      },
      genre: {
        select: {
          id: true,
          genre: true,
        },
      },
      purpose: {
        select: {
          id: true,
          purpose: true,
        },
      },
      source: {
        select: {
          id: true,
          source: true,
          hasManyRecipes: true,
        },
      },
    },
  });
};

export const updateRecipe = async (
  old_recipe: Omit<RecipeWrite, "id">,
  id: number
): Promise<RecipeRead> => {
  const {
    title,
    page,
    rating,
    recipe,
    ingredients,
    nickelaLevel,
    isFavorite,
    methodId,
    purposeId,
    genreId,
    sourceId,
  } = old_recipe;

  return db.recipe.update({
    where: {
      id,
    },
    data: {
      title,
      page,
      rating,
      recipe,
      ingredients,
      nickelaLevel,
      isFavorite,
      methodId,
      purposeId,
      genreId,
      sourceId,
    },
    select: {
      id: true,
      title: true,
      page: true,
      rating: true,
      recipe: true,
      ingredients: true,
      nickelaLevel: true,
      isFavorite: true,
      method: {
        select: {
          id: true,
          method: true,
        },
      },
      genre: {
        select: {
          id: true,
          genre: true,
        },
      },
      purpose: {
        select: {
          id: true,
          purpose: true,
        },
      },
      source: {
        select: {
          id: true,
          source: true,
          hasManyRecipes: true,
        },
      },
    },
  });
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await db.recipe.delete({
    where: {
      id,
    },
  });
};
