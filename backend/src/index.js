import express, { json } from "express";

const app = express();

// Example: http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello, world! this is the backend server.");
});

// Example: http://localhost:3000/greet?name=John
app.get("/greet", (req, res) => {
  const name = req.query.name; // get "name" from URL
  res.send(`Hello, ${name || "Guest"}!`);
});

// Example: http://localhost:3000/user/1
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID = ${userId}`);
});

// Example: http://localhost:3000/data with POST method(json body)
const courses = [
  {
    id: "1",
    name: "Web development",
    description:
      "lorem as ES module because module syntax was detected. This incurs a performance overhead",
    rate: 12,
  },
  {
    id: "2",
    name: "Mobile app",
    description:
      "lorem as ES module because module syntax was detected. This incurs a performance overhead",
    rate: 13,
  },
];

// GET course by ID
app.get("/course/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
