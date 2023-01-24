import type { FastifyInstance } from "fastify";

import { prisma } from "./database/prisma";

import { HttpException } from "./errors/http-exception";

interface Params {
  userId: string;
}

export async function routes(app: FastifyInstance) {
  app.get("/:userId", async (request) => {
    const { userId } = request.params as Params;

    /* const users = await prisma.$queryRaw`
      CREATE VIEW "balances" AS
      SELECT
          DISTINCT t."userId",
          SUM(case when t."type" = 'RECIPE' AND t."status" = 'PROCESSED' then t."amount" else 0 end) as "recipe",
          SUM(case when t."type" = 'EXPENSE' AND t."status" = 'PROCESSED' then t."amount" else 0 end) as "expense",
          SUM(case when t."type" = 'RECIPE' AND t."status" = 'PROCESSED' then t."amount" else 0 end) - SUM(case when t."type" = 'EXPENSE' AND t."status" = 'PROCESSED' then t."amount" else 0 end) as "balance"
      FROM "transactions" t
      GROUP BY t."userId"
      UNION ALL (
          SELECT u.id as "userId", 0 as "recipe", 0 as "expense", 0 as "balance" FROM "users" u
          WHERE NOT EXISTS (SELECT 1 FROM "transactions" t2 WHERE t2."userId" = u.id)
      )
    `;
 */
    const balances = await prisma.balance.findMany();

    return balances;
  });
}
