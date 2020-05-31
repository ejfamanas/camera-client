import {StillOptions, StreamCamera, StreamOptions} from "pi-camera-connect";
import fs, {WriteStream} from "fs";
import {Readable} from "stream";
import {StillCameraService} from "./micro-services/still-camera.service";

export class PiCameraService {
    private _stillCameraOptions: StillOptions | undefined;
    private _streamCamera: StreamCamera;

    private readonly _directory: string;
    private readonly _stillCameraService: StillCameraService;

    public constructor(
        directory: string = "./",
        stillCameraOptions: StillOptions | undefined = undefined,
        streamCameraOptions?: StreamOptions
    ) {
        this._directory = directory;
        this._streamCamera = new StreamCamera(streamCameraOptions);
        this._stillCameraService = new StillCameraService(this._directory);
        this._stillCameraService.stillOptions = stillCameraOptions;
    }

    public set stillCameraOptions(value: StillOptions) {
        this._stillCameraOptions = value;
    }

    public async takePhotoWriteSync(imageName?: string): Promise<void> {
        this._stillCameraService.stillOptions = this.stillCameraOptions;
        await this._stillCameraService.imageCaptureWriteSync(imageName);
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
            writeStream = fs.createWriteStream(`${this._directory}/${subDirectory}/${videoName}`);
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

