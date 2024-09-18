// import jest from "jest";
// import {
//   listMethods,
//   getMethod,
//   createMethod,
//   updateMethod,
//   deleteMethod,
//   Method,
// } from "../../src/routes/method/method.service";
// import { prismaMock } from "../../singleton";

// test("should get list of all methods", async () => {
//   const methods =
//     {
//       id: 1,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       method: "Bake",
//     },

//   prismaMock.methods.create.mockResolvedValue(methods);

//   await expect(listMethods()).resolves.toEqual([
//     {
//       id: 1,
//       method: "Bake",
//     },
//     {
//       id: 2,
//       method: "Stove",
//     },
//   ]);
// });
