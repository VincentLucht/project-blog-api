import express from 'express'
const app = express();

app.get("/", (req, res) => {
  res.json({ test: "hello" });
})

app.listen(3000, () => {
  console.log('Listening on Port 3000');
})