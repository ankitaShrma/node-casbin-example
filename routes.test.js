const app = require("./app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
jest.setTimeout(3000);
it("Gets the test endpoint", async () => {
  // Sends GET Request to /test endpoint
  const responses = await Promise.all([
    request.get("/user/abc/domain/123"),
    request.get("/user/abc/domain/456"),
    request.get("/user/xyz/domain/456"),
    request.get("/user/xyz/domain/123"),
  ]);
  expect(responses.map((r) => r.body.length)).not.toEqual(
    expect.arrayContaining([0])
  );
  // ... will contain 0 (not always but most of the time)
});
