import { db } from "../../utils/db.server";

export type Purpose = {
  id: number;
  purpose: string;
};

export const listPurposes = async (): Promise<Purpose[]> => {
  return db.purpose.findMany({
    select: {
      id: true,
      purpose: true,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

export const getPurpose = async (id: number): Promise<Purpose | null> => {
  return db.purpose.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      purpose: true,
    },
  });
};

export const createPurpose = async (
  new_purpose: Omit<Purpose, "id">
): Promise<Purpose> => {
  const { purpose } = new_purpose;
  return db.purpose.create({
    data: {
      purpose,
    },
    select: {
      id: true,
      purpose: true,
    },
  });
};

export const updatePurpose = async (
  old_purpose: Omit<Purpose, "id">,
  id: number
): Promise<Purpose> => {
  const { purpose } = old_purpose;
  return db.purpose.update({
    where: {
      id,
    },
    data: {
      purpose,
    },
    select: {
      id: true,
      purpose: true,
    },
  });
};

export const deletePurpose = async (id: number): Promise<void> => {
  await db.purpose.delete({
    where: {
      id,
    },
  });
};
