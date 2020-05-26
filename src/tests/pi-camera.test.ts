import {PiCamera} from "../services/camera/pi-camera";
import {Codec} from "pi-camera-connect";

const testDirectory = "tests/output";
const testPhotoDirectory = "photos";
const testVideoDirectory = "videos";

// TODO: Set up test here by creating directories

test("should be able to take a picture", async () => {
    const photoName = "test.jpg";
    const piCamera = new PiCamera(testDirectory);
    await piCamera.takePhoto(testPhotoDirectory, photoName);
    // TODO: Check if file is created
});

test("should be able to take a video", async () => {
    const videoName = "test.h264"
    const piCamera = new PiCamera(
        testDirectory,
        {},
        {
            codec: Codec.H264
    });
    await piCamera.takeVideo(testVideoDirectory, videoName);
    // TODO: check if file is created
})

// TODO: Tear down tests by removing the files and the directories
