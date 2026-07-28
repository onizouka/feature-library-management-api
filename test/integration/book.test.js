import request from "supertest";
import app from "../../app.js";
import req from "express/lib/request.js";

describe("Book API Integration Tests", () => {
  // Test pour la création d'un nouveau livre
  it("should create a new book", async () => {
    const newBook = { title: "1984", author: "George Orwell", copies: 5 };
    const res = await request(app).post("/books").send(newBook);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id"); // Vérifie que l'ID est retourné
  });

  // Test pour récupérer tous les livres (le code doit être 200 et le retour doit être un tableau)
it("retourne tous les livres / code 200 avec []",async ()=> {
   const response = await request(app).get("/books");
   expect(response.status).toBe(200);
   expect(Array.isArray(response.body)).toBe(true);
});
  // Test pour récupérer un livre spécifique par son ID (le code doit être 200 et le titre du livre doit correspondre au résultat attendu)

    it("retourner un livre spécifique par id", async () => {
        const createResponse = await request(app)
            .post("/books")
            .send({
                title: "L'homme qui rétrécit",
                author: "Richard Matheson",
                copies: 5,
            });

        const bookId = createResponse.body.id;
        const response = await request(app).get(`/books/${bookId}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("L'homme qui rétrécit");
    });
  // Test pour récupérer un livre par un identifiant incorrect (le code doit être 404)
it("retour 404 si id incorrecte", async ()=>{
    const response = await request(app).get(`/books/5564`);
    expect(response.status).toBe(404);
})
  // Test pour mettre à jour un livre (le code doit être 200 et la propriété "updated" doit être vraie)
it("mise à jour d'un livre", async()=>{
    const createResponse = await request(app)
        .post("/books")
        .send({
            title: "Les Naufragés de Velloa",
            author: "Romain Benassaya",
            copies: 5,
        });
    const bookId = createResponse.body.id;
    const response = await request(app)
        .put(`/books/${bookId}`)
        .send({
            title: "Les Naufragés de chipouilla",
            author: "Romain Benassaya",
            copies: 10,
        })

});
  // Test pour supprimer un livre (le code doit être 200 et la propriété "deleted" doit être vraie)
    it("supprimé un livre", async()=>{
        const createResponse = await request(app)
            .post("/books")
            .send({
                title: "Le monde englouti",
                author: "J.G Ballard",
                copies: 5,
            });
        const bookId = createResponse.body.id;
        const response = await request(app)
            .delete(`/books/${bookId}`)
            .send({
                title: "Le monde englouti",
                author: "J.G Ballard",
                copies: 5,
            })
    })
});
