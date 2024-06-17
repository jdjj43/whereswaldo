const express = require("express");
const router = express.Router();
const Games = require("../models/Games"); // Asumiendo que Games es tu modelo de Mongoose
const multer = require("multer");
const mongoose = require("mongoose");
const sharp = require("sharp");

const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "Error de conexión:"));
conn.once("open", function () {
  console.log("Conectado a MongoDB");
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/upload", (req, res) => {
  res.json({
    message: "¡Funciona correctamente!",
  });
});

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se ha proporcionado ningún archivo.");
  }

  const thumbnailBuffer = await sharp(req.file.buffer)
    .resize(1280, 720)
    .toBuffer();

  const { positions, description } = req.body;

  const newGame = new Games({
    positions: JSON.parse(positions),
    image: {
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    thumbnail: {
      data: thumbnailBuffer,
      contentType: req.file.mimetype,
    },
    description,
  });

  await newGame
    .save()
    .then((game) => {
      res.status(200).json({
        message: "Succesful upload!",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/game/:id/", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.json({ success: false, error: "Game not found. Invalid Id" });
  }
  await Games.findById(req.params.id)
    .then((game) => {
      if (game) {
        return res.json({ success: true, game });
      } else {
        return res.json({ success: false, error: "Game not found." });
      }
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
      });
    });
});

router.get("/games/", async (req, res) => {
  await Games.find({}, "positions description")
    .then((games) => {
      if (games) {
        return res.json({
          success: true,
          games,
        });
      } else {
        return res.json({ success: false, error: "Games not found." });
      }
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
      });
    });
});

router.get("/game/:id/thumbnail", async (req, res) => {
  // try {
  //   const game = await Games.findById(req.params.id, "thumbnail");
  //   if (!game) return res.status(404).send('Thumbnail not found');
  //   res.set('Content-Type', game.thumbnail.type);
  //   res.send(game.thumbnail.data);
  // } catch (error) {
  //   return res.json({
  //     error: error,
  //   });
  // }
  await Games.findById(req.params.id, "thumbnail")
    .then((game) => {
      if (!game) return res.status(404).send("Thumbnail not found");
      res.set("Content-Type", game.thumbnail.type);
      res.send(game.thumbnail.data);
    })
    .catch((error) => {
      return res.json({
        error: error.message,
      });
    });
});

router.get("/game/:id/image", async (req, res) => {
  await Games.findById(req.params.id, "image")
    .then((game) => {
      if (!game) return res.status(404).send("Image not found");
      res.set("Content-Type", game.image.type);
      res.send(game.image.data);
    })
    .catch((error) => {
      return res.json({
        error: error.message,
      });
    });
});

module.exports = router;
