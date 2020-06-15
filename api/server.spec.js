const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("should set testing env", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("server is running", () => {
  it("should return status 200", () => {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("getting users ", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/users")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("succesfull jokes ", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/jokes")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
