const request = require("supertest");
import { Source } from "@prisma/client";
import { db } from "../../src/utils/db.server";

let server: any;

describe("/sources", () => {
  let source: { source: string; hasManyRecipes: boolean };

  const exec = (): Promise<{ body: any; status: any }> => {
    return request(server).post("/sources").send(source);
  };

  beforeEach(() => {
    server = require("../../src/index");
    source = { source: "source1", hasManyRecipes: false };
  });
  afterEach(async () => {
    server.close();
    await db.source.deleteMany();
  });

  describe("GET /", () => {
    it("should return all sources", async () => {
      await db.source.createMany({
        data: [
          {
            source: "source1",
            hasManyRecipes: false,
          },
          {
            source: "source2",
            hasManyRecipes: false,
          },
        ],
      });

      const res = await request(server).get("/sources");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((m: Source) => m.source === "source1")).toBeTruthy();
      expect(res.body.some((m: Source) => m.source === "source2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return one source if valid id is passed", async () => {
      const source = await db.source.create({
        data: { source: "source1", hasManyRecipes: false },
        select: { id: true, source: true },
      });

      const res = await request(server).get("/sources/" + source.id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(source);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/sources/i");

      expect(res.status).toBe(400);
    });

    it("should return 404 if source with given ID is not found", async () => {
      const res = await request(server).get("/sources/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 if invalid source was sent", async () => {
      source = { source: "", hasManyRecipes: false };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("Should save the source if it's valid", async () => {
      await exec();

      const check_source = db.source.findFirst({
        where: { source: "source1" },
      });

      expect(check_source).not.toBeNull();
    });

    it("Should return the source if it's valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("source", "source1");
    });
  });

  describe("PUT /:id", () => {
    it("Should return 400 if invalid object was sent", async () => {
      const source = { source: "source1", hasManyRecipes: false };

      const id = await db.source.create({ data: source, select: { id: true } });

      const res = await request(server).put("/sources/" + id);

      expect(res.status).toBe(400);
    });

    it("Should return 400 if invalid ID was given", async () => {
      const res = await request(server).put("/sources/i");

      expect(res.status).toBe(400);
    });

    it("Should update the source if it's valid", async () => {
      const source = { source: "source1", hasManyRecipes: false };

      await db.source.create({ data: source });

      const source2 = { source: "source2", hasManyRecipes: false };

      const res = await request(server).put("/sources").send(source2);

      const check_source = db.source.findFirst({
        where: { source: "source2" },
      });

      expect(check_source).not.toBeNull();
    });

    it("Should return the new source if it's valid", async () => {
      const source = { source: "source1", hasManyRecipes: false };
      await db.source.create({ data: source });

      const source2 = { source: "source2", hasManyRecipes: false };

      const res = await request(server).post("/sources").send(source2);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("source", "source2");
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 400 if invalid ID", async () => {
      const res = await request(server).delete("/sources/i");

      expect(res.status).toBe(400);
    });

    it("Should delete source if id is valid", async () => {
      const source = { source: "source1", hasManyRecipes: false };
      const { id } = await db.source.create({
        data: source,
        select: { id: true },
      });

      const res = await request(server).delete("/sources/" + id);

      const check_source = await db.source.findFirst({ where: { id: id } });

      expect(check_source).toBeNull;
    });
  });
});
