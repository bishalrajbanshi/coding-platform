import { rateLimiter } from "@common/rate_limiter";
import prisma from "prisma/prisma";
import express, { Application } from "express";
import routes from "@modules/routes";
const app: Application = express();

app.use(express.json());
app.use(rateLimiter);
app.use('/api/v1',routes);
const PORT = process.env.PORT || 3000;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

main();
