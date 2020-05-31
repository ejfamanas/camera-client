import {ProcessLoggerFactory} from "../../logger/process-logger-factory.service";
import {cameraService} from "../../logger/logger-config";
import {FileWritingService} from "../../local/micro-services/file-writing.service";
import {StillOptions} from "pi-camera-connect";
import StillCamera from "pi-camera-connect/dist/lib/still-camera";

export class StillCameraService extends ProcessLoggerFactory {

    private _stillCameraOptions: StillOptions | undefined;

    private readonly _directory: string;
    private readonly _fileWritingService: FileWritingService<Buffer>;


    public constructor(directory: string) {
        super(cameraService, "image capture");
        this._directory = directory;
        this._fileWritingService = new FileWritingService<Buffer>();
        this._fileWritingService.directory = this._directory;
        this._stillCameraOptions = undefined;
    }

    public set stillOptions(value: StillOptions | undefined) {
        this._stillCameraOptions = value;
    }

    public async imageCaptureWriteSync(fileName?: string): Promise<void> {
        const stillCamera = new StillCamera(this._stillCameraOptions);
        const parsedFileName = fileName !== undefined ? fileName : StillCameraService.getUntitledFileName();

        let image: Buffer | null = null;
        try {
            super.startProcess();
            image = await stillCamera.takeImage();
        } catch (e) {
            super.errorProcess(e);
        } finally {
            super.completeProcess();
        }
        if (image === null) {
            super.abortFunction()
            return Promise.reject(super.getAbortMessage());
        } else {
            this._fileWritingService.writeFileSync(parsedFileName, image);
            return Promise.resolve();
        }
    }

    private static getUntitledFileName(): string {
        return "";
    }
}
