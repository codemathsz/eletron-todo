const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const multer  = require('multer');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();
const app = express()
const port = 3000
const upload = multer();
app.use(cors())
app.use(express.json());

app.get('/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.send(customers);
  } catch (error) {
    res.json({ error: error});
  }
})

app.post('/customer', async (req, res) => {

  try {
    const { name, address, zipcode, phone } = req.body;
    await prisma.customer.create({
      data:{
        name: name,
        address: address,
        zipcode: zipcode,
        phone: phone
      }
    })
    res.json({ message: 'Customer created successfully' });
  } catch (error) {
    res.json({ error: error});
  }
})

app.delete('/customer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.customer.delete({
      where: {
        id: id
      }
    })
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.json({ error: error});
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send(products);
  } catch (error) {
    res.json({ error: error});
  }
})

app.post('/product',upload.single('img'), async (req, res) => {
  const img = req.file; // Aqui está o seu arquivo
  const { name, price } = req.body;
  let data;
  try {
    const response = await prisma.product.create({
      data:{
        name: name,
        price: price,
        img: ''
      }
    })
    const productId = response.id
    console.log(productId);
    const productFolderPath = path.join(__dirname,'../main/uploads', String(productId));
    await fs.mkdir(productFolderPath, { recursive: true });
    const imagePath = path.join(productFolderPath, 'imagem.png');
    await fs.writeFile(imagePath, img.buffer);
    // Atualizar o produto com o caminho da imagem
    data = await prisma.product.update({
      where: { id: productId },
      data: {
        img: imagePath,
      },
    });
    res.status(200).json({ product: data, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.product.delete({
      where: {
        id: id
      }
    })
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.json({ error: error});
  }
})

app.listen(port, () =>{
  console.log("started server on port ", port);
})
