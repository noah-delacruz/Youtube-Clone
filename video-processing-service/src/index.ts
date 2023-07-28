import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    // Get path of input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Error handling because file paths may not always be included in the request body
    if(!inputFilePath || !outputFilePath) {
        // Error status 400 means client error (they sent the wrong parameters/request)
        res.status(400).send("Bad request: Missing file path.");
    }

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`)
})