import {Category} from "typescript-logging";

export class ProcessLoggerFactory {
    private readonly _category: Category;
    private readonly _processName: string;


    protected constructor(category: Category, processName: string) {
        this._category = category;
        this._processName = processName;
    }

    protected readonly myVariable: string = "my string";

    public getAbortMessage(): string {
        return `${this._processName} has failed, aborting function`;
    }

    public startProcess() {
        this._category.info(`Attempting to ${this._processName}`);
    }

    public errorProcess(error: Error) {
        this._category.error(`Failed to ${this._processName}`, error);
    }

    public completeProcess() {
        this._category.info(`${this._processName} complete`);
    }

    public abortFunction() {
        this._category.info(this.getAbortMessage());
    }
}
