import express from "express";

const app = express();

// mock database
const database = {
  users: [
    {
      id: "0001",
      name: "Heng Dara",
      email: "example1@gmail.com",
      age: 12,
    },
    {
      id: "0002",
      name: "Heng Visal",
      email: "sdhnskld@gmail.com",
      age: 18,
    },
    { id: "0003", name: "Kea Dara", email: "sdfghj@gmail.com", age: 22 },
  ],
};

// app.get("/", (req, res) => {
//   res.send('Hello World!');
//   res.send('Hello World! from Rathanak');
// res.json({
//     id : 1,
//     name : "Rathanak",
//     age : 24,
//     email : "example@gmail.com",
//     address : "Phnom Penh, Cambodia",
//     phone : "012345678",
//     skills : ["JavaScript", "React", "Node.js"],
// });

// res.send(`
//     <script>
//         window.location.href = "https://rathanak-phan.vercel.app/";
//     </script>
// `);
//   res.send("Wellcome to backend...");
// });

// app.get("/about", (req, res) =>{
//     res.send(`
//         <script>
//             window.location.href = "https://rathanak-phan.vercel.app/about";
//         </script>
//     `);
// });

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.query;
  console.log({ id, name, email, age });
  res.send(`User ID: ${id}, Name: ${name}, Email: ${email}, Age: ${age}`);
});

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/course", (req, res) => {
  res.send("This is course page");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
