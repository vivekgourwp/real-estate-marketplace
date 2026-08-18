const prisma = require('../config/prisma');

// GET /api/properties - sab properties list karna (public)
async function getAllProperties(req, res) {
  try {
    const properties = await prisma.property.findMany({
      include: { owner: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// GET /api/properties/:id - ek property dekhna (public)
async function getPropertyById(req, res) {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: { owner: { select: { id: true, name: true } } },
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// POST /api/properties - nayi property banana (protected)
async function createProperty(req, res) {
  try {
    const { title, description, price, category, location } = req.body;

    if (!title || !description || !price || !category || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: Number(price),
        category,
        location,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        userId: req.user.id, // middleware se aaya (verifyToken ne set kiya tha)
      },
    });

    res.status(201).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


// PUT /api/properties/:id - property update karna (protected, owner-only)
async function updateProperty(req, res) {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({ where: { id: Number(id) } });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.userId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to update this property' });
    }

    const { title, description, price, category, location } = req.body;

    const updated = await prisma.property.update({
      where: { id: Number(id) },
      data: { title, description, price: Number(price), category, location },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// DELETE /api/properties/:id - property delete karna (protected, owner-only)
async function deleteProperty(req, res) {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({ where: { id: Number(id) } });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.userId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this property' });
    }

    await prisma.property.delete({ where: { id: Number(id) } });

    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty };