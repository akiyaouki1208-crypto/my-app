import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// データベース接続の準備じゃ
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["query"] });

async function main() {
  console.log("データベースにユーザーを登録するぞ...");
  // ユーザーを 1 件追加してみる
  await prisma.user.create({
    data: { name: `ひつじの弟子 ${new Date().toLocaleTimeString()}` },
  });

  // 全ユーザーを表示してみる
  const users = await prisma.user.findMany();
  console.log("ユーザー一覧:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => Promise.all([prisma.$disconnect(), pool.end()]));
