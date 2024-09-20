const request = require("supertest");
import { Genre } from "@prisma/client";
import { db } from "../../src/utils/db.server";

let server: any;

describe("/genres", () => {
  let genre: string;

  const exec = (): Promise<{ body: any; status: any }> => {
    return request(server).post("/genres").send({ genre: genre });
  };

  beforeEach(() => {
    server = require("../../src/index");
    genre = "genre1";
  });
  afterEach(async () => {
    server.close();
    await db.genre.deleteMany();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await db.genre.createMany({
        data: [
          {
            genre: "genre1",
          },
          {
            genre: "genre2",
          },
        ],
      });

      const res = await request(server).get("/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((m: Genre) => m.genre === "genre1")).toBeTruthy();
      expect(res.body.some((m: Genre) => m.genre === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return one genre if valid id is passed", async () => {
      const genre = await db.genre.create({
        data: { genre: "genre1" },
        select: { id: true, genre: true },
      });

      const res = await request(server).get("/genres/" + genre.id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(genre);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/genres/i");

      expect(res.status).toBe(400);
    });

    it("should return 404 if genre with given ID is not found", async () => {
      const res = await request(server).get("/genres/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 if invalid genre was sent", async () => {
      genre = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("Should save the genre if it's valid", async () => {
      await exec();

      const check_genre = db.genre.findFirst({
        where: { genre: "genre1" },
      });

      expect(check_genre).not.toBeNull();
    });

    it("Should return the genre if it's valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("genre", "genre1");
    });
  });

  describe("PUT /:id", () => {
    it("Should return 400 if invalid object was sent", async () => {
      const genre = { genre: "genre1" };

      const id = await db.genre.create({ data: genre, select: { id: true } });

      const res = await request(server).put("/genres/" + id);

      expect(res.status).toBe(400);
    });

    it("Should return 400 if invalid ID was given", async () => {
      const res = await request(server).put("/genres/i");

      expect(res.status).toBe(400);
    });

    it("Should update the genre if it's valid", async () => {
      const genre = { genre: "genre1" };

      await db.genre.create({ data: genre });

      const genre2 = { genre: "genre2" };

      const res = await request(server).put("/genres").send(genre2);

      const check_genre = db.genre.findFirst({
        where: { genre: "genre2" },
      });

      expect(check_genre).not.toBeNull();
    });

    it("Should return the new genre if it's valid", async () => {
      const genre = { genre: "genre1" };
      await db.genre.create({ data: genre });

      const genre2 = { genre: "genre2" };

      const res = await request(server).post("/genres").send(genre2);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("genre", "genre2");
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 400 if invalid ID", async () => {
      const res = await request(server).delete("/genres/i");

      expect(res.status).toBe(400);
    });

    it("Should delete genre if id is valid", async () => {
      const genre = { genre: "genre1" };
      const { id } = await db.genre.create({
        data: genre,
        select: { id: true },
      });

      const res = await request(server).delete("/genres/" + id);

      const check_genre = await db.genre.findFirst({ where: { id: id } });

      expect(check_genre).toBeNull;
    });
  });
});
