const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store products
let products = [];
let nextId = 1; // Auto-increment ID

// Route: Add a new product
app.post('/products', (req, res) => {
    const { name, price, category, stock } = req.body;

    if (!name || price == null || !category || stock == null) {
        return res.status(400).json({ error: 'All fields are required: name, price, category, stock' });
    }

    const newProduct = {
        id: nextId++,
        name,
        price,
        category,
        stock
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Route: Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Route: Update a product by ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const { name, price, category, stock } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    res.json(product);
});

// Route: Delete a product by ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const deletedProduct = products.splice(index, 1)[0];
    res.json({ message: 'Product deleted', product: deletedProduct });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Inventory API server running on http://localhost:${PORT}`);
});
