# Custom API Routes

You may define custom API Routes by putting files in the `/api` directory that export functions returning an express router or a collection of express routers.
Medusa supports adding custom API Routes using a file based approach. This means that you can add files in the `/api` directory and the files path will be used as the API Route path. For example, if you add a file called `/api/store/custom/route.ts` it will be available on the `/store/custom` API Route.

```ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  res.json({
    message: "Hello world!",
  });
}
```

## Supported HTTP methods

The file based routing supports the following HTTP methods:

- GET
- POST
- PUT
- PATCH
- DELETE
- OPTIONS
- HEAD

You can define a handler for each of these methods by exporting a function with the name of the method in the paths `route.ts` file. For example, if you want to define a handler for the `GET`, `POST`, and `PUT` methods, you can do so by exporting functions with the names `GET`, `POST`, and `PUT`:

```ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Handle GET requests
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // Handle POST requests
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  // Handle PUT requests
}
```
