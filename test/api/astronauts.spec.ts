import { astronauts } from "../../src/server/routes/astronauts";
import { MockServer } from "./helpers/MockServer";

const data1 = {
  firstName: "aaa",
  lastName: "bbb",
};

test("astronauts:create", async () => {
  const mock = new MockServer().with(astronauts);

  expect(
    await mock.emit("findAstronaut", {}).then((it) => it.content.length)
  ).toBe(0);

  const { id } = await mock.emit("createAstronaut", data1);

  expect(
    await mock.emit("findAstronaut", { id }).then((it) => it.content.length)
  ).toBe(1);

  expect(
    await mock
      .emit("findAstronaut", { id: "fake" })
      .then((it) => it.content.length)
  ).toBe(0);
});

test("astronauts:update", async () => {
  const mock = new MockServer().with(astronauts);

  const newFirstName = "NEW";
  const entity = await mock.emit("createAstronaut", data1);

  expect(
    await mock
      .emit("findAstronaut", { id: entity.id })
      .then((it) => it.content[0].firstName)
  ).toBe(data1.firstName);

  await mock.emit("updateAstronaut", {
    ...entity,
    firstName: newFirstName,
  });

  expect(
    await mock
      .emit("findAstronaut", { id: entity.id })
      .then((it) => it.content[0].firstName)
  ).toBe(newFirstName);
});

test("astronauts:remove", async () => {
  const mock = new MockServer().with(astronauts);

  expect(
    await mock.emit("findAstronaut", {}).then((it) => it.content.length)
  ).toBe(0);

  const entity = await mock.emit("createAstronaut", data1);

  expect(
    await mock.emit("findAstronaut", {}).then((it) => it.content.length)
  ).toBe(1);

  await mock.emit("removeAstronaut", { id: entity.id });

  expect(
    await mock.emit("findAstronaut", {}).then((it) => it.content.length)
  ).toBe(0);
});
