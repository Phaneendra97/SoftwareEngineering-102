const request = require("supertest");
const app = require("../index"); 

describe("Test the Users API", () => {
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
      .set("Authorization", "JWT");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe("Test the Dept API", () => {
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

describe("Test the Course API", () => {
  test("GET /course_list_by_dept/?dept=EMGT", async () => {
    const response = await request(app)
      .get("/course_list_by_dept/?dept=EMGT")
      .send()
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBzYWRlLmNvbSIsIl9pZCI6IjY0MmVmMGI4OGU1NWJmNGUxNTA1Zjg0YSIsImlhdCI6MTY4MDc5ODgxMn0.b5jdwo3F9a-M9MN-eTy45sNPUDH_zRWTCqAmjRTPC8c"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("courseList");
  });
});

describe("Test the Reviews API", () => {
  test("GET /review/?dept=COEN&coursecode=285", async () => {
    const response = await request(app)
      .get("/review/?dept=COEN&coursecode=285")
      .send()
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBzYWRlLmNvbSIsIl9pZCI6IjY0MmVmMGI4OGU1NWJmNGUxNTA1Zjg0YSIsImlhdCI6MTY4MDc5ODgxMn0.b5jdwo3F9a-M9MN-eTy45sNPUDH_zRWTCqAmjRTPC8c"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("reviews");
  });

  test("POST /review/?dept=COEN&coursecode=285", async () => {
    const response = await request(app)
      .post("/check_review_exists/")
      .send({
        dept: "COEN",
        course: "285",
        instructor:"Rani"
      })
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBzYWRlLmNvbSIsIl9pZCI6IjY0MmVmMGI4OGU1NWJmNGUxNTA1Zjg0YSIsImlhdCI6MTY4MDc5ODgxMn0.b5jdwo3F9a-M9MN-eTy45sNPUDH_zRWTCqAmjRTPC8c"
      );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("review");
  });
});
