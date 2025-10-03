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
  { id: "1", name: "Web development", description: "Learn web dev", rate: 12 },
  { id: "2", name: "Mobile app", description: "Learn mobile dev", rate: 13 },
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

// POST request to add course
app.post("/course", (req, res) => {
  const { name, description, rate } = req.body; // ✅ now req.body will not be undefined

  if (!name || !description || !rate) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newCourse = {
    id: String(courses.length + 1),
    name,
    description,
    rate,
  };

  courses.push(newCourse);

  res.status(201).json({
    message: "Course added successfully",
    course: newCourse,
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
