import express from "express";

const app = express();

app.get("/", (req, res) => {
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
    res.send("Wellcome to backend");
});

// app.get("/about", (req, res) =>{
//     res.send(`
//         <script>
//             window.location.href = "https://rathanak-phan.vercel.app/about";
//         </script>
//     `);
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
