const request = require("supertest");
const app = require("../index"); // your express app

describe("Test the API endpoints", () => {
  test("POST /auth/sign_in", async () => {
    const response = await request(app).post("/auth/sign_in").send({
      email: "pamruthurravi@scu.edu",
      password: "CXzpL64aB@XGL7sy",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
  });

  test("POST /profile", async () => {
    const response = await request(app)
      .post("/profile")
      .send()
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBzYWRlLmNvbSIsIl9pZCI6IjY0MmVmMGI4OGU1NWJmNGUxNTA1Zjg0YSIsImlhdCI6MTY4MDc5ODgxMn0.b5jdwo3F9a-M9MN-eTy45sNPUDH_zRWTCqAmjRTPC8c"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("_id");
  });

  test("POST /profile", async () => {
    const response = await request(app)
      .post("/profile")
      .send()
      .set(
        "Authorization",
        "JWT"
      );
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /dept_list", async () => {
    const response = await request(app)
      .get("/dept_list")
      .send()
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBzYWRlLmNvbSIsIl9pZCI6IjY0MmVmMGI4OGU1NWJmNGUxNTA1Zjg0YSIsImlhdCI6MTY4MDc5ODgxMn0.b5jdwo3F9a-M9MN-eTy45sNPUDH_zRWTCqAmjRTPC8c"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("deptList");
  });
});
