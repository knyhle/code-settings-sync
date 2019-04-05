
"use strict";

import { File } from "./fileService";
import { LocalConfig } from "../setting";
import { ExtensionInformation } from "./pluginService";

export class UploadResponse {
  constructor(
    public uploadID: string,
    public localConfig: LocalConfig
  ) {}
}

export class DownloadResponse {
  constructor(
    public updatedFiles: File[],
    public addedExtensions: ExtensionInformation[],
    public deletedExtensions: ExtensionInformation[],
    public localConfig: LocalConfig
  ) {}
}

export interface ISyncService {
  connect(
    token: string,
    baseUrl: string
  ): Promise<boolean>;
  upload(
    allSettingFiles: File[],
    dateNow: Date,
    localConfig: LocalConfig
  ): Promise<UploadResponse>;
  download(
    localConfig: LocalConfig,
  ): Promise<DownloadResponse>;
}
