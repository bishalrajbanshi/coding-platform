=====================setup================
npm init
npm install -D typescript
npx tsc --init
ts-node-dev (helps to run typescript without compiling)
tsconfig-paths (helps to resolve the module path)
install the packages
and ready to go

===================prisma==================
npm i prisma @prisma/client (install)
npx prisma init (initialize)
npx prisma migrate dev --name xyz (migration)

=================dev start=================
"dev": "nodemon --exec ts-node -r tsconfig-paths/register -r dotenv/config src/index.ts",
"start": "ts-node -r tsconfig-paths/register -r dotenv/config src/index.ts",
