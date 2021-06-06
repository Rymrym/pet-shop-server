import express from'express'
import mongoose from 'mongoose'
import authRouter from './router/auth.js'
import dotenv from 'dotenv'
dotenv.config()


// test conflict
const app = express();
const PORT = process.env.PORT || 8000 

mongoose
  .connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Error", err));

app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});