import {Category, CategoryConfiguration, CategoryServiceFactory, LogLevel} from "typescript-logging";

// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Warn));
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Error));
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Fatal));

export const cameraService = new Category("service");
export const fileService = new Category("service");
export const httpService = new Category("service");
