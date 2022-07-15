const request = require("supertest");
describe("User Test Suite", () => {
  it("test post /agencies endpoints", async () => {
    const body = {
      name: "Police Department",
      supervisor: "Jason Borne",
      phone: "000-000-0000",
      email: "jborne@email.com",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .post("/agencies")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  // POST for cases
});
