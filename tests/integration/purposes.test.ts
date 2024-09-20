const request = require("supertest");
import { Purpose } from "@prisma/client";
import { db } from "../../src/utils/db.server";

let server: any;

describe("/purposes", () => {
  let purpose: string;

  const exec = (): Promise<{ body: any; status: any }> => {
    return request(server).post("/purposes").send({ purpose: purpose });
  };

  beforeEach(() => {
    server = require("../../src/index");
    purpose = "purpose1";
  });
  afterEach(async () => {
    server.close();
    await db.purpose.deleteMany();
  });

  describe("GET /", () => {
    it("should return all purposes", async () => {
      await db.purpose.createMany({
        data: [
          {
            purpose: "purpose1",
          },
          {
            purpose: "purpose2",
          },
        ],
      });

      const res = await request(server).get("/purposes");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(
        res.body.some((p: Purpose) => p.purpose === "purpose1")
      ).toBeTruthy();
      expect(
        res.body.some((p: Purpose) => p.purpose === "purpose2")
      ).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return one purpose if valid id is passed", async () => {
      const purpose = await db.purpose.create({
        data: { purpose: "purpose1" },
        select: { id: true, purpose: true },
      });

      const res = await request(server).get("/purposes/" + purpose.id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(purpose);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/purposes/i");

      expect(res.status).toBe(400);
    });

    it("should return 404 if purpose with given ID is not found", async () => {
      const res = await request(server).get("/purposes/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 if invalid purpose was sent", async () => {
      purpose = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("Should save the purpose if it's valid", async () => {
      await exec();

      const check_purpose = db.purpose.findFirst({
        where: { purpose: "purpose1" },
      });

      expect(check_purpose).not.toBeNull();
    });

    it("Should return the purpose if it's valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("purpose", "purpose1");
    });
  });

  describe("PUT /:id", () => {
    it("Should return 400 if invalid object was sent", async () => {
      const purpose = { purpose: "purpose1" };

      const id = await db.purpose.create({
        data: purpose,
        select: { id: true },
      });

      const res = await request(server).put("/purposes/" + id);

      expect(res.status).toBe(400);
    });

    it("Should return 400 if invalid ID was given", async () => {
      const res = await request(server).put("/purposes/i");

      expect(res.status).toBe(400);
    });

    it("Should update the purpose if it's valid", async () => {
      const purpose = { purpose: "purpose1" };

      await db.purpose.create({ data: purpose });

      const purpose2 = { purpose: "purpose2" };

      const res = await request(server).put("/purposes").send(purpose2);

      const check_purpose = db.purpose.findFirst({
        where: { purpose: "purpose2" },
      });

      expect(check_purpose).not.toBeNull();
    });

    it("Should return the new purpose if it's valid", async () => {
      const purpose = { purpose: "purpose1" };
      await db.purpose.create({ data: purpose });

      const purpose2 = { purpose: "purpose2" };

      const res = await request(server).post("/purposes").send(purpose2);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("purpose", "purpose2");
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 400 if invalid ID", async () => {
      const res = await request(server).delete("/purposes/i");

      expect(res.status).toBe(400);
    });

    it("Should delete purpose if id is valid", async () => {
      const purpose = { purpose: "purpose1" };
      const { id } = await db.purpose.create({
        data: purpose,
        select: { id: true },
      });

      const res = await request(server).delete("/purposes/" + id);

      const check_purpose = await db.purpose.findFirst({ where: { id: id } });

      expect(check_purpose).toBeNull;
    });
  });
});
