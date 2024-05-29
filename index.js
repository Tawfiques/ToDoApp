import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import mongoose from "mongoose"
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

// Replace the following with your MongoDB deployment's connection string.
async function main() {
  await mongoose.connect(process.env.MDB_CONNECT_STRING);
}

main().catch(err => console.log(err));

const ToDoAppSchema = new mongoose.Schema({
  name: String,
  tasks: []
});

const users = mongoose.model('user', ToDoAppSchema,"users");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})