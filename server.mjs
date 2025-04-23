import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/reddit-clone";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

// Example Entity - Post Model
const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Routes
app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
});

app.get("/", (req, res) => {
    res.send("Reddit Clone Backend Running with MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
