import {Codec} from "pi-camera-connect";
import {PiCameraService} from "../../services/camera/pi-camera-service";

const testDirectory = "tests/output";
const testPhotoDirectory = "photos";
const testVideoDirectory = "videos";

// TODO: Set up test here by creating directories

test("should be able to take a picture", async () => {
    const photoName = "test.jpg";
    const piCamera = new PiCameraService(testDirectory);
    await piCamera.takePhotoWriteSync(testPhotoDirectory, photoName);
    // TODO: Check if file is created
});

test("should be able to take a video", async () => {
    const videoName = "test.h264"
    const piCamera = new PiCameraService(
        testDirectory,
        {},
        {
            codec: Codec.H264
    });
    await piCamera.takeVideo(testVideoDirectory, videoName);
    // TODO: check if file is created
})

// TODO: Tear down tests by removing the files and the directories
