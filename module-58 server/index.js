// emila cse
// module-58
// nMd7sQEWE1XkP09A
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin : ['http://localhost:5173'],
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log("inside the logger");
  next()
  
}
const verfiyToken = (req, res, next) => {
  console.log("inside the vefiry toekn", req.cookies);
  const token = req?.cookies?.token;
  if(!token) {
    return res.status(401).send({message : "unathorized acces"})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) {
     return res.status(401).send({message : "unathorized acces"})

    }
    req.user = decoded;
    next()
  })
  
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m91hqjj.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const jobCollection = client.db('jobPortal').collection('jobs')
    const jobApplication = client.db('jobPortal').collection('job_applications')

    // app.get('/jobs', async(req,res) => {
    //     const result = await jobCollection.find().toArray();
    //     res.send(result)
    // })
    app.post('/jobs', async(req,res) => {
      const body = req.body;
        const result = await jobCollection.insertOne(body)
        res.send(result)
    })
app.get('/jobs', logger,  async (req, res) => {
console.log("now inside api cllback")
  const email = req.query.hr_email;
  console.log("maadarchod er email", email);

  let query = {};
  if (email) {
    query = { hr_email: email };
  }

  const result = await jobCollection.find(query).toArray();
  res.send(result);
});


    app.get('/jobs/:id', async(req,res) => {
        const id = req.params.id;
        console.log("id for sindle data in databse", id, typeof id)
        // id for sindle data in databse 69735f4f533df631821bc282 string
        const query = {_id : new ObjectId(id)}
        console.log("query", query)
        // query { _id: new ObjectId('69735f4f533df631821bc282') }
        const result = await jobCollection.findOne(query)
        res.send(result)
    })

    app.get('/job_application', verfiyToken, async(req,res) => {
      const email = req.query.email;
      // console.log("cookies ccc", req.cookies)
      // query email [Object: null prototype] {}
      const query = {applicant_email : email}
      if(req.user.email !== req.query.email) {
        return res.status(403).send({message : 'forbidden'})
      }
      console.log("query email", email)
      const result = await jobApplication.find(query).toArray()
      console.log(result)
      for(const application of result ) {
        console.log(application.job_id);
        
        const query1 = {_id : new ObjectId(application.job_id)}
        const result1 = await jobCollection.findOne(query1)
        if(result1) {
          application.title = result1.title
          application.company = result1.company
          application.company_logo = result1.company_logo
        }
      }
      res.send(result)
    })

    app.get('/job_applications/jobs/:job_id', async(req,res) => {
      const jobId = req.params.job_id;
      console.log("JOBID", jobId)
      const query = {job_id : jobId};
      console.log("job wurty", query)
      const result = await jobApplication.find(query).toArray()
      console.log("paisi", result);
      res.send(result)
      
    })

app.post('/job_applications', async (req, res) => {
  try {
    const body = req.body;
    console.log("body full data", body);
    console.log("body id only", body.job_id);
    const result = await jobApplication.insertOne(body);
    const id = body.job_id;
    const query = {_id : new ObjectId(id)};
    console.log("query", query);
    const job = await jobCollection.findOne(query)
    console.log("job", job)
    let newCount = 0;
    if(job.applicationCount) {
      newCount = job.applicationCount+1
    }else {
      newCount = 1;
    }
    const filter = {_id : new ObjectId(id)}
    const updateDoc = {
      $set : {
        applicationCount : newCount
      }
    }
    const updateResult = await  jobCollection.updateOne(filter,updateDoc)
//     body full data {
//   job_id: '69735f4f533df631821bc285',
//   applicant_email: 'tasimbillah611@gmail.com',
//   linkedin: 'http://localhost:5173/apply/69735f4f533df631821bc28b',
//   github: 'http://localhost:5173/apply/69735f4f533df631821bc28b',
//   resume: 'http://localhost:5173/apply/69735f4f533df631821bc28b'
// }
// body id only 69735f4f533df631821bc285
// query { _id: new ObjectId('69735f4f533df631821bc285') }
// job null
// job {
//   _id: new ObjectId('69735f4f533df631821bc285'),
//   title: 'Content Writer',
//   location: 'Uttara, Dhaka',
//   jobType: 'Contractual',
//   category: 'Marketing',
//   applicationDeadline: '2024-12-25',
//   salaryRange: { min: 20000, max: 35000, currency: 'bdt' },
//   description: 'We are looking for a talented Content Writer to create compelling content for our digital platforms.',
//   company: 'Munir soft.',
//   requirements: [ 'WordPress', 'SEO', 'Google Docs', 'Grammarly' ],
//   responsibilities: [
//     'Write blog posts',
//     'Create social media content',
//     'Develop email campaigns'
//   ],
//   status: 'active',
//   hr_email: 'hr@creativehub.com',
//   hr_name: 'Anika Chowdhury',
//   company_logo: 'https://i.ibb.co/MhsV6wz/microsoft.png'
// }


    res.send(result); // 201 = created
  } catch (error) {
    console.error(error);
  }
});

app.post('/jwt', async (req, res) => {
  const user = req.body;

  const token = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5h" }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false
  }).send({ success: true });
});



// app.post('/jwt', async(req, res) => {
//   const body = req.body;
//   console.log("body", body);
//   const token = jwt.sign(body, process.env.JWT_SECRET , {expiresIn : '1h'})
//   console.log("toaken", token);
//  res.cookie('token', token, {
//   httpOnly : true,
//   secure : false
//  })
//  .send({success  :true})

//   // res.json({ token: token })
  
// })

app.patch('/job-applications/:id', async(req, res) => {
  const id = req.params.id;
  console.log("patch id ", id);
  const data = req.body;
  console.log("patch data", data)
  const filter = {_id : new ObjectId(id)};
  console.log("patch filter", filter);
  const updateDoc = {
    $set : {
      status : data.status
    }
  }
    const result = await jobApplication.updateOne(filter, updateDoc)
    console.log("resuult" , result)
//     patch id  69789d161e73dffc93ff6700
// // patch data { status: 'Hired' }
// // patch filter { _id: new ObjectId('69789d161e73dffc93ff6700') }
// // resuult {
// //   acknowledged: true,
// //   modifiedCount: 1,
// //   upsertedId: null,
// //   upsertedCount: 0,
// //   matchedCount: 1
// // }
// // [nodemon] restarting due to changes...
// // [nodemon] restarting due to changes...
// // [nodemon] starting `node index.js`
// // [dotenv@17.2.3] injecting env (2) from .env -- tip: ⚙️  write to custom object with { processEnv:
// //  myObject }
// // 🚀 Server running on port 5000
// // Pinged your deployment. You successfully connected to MongoDB!
// // npm install jsonwebtoken
    res.send(result)
})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
