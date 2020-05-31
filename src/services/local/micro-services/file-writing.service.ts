import * as fs from "fs";
import {ProcessLoggerFactory} from "../../logger/process-logger-factory.service";
import {fileService} from "../../logger/logger-config";

export class FileWritingService<T> extends ProcessLoggerFactory {
    private _directory: string = "";


    public constructor() {
        super(fileService, "write file")
    }

    public set directory(value: string) {
        this._directory = value;
    }

    public writeFileSync(fileName: string, data: T): void {
        try {
            super.startProcess();
            fs.writeFileSync(`${this._directory}/${fileName}`, data);
        } catch (e) {
            super.errorProcess(e)
        } finally {
            super.completeProcess();
        }
    }
}
