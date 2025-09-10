import express from 'express';

const app = express();

app.get('/', (req, res) => {
//   res.send('Hello World!');
//   res.send('Hello World! from Rathanak');
    res.json({ 
        id : 1,
        name : "Rathanak",
        age : 24,
        email : "example@gmail.com",
        address : "Phnom Penh, Cambodia",
        phone : "012345678",
        skills : ["JavaScript", "React", "Node.js"],
        experience : [
            {
                company : "ABC Company",
                role : "Frontend Developer",
                duration : "2 years"
            },
            {
                company : "XYZ Company",
                role : "Backend Developer",
                duration : "1 year"
            }
        ],
    });
        
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});