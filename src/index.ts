import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { products, type Product } from './models/Product.js';

const hostName = '192.168.20.36';
const port = 3000;

const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const path = req.url;
        const route = normalizeProduct(req.method, path);

        switch (route) {
            case 'GET /':
                res.writeHead(200);
                res.end('Welcome to the Products API');
                break;

            case 'GET /products':
                res.writeHead(200);
                res.end(JSON.stringify(products));
                break;

            case 'GET /products/:id': {
                const id = getIdFromParam(path);
                const product = products.find((p) => p.id === id);
                if (product) {
                    res.writeHead(200);
                    res.end(JSON.stringify(product));
                } else {
                    res.writeHead(404);
                    res.end('Product not found');
                }
                break;
        }
    }
);

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
    const id = getIdFromParam(path);

    if (id !== null) {
        return `${method} /products/:id`;
    }

    return `${method} ${path}`;
}