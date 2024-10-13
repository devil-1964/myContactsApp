const express = require("express");
const connectDB=require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
connectDB();
app.use(cors({
  origin: ["http://localhost:5173", process.env.FRONTEND_URL], 
  credentials: true, 
}));

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`I am a express project running on ${port}`);
});

