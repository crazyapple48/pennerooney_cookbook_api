import { db } from "../../utils/db.server";

export type Method = {
  id: number;
  method: string;
};

export const listMethods = async (): Promise<Method[]> => {
  return db.method.findMany({
    select: {
      id: true,
      method: true,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

export const getMethod = async (id: number): Promise<Method | null> => {
  return db.method.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      method: true,
    },
  });
};

export const createMethod = async (
  new_method: Omit<Method, "id">
): Promise<Method> => {
  const { method } = new_method;
  return db.method.create({
    data: {
      method,
    },
    select: {
      id: true,
      method: true,
    },
  });
};

export const updateMethod = async (
  old_method: Omit<Method, "id">,
  id: number
): Promise<Method> => {
  const { method } = old_method;
  return db.method.update({
    where: {
      id,
    },
    data: {
      method,
    },
    select: {
      id: true,
      method: true,
    },
  });
};

export const deleteMethod = async (id: number): Promise<void> => {
  await db.method.delete({
    where: {
      id,
    },
  });
};
