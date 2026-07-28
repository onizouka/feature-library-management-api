import request from "supertest";
import app from "../../app.js";

describe("Book API Integration Tests", () => {
  // Test pour la création d'un nouveau livre
  it("should create a new book", async () => {
    const newBook = { title: "1984", author: "George Orwell", copies: 5 };
    const res = await request(app).post("/books").send(newBook);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id"); // Vérifie que l'ID est retourné
  });

  // Test pour récupérer tous les livres (le code doit être 200 et le retour doit être un tableau)

  // Test pour récupérer un livre spécifique par son ID (le code doit être 200 et le titre du livre doit correspondre au résultat attendu)

  // Test pour récupérer un livre par un identifiant incorrect (le code doit être 404)

  // Test pour mettre à jour un livre (le code doit être 200 et la propriété "updated" doit être vraie)

  // Test pour supprimer un livre (le code doit être 200 et la propriété "deleted" doit être vraie)
});
