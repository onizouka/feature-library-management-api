import app from "./app.js";

import bookService from "./book.service.js";

// Donnée d'exemple
const sampleBook = {
  title: "La vie de Michel",
  author: "Michel",
  copies: 5,
};

// Initialisation d’un livre au démarrage
bookService.createBook(sampleBook, (err) => {
  if (err) {
    console.error(err);
  }
});

// Définir le port sur lequel le serveur écoute
const PORT = process.env.PORT ?? 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
