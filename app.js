require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');

//Set port for production or development
const PORT = process.env.PORT || 5000;
//instantiate app and configure middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/test', (req, res) => {
  res.send("This will appear if the server works")
});

//multer processes the blob data send from the client.  The blob data is stored on req.file.
//multer is configured to handle a single file upload.
const upload = multer();
//Input is a blob of the user's .png file.  The buffer of that file is used to create a cid.  The cid is returned to the client.
app.post('/createimagecid', upload.single('blob'), async (req, res) => {
  console.log('cid route has been called')

  //Extract the buffer from the user's .png file.
  let imageBuffer = req.file.buffer;
  //Send the buffer to be pinned on IPFS using nft.storage
  let cid = await axios.post('https://nft.storage/api/upload', imageBuffer, {
    headers: {
        'Authorization': `Bearer ${process.env.NFT_STORAGE_API_KEY}`
    }
  });
  //Return the content identifier to the client
  res.send(cid.data.value.cid);
});

app.post('/createmetadatacid', async (req, res) => {
  let metadataCid = await axios.post('https://nft.storage/api/upload', req.body, {
    headers: {
        'Authorization': `Bearer ${process.env.NFT_STORAGE_API_KEY}`
    }
  });
  //Return the metadataCid to the client
  res.send(metadataCid.data.value.cid);
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
