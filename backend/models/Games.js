const mongoose = require("mongoose");
const { Schema } = mongoose;

const gamesSchema = new Schema({
  positions: [{ x: Number, y: Number, width: Number, height: Number }],
  image: {
    name: String,    
    data: Buffer,      
    contentType: String 
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  description: { type: String, minlength: 3 }
});

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
