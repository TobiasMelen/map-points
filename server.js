//@ts-check
const fastify = require("fastify").fastify;
const prisma = require("@prisma/client");

const app = fastify({ logger: true });

const dbClient = new prisma.PrismaClient();

app.get("/", async () => {
  const locations = await dbClient.location.findMany();
  return locations;
});

app.get("/seed", async () => {
  await dbClient.location.create({
    data: {
      Radius: 5000,
      latitude: 58.925448,
      longitude: 18.270739,
      name: "Utö",
    },
  });
});

app.listen(process.env.PORT ?? "5000");
