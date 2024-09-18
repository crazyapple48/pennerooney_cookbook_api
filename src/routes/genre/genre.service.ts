import { db } from "../../utils/db.server";

export type Genre = {
  id: number;
  genre: string;
};

export const listGenres = async (): Promise<Genre[]> => {
  return db.genre.findMany({
    select: {
      id: true,
      genre: true,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

export const getGenre = async (id: number): Promise<Genre | null> => {
  return db.genre.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      genre: true,
    },
  });
};

export const createGenre = async (
  new_genre: Omit<Genre, "id">
): Promise<Genre> => {
  const { genre } = new_genre;
  return db.genre.create({
    data: {
      genre,
    },
    select: {
      id: true,
      genre: true,
    },
  });
};

export const updateGenre = async (
  old_genre: Omit<Genre, "id">,
  id: number
): Promise<Genre> => {
  const { genre } = old_genre;
  return db.genre.update({
    where: {
      id,
    },
    data: {
      genre,
    },
    select: {
      id: true,
      genre: true,
    },
  });
};

export const deleteGenre = async (id: number): Promise<void> => {
  await db.genre.delete({
    where: {
      id,
    },
  });
};
