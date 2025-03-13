# 2D-Metaverse

Real World 2d space.

## Manual setup
### Database Setup
go to /packages/db/.env
```
DATABASE_URL="postgresql://<username>:<password>@localhost:5000/postgres"||"<your postgres connection string>"
```
go to /apps/frontend/.env
```
VITE_API="http://localhost:8000"
VITE_WS_URL="ws://localhost:8080"
```
go to /apps/http-server/.env
```
PORT="8000"
JWT_SECRET="<your secret>"
```
Starting the project:
```sh
cd 2d-metaverse
pnpm install
pnpm run dev
```
