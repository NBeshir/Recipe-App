const express = require("express");
const dbConnect = require("./config/db");

const app = express();

dbConnect();
app.use(express.json());

app.use("/api/recipes", require("./routes/api/recipes"));
app.use("/api/comments", require("./routes/api/comments"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
