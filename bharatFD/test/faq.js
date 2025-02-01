const request = require("supertest");
const app = require("../server");

describe("FAQ API Tests", () => {
  it("should return FAQs", async () => {
    const res = await request(app).get("/api/faqs/");
    expect(res.statusCode).toEqual(200);
  });
});