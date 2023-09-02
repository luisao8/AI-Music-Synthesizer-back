const Replicate = require("replicate"); 
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 5000;
const REPLICATE_API_TOKEN = "r8_c8I70iWUM1k69Nemv4D2Lm7wDcwHl090EOcob";
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/getsongs', (req, res) => {
    console.log("before");
    let text = req.body.prompt;
    let duration = req.body.duration;
    console.log(text)
    console.log(duration) 
    

    const input = { prompt: text, duration: duration  };
    
    const fetchData = async () => {
        try {
          const output = await replicate.run("pphu/musicgen-small:65f6182bfcbc05fc05a28c78f1fbb9ddd1d8fd4ff439f4d9043d6aa8cd515dc1", { input });
          const back = {
            url: output
            };
          console.log(output)  
          res.json(back);
            
            
        

        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    let response = fetchData();
  
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
