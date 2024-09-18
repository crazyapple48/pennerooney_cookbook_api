import jest from "jest";
import {
  listMethods,
  getMethod,
  createMethod,
  updateMethod,
  deleteMethod,
  Method,
} from "../../src/routes/method/method.service";
import { prismaMock } from "../../singleton";

describe("method route", () => {
  it("should get list of all methods", async () => {
    const methods = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      method: "Bake",
    };

    prismaMock.method.create.mockResolvedValue(methods);

    await expect(listMethods()).resolves.toMatchObject([
      {
        id: 1,
        method: "Stove",
      },
      {
        id: 2,
        method: "InstaPot",
      },
      {
        id: 3,
        method: "Bake",
      },
    ]);
  });

  it("should get a single method", async () => {
    const method = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      method: "Stove",
    };

    prismaMock.method.create.mockResolvedValue(method);

    await expect(getMethod(1)).resolves.toMatchObject({
      id: 1,
      method: "Stove",
    });
  });

  it("should create a new method", async () => {
    const method = {
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      method: "BBQ",
    };

    prismaMock.method.create.mockResolvedValue(method);

    await expect(createMethod(method)).resolves.toMatchObject({
      id: 5,
      method: "Stove",
    });
  });
});
