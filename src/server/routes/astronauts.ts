import { Server } from "../providers/Server";

export const astronauts = (server: Server) => {
  server.on("findAstronaut", async (body, { db }) => {
    if (body.id) {
      const e = await db.astronauts.findById(body.id);
      return {
        content: e ? [e] : [],
      };
    }
    const content = await db.astronauts.findAll();
    if (body.query) {
      // Imitate "complex" search query
      const $query = body.query.toUpperCase();
      return {
        content: content.filter(
          (it) =>
            it.firstName.toUpperCase().includes($query) ||
            it.lastName.toUpperCase().includes($query)
        ),
      };
    }
    return {
      content,
    };
  });

  server.on("createAstronaut", async (body, { db }) => {
    return await db.astronauts.save({
      ...body,
      createdAt: new Date().toISOString(),
    });
  });

  server.on("removeAstronaut", async (body, { db }) => {
    await db.astronauts.remove(body);
    return {};
  });

  server.on("updateAstronaut", async (body, { db }) => {
    const entity = await db.astronauts.findById(body.id);
    if (!entity) {
      throw new Error("not found");
    }

    return await db.astronauts.save({
      ...entity,
      ...body,
    });
  });
};
