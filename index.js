import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import { MongoClient } from "mongodb"
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

// Replace the following with your MongoDB deployment's connection string.
const uri =`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@cluster0.vvddxsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri);
const dbName = 'todoapp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const tasks = db.collection('tasks');

  // the following code examples can be pasted here...
  const query = { name: 'Tawfique' };
  const results = await tasks.findOne();
  console.log(results);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})