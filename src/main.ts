import fastify from "fastify";
import cors from "@fastify/cors";

import { routes } from "./routes";

async function bootstrap() {
  const app = fastify();

  await app.register(cors, { origin: "*" });

  await app.register(routes, { prefix: "api/v1" });

  const url = await app.listen({ port: 7000, host: "0.0.0.0" });
  console.log(url);
}

bootstrap();
