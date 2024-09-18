import { db } from "../../utils/db.server";

export type Source = {
  id: number;
  source: string;
  hasManyRecipes: boolean;
};

export const listSources = async (): Promise<Source[]> => {
  return db.source.findMany({
    where: {
      hasManyRecipes: true,
    },
    select: {
      id: true,
      source: true,
      hasManyRecipes: true,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

export const getSource = async (id: number): Promise<Source | null> => {
  return db.source.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      source: true,
      hasManyRecipes: true,
    },
  });
};

export const createSource = async (
  new_source: Omit<Source, "id">
): Promise<Source> => {
  const { source, hasManyRecipes } = new_source;
  return db.source.create({
    data: {
      source,
      hasManyRecipes,
    },
    select: {
      id: true,
      source: true,
      hasManyRecipes: true,
    },
  });
};

export const updateSource = async (
  old_source: Omit<Source, "id">,
  id: number
): Promise<Source> => {
  const { source, hasManyRecipes } = old_source;
  return db.source.update({
    where: {
      id,
    },
    data: {
      source,
      hasManyRecipes,
    },
    select: {
      id: true,
      source: true,
      hasManyRecipes: true,
    },
  });
};

export const deleteSource = async (id: number): Promise<void> => {
  await db.source.delete({
    where: {
      id,
    },
  });
};
