import {StillCamera, StillOptions, StreamCamera, StreamOptions} from "pi-camera-connect";
import fs, {WriteStream} from "fs";
import {Readable} from "stream";

export class PiCamera {
    private _stillCamera: StillCamera;
    private _streamCamera: StreamCamera;
    private readonly _parentDirectory: string;

    public constructor(parentDirectory: string, stillCameraOptions?: StillOptions, streamCameraOptions?: StreamOptions) {
        this._parentDirectory = parentDirectory;
        this._stillCamera = new StillCamera(stillCameraOptions);
        this._streamCamera = new StreamCamera(streamCameraOptions);
    }

    public async takePhoto(subDirectory: string, imageName: string): Promise<void> {
        let image: Buffer | null = null;
        try {
            image = await this._stillCamera.takeImage();
        } catch (e) {
            console.log("Failed to capture image", e);
        }
        if (image === null) {
            return Promise.reject("Image not captured, aborting takePhoto function");
        }
        try {
            fs.writeFileSync(`${this._parentDirectory}/${subDirectory}/${imageName}`, image);
        } catch (e) {
            console.log("Failed to write image", e);
        }
    }

    public async takeVideo(subDirectory: string, videoName: string, captureLength = 5000): Promise<void> {
        let videoStream: Readable | null = null;
        let writeStream: WriteStream | null = null;
        try {
            videoStream = this._streamCamera.createStream();
        } catch (e) {
            console.log("Failed to create video stream", e);
        }
        if (videoStream === null) {
            return Promise.reject("Video stream not created, aborting takeVideo function");
        }
        try {
            writeStream = fs.createWriteStream(`${this._parentDirectory}/${subDirectory}/${videoName}`);
        } catch (e) {
            console.log("Failed to create write stream", e);
        }
        if (writeStream === null) {
            return Promise.reject("Write stream not created, aborting takeVideo function");
        }
        videoStream.pipe(writeStream);
        try {
            await this._streamCamera.startCapture();
        } catch (e) {
            return Promise.reject(`Failed to start video capture ${e}`);
        }
        await new Promise(resolve => setTimeout(() => resolve(), captureLength));
        try {
            await this._streamCamera.stopCapture();
        } catch (e) {
            return Promise.reject(`Failed to stop video capture ${e}`);
        }
    }
}

