const request = require("supertest");
describe("User Test Suite", () => {
  it("test get /:agencies endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).get("/agencies/62ca126f58b7be242b7bc42e");
    expect(response.body).toEqual({
      _id: "62ca126f58b7be242b7bc42e",
      name: "Smith County Sheriff’s Department",
      supervisor: "David Turner",
      phone: "903-590-2696",
      email: "dturner@smith-county.com",
      __v: 0,
      "'supervisorRank": "Civillian Investigator",
    });
    expect(response.statusCode).toBe(200);
  });

  it("test get /:scores endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).get("/scores/62d1911e82ab6c6964d9bda5");
    expect(response.body).toEqual({
      _id: "62d1911e82ab6c6964d9bda5",
      username: "chsmoses@gmail.com",
      score: 23,
      __v: 0,
    });
    expect(response.statusCode).toBe(200);
  });

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

  it("test put /:agencies endpoints", async () => {
    const body = {
      _id: "62d25ffdb3a026982efec1f7",
      name: "Police Department",
      supervisor: "John Borne",
      phone: "111-000-0000",
      email: "jborne@email.com",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .put("/agencies/62d25ffdb3a026982efec1f7")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test post /cases endpoints", async () => {
    const body = {
      caseName: "Unidentified John Doe",
      caseType: "Unidentified Person",
      victimPicture: "Unavailable",
      victimName: "Unknown",
      victimAge: "22-40",
      caseDate: "13 August 1984",
      location: "Rexburg, Idaho",
      caseStatus: "unsolved",
      websiteURL: "www.fakeURL.com",
      agencyInformation: "1324567543287nb67h89kl",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .post("/agencies")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test put /:cases endpoints", async () => {
    const body = {
      _id: "62cc38c3c4e0a606952e9ac5",
      caseName: "Bayonne Jane Doe",
      caseType: "Suspected Homicide",
      victimPicture: "unavailable",
      victimName: "unknown",
      victimAge: "20",
      caseDate: "2007-10-18T00:00:00.000+00:00",
      location: "Bayonne, New Jersey",
      caseStatus: "unsolved",
      websiteURL: "https://dnadoeproject.org/case/bayonne-jane-doe-2007/",
      agencyInformation: "62ca1c9858b7be242b7bc44c",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .put("/agencies/62cc38c3c4e0a606952e9ac5")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test post /scores endpoints", async () => {
    const body = {
      score: "829",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .post("/scores")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test post /users endpoints", async () => {
    const body = {
      name: "Jason Borne",
      email: "JBorne@email.com",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .post("/users")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test put /users endpoints", async () => {
    const body = {
      _id: "62d1ef005f6519bd6ce8f304",
      name: "Jason Borne",
      email: "JBorne@email.com",
    };
    const response = await request("https://fp-matching-game.herokuapp.com")
      .put("/users/62d1ef005f6519bd6ce8f304")
      .send(body);
    expect(response.statusCode).toBe(302);
  });

  it("test delete /:id endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).delete("/scores/62cd54f5f7bde0bcf0dcd79f");
    expect(response.statusCode).toBe(302);
  });

  it("test delete /:id endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).delete("/users/62d1ef005f6519bd6ce8f304");
    expect(response.statusCode).toBe(302);
  });

  it("test delete /:id endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).delete("/agencies/776fghfjguy8888");
    expect(response.statusCode).toBe(302);
  });

  it("test delete /:id endpoints", async () => {
    const response = await request(
      "https://fp-matching-game.herokuapp.com"
    ).delete("/cases/7h90987766bjjjjkk");
    expect(response.statusCode).toBe(302);
  });
});
