const request = require("supertest");
import { Method } from "@prisma/client";
import { db } from "../../src/utils/db.server";

let server: any;

describe("/methods", () => {
  beforeEach(() => {
    server = require("../../src/index");
  });
  afterEach(async () => {
    server.close();
    await db.method.deleteMany();
  });

  describe("GET /", () => {
    it("should return all methods", async () => {
      await db.method.createMany({
        data: [
          {
            method: "method1",
          },
          {
            method: "method2",
          },
        ],
      });

      const res = await request(server).get("/methods");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((m: Method) => m.method === "method1")).toBeTruthy();
      expect(res.body.some((m: Method) => m.method === "method2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return one method if valid id is passed", async () => {
      const method = await db.method.create({
        data: { method: "method1" },
        select: { id: true, method: true },
      });

      const res = await request(server).get("/methods/" + method.id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(method);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/methods/i");

      expect(res.status).toBe(400);
    });

    it("should return 404 if method with given ID is not found", async () => {
      const res = await request(server).get("/methods/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 if invalid object was sent", async () => {
      const res = await request(server).post("/methods");

      expect(res.status).toBe(400);
    });

    it("Should save the method if it's valid", async () => {
      const method = { method: "method1" };

      const res = await request(server).post("/methods").send(method);

      const check_method = db.method.findFirst({
        where: { method: "method1" },
      });

      expect(check_method).not.toBeNull();
    });

    it("Should return the method if it's valid", async () => {
      const method = { method: "method1" };

      const res = await request(server).post("/methods").send(method);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("method", "method1");
    });
  });

  describe("PUT /:id", () => {
    it("Should return 400 if invalid object was sent", async () => {
      const method = { method: "method1" };

      const id = await db.method.create({ data: method, select: { id: true } });

      const res = await request(server).put("/methods/" + id);

      expect(res.status).toBe(400);
    });

    it("Should return 400 if invalid ID was given", async () => {
      const res = await request(server).put("/methods/i");

      expect(res.status).toBe(400);
    });

    it("Should update the method if it's valid", async () => {
      const method = { method: "method1" };

      await db.method.create({ data: method });

      const method2 = { method: "method2" };

      const res = await request(server).put("/methods").send(method2);

      const check_method = db.method.findFirst({
        where: { method: "method2" },
      });

      expect(check_method).not.toBeNull();
    });

    it("Should return the new method if it's valid", async () => {
      const method = { method: "method1" };
      await db.method.create({ data: method });

      const method2 = { method: "method2" };

      const res = await request(server).post("/methods").send(method2);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("method", "method2");
    });

    it("Should return 400 if invalid ID", async () => {
      const res = await request(server).delete("/methods/i");

      expect(res.status).toBe(400);
    });

    it("Should delete method if id is valid", async () => {
      const method = { method: "method1" };
      const { id } = await db.method.create({
        data: method,
        select: { id: true },
      });

      const res = await request(server).delete("/methods/" + id);

      const check_method = await db.method.findFirst({ where: { id: id } });

      expect(check_method).toBeNull;
    });
  });
});
