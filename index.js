const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_KEY}@cluster0.9uu0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);
const database = client.db(`${process.env.MONGO_DB_SERVER_NAME}`);
const app = express();

(async () => {
  try {
    await client.connect();
    console.log("Успішно підключено до MongoDB");
    console.log("Перегляд користувачів на http://localhost:3000/users");
    console.log("Перегляд статей на http://localhost:3000/articles");
  } catch (error) {
    console.error("Помилка підключення до MongoDB:", error);
  }
})();

// Налаштування PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/users"));

app.use(bodyParser.json());

// Маршрут для списку користувачів
app.get("/users", async (req, res) => {
  try {
    const usersCollection = database.collection("users");
    const allUsers = await usersCollection.find().toArray();
    res.render("users", { title: "User List", users: allUsers });
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).send("Сталася помилка на сервері.");
  }
});

// Маршрут для деталей користувача
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const usersCollection = database.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      res.render("user", { title: "User Details", user });
    } else {
      res.status(404).send("Користувача не знайдено");
    }
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).send("Сталася помилка на сервері.");
  }
});


// Налаштування EJS
app.engine("ejs", require("ejs").renderFile); 
const articlesViewsPath = path.join(__dirname, "views/articles");

const articles = [
  { id: 1, title: "Перша стаття", content: "Це текст першої статті." },
  { id: 2, title: "Друга стаття", content: "Це текст другої статті." },
  { id: 3, title: "Третя стаття", content: "Це текст третьої статті." },
];

// Маршрут для списку статей
app.get("/articles", (req, res) => {
  res.render(path.join(articlesViewsPath, "articles.ejs"), { articles });
});

// Маршрут для деталей статті
app.get("/articles/:articleId", (req, res) => {
  const articleId = parseInt(req.params.articleId, 10);
  const article = articles.find((a) => a.id === articleId);

  if (article) {
    res.render(path.join(articlesViewsPath, "article.ejs"), { article });
  } else {
    res.status(404).send("Статтю не знайдено.");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
