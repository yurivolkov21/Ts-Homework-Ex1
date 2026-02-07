import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { getNextId, products, type Product } from './models/Product.js';

const hostName = '192.168.20.36';
const port = 3000;

const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const path = req.url;
        const route = normalizeProduct(req.method, path);

        switch (route) {
            case 'OPTIONS /':
            case 'OPTIONS /products':
            case 'OPTIONS /products/:id':
                res.writeHead(204);
                res.end();
                break;

            case 'GET /':
                res.writeHead(200);
                res.end('Welcome to the Products API');
                break;

            case 'GET /products':
                const url = new URL(req.url!, `http://${req.headers.host}`);

                const name = url.searchParams.get('name');

                const page = parseInt(url.searchParams.get('page') || '1');

                const limit = parseInt(url.searchParams.get('limit') || '5');

                let resultProducts = products;

                if (name) {
                    resultProducts = resultProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
                }

                const startIndex = (page - 1) * limit;
                const paginatedResults = resultProducts.slice(startIndex, startIndex + limit);

                res.writeHead(200);
                res.end(JSON.stringify({
                    total: resultProducts.length,
                    page,
                    limit,
                    totalPages: Math.ceil(resultProducts.length / limit),
                    data: paginatedResults
                }));
                break;

            case 'GET /products/:id':
                const getId = getIdFromParam(path);

                const product = products.find((p) => p.id === getId);

                if (product) {
                    res.writeHead(200);
                    res.end(JSON.stringify(product));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Product not found' }));
                }
                break;

            case 'POST /products':
                try {
                    const body = await parseBody(req);

                    if (typeof body.name !== 'string' || body.name.length < 5 || typeof body.price !== 'number' || body.price <= 0) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: 'Invalid product data' }));
                        return;
                    }

                    const newProduct: Product = {
                        id: getNextId(),
                        name: body.name,
                        price: body.price,
                        category: body.category,
                    };
                    products.push(newProduct);
                    res.writeHead(201);
                    res.end(JSON.stringify(newProduct));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
                break;

            case 'PUT /products/:id':
                const putId = getIdFromParam(req.url);
                try {
                    const body = await parseBody(req);

                    const product = products.find((p) => p.id === putId);

                    if (!product) {
                        res.writeHead(404);
                        res.end(JSON.stringify({ error: 'Product not found' }));
                        return;
                    }

                    if ((body.name !== undefined && (typeof body.name !== 'string' || body.name.length < 5)) ||
                        (body.price !== undefined && (typeof body.price !== 'number' || body.price <= 0))) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: 'Invalid product data' }));
                        return;
                    }

                    product.name = body.name ?? product.name;
                    product.price = body.price ?? product.price;
                    product.category = body.category ?? product.category;

                    res.writeHead(200);
                    res.end(JSON.stringify(product));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
                break;

            case 'DELETE /products/:id':
                const deleteId = getIdFromParam(req.url);

                const productIndex = products.findIndex((p) => p.id === deleteId);

                if (productIndex !== -1) {
                    products.splice(productIndex, 1);
                    res.writeHead(204);
                    res.end();
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Product not found' }));
                    return;
                }
                break;

            default:
                res.writeHead(405, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'Method Not Allowed' }));
                break;
        }
    }
);

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});

function parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (c) => {
            body += c;
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });
}

function getIdFromParam(path?: string): number | null {
    if (!path) return null;

    const parts = path.split('/');

    if (parts.length !== 3) {
        return null;
    }

    if (parts[1] !== 'products') {
        return null;
    }

    const id = Number(parts[2]);

    return Number.isFinite(id) ? id : null;
}

function normalizeProduct(method?: string, path?: string): string {
    if (!path) {
        return `${method} ${path}`;
    }

    const pathname = path.split('?')[0];

    const id = getIdFromParam(pathname);

    if (id !== null) {
        return `${method} /products/:id`;
    }

    return `${method} ${pathname}`;
}