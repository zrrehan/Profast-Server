const express = require('express')
const cors = require('cors');
const { ServerApiVersion } = require('mongodb');
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


app.use(cors());
app.use(express.json());

console.log(process.env)

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-ujmsrle-shard-00-00.vuskb8c.mongodb.net:27017,ac-ujmsrle-shard-00-01.vuskb8c.mongodb.net:27017,ac-ujmsrle-shard-00-02.vuskb8c.mongodb.net:27017/?ssl=true&replicaSet=atlas-9hl66u-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
        const database = client.db("ProFastDatabase");
        const delivery = database.collection("delivery");

        app.post("/send-item", async (req, res) => {
            console.log(req.body);
            const result = await delivery.insertOne(req.body);
            res.send(result);
        });
    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
