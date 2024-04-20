rm -rf demo
mkdir demo
cd demo
tsc ../../cli.ts
node ../../cli.js ../../examples/json/example1.json 1
cd mynestapp
echo DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public" > .env
echo "version: '3'
services:   
  postgres:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db" > docker-compose.yml
docker compose up -d
node ../../../cli.js ../../../examples/json/example1.json 2
npm i @nestjs/common @nestjs/config
cd src
node ../../../../cli.js ../../../../examples/json/example1.json 3
cd ../../../