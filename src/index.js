import express from "express";
const app = express();

app.get("/:name", (req, res) => {
  let name = req.params.name;
  res.send({ message: name, data: [] }).json();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
