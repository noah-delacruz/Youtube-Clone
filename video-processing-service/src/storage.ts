import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

// Create instance of Google Cloud Storage (GCS)
const storage = new Storage();

// Create GCS bucket names (have to be unique)
const rawVideoBucketName = "nd12898-yt-raw-videos"; // Bucket for users to upload to | App downloads from here
const processedVideoBucketName = "nd12898-yt-processed-videos"; // Bucket for us to upload processed videos to | App uploads here

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/*
 * Creates the local directories for raw and processed videos 
 */
export function setupDirectories() {

}

/*
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert to {@link processedVideoPath}
 * @returns A promise that resolves when the video has been converted
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        // Convert video file to 360p
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
            .outputOptions("-vf", "scale=-1:360")
            .on("end", () => { // Success
                console.log("Video processing finished successfully");
                resolve()
            })
            .on("error", (err) => { // Failure
                console.log(`An error occurred: ${err.message}`);
                reject(err);
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
    })
}