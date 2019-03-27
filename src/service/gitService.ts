
"use strict";

import { File, FileService } from './fileService';
import * as simplegit from 'simple-git/promise';
import Commons from '../commons';

export class GitService {
  public git: simplegit.SimpleGit = null;

  constructor (private workspace: string) {
    this.git = simplegit(this.workspace);
  }

  public async initialize(): Promise<void> {
    return FileService.CreateDirectory(this.workspace).then(async success => {
      if (!success) {
        return FileService.IsDirectory(this.workspace).then(isDir => {
          if (!isDir) {
            console.log("Repo already exists and is not a directory.");
            throw "Repo already exists and is not a directory.";
          }
          return !this.git.checkIsRepo && this.git.init();
        });
      } else {
        return !this.git.checkIsRepo && this.git.init();
      }
    });
  }

  public async addFile(file: File): Promise<void> {
    try {
      const path: string = this.workspace + file.fileName;
      return FileService.WriteFile(path, file.content)
        .then(success => {
          if (success) {
            console.log("Wrote to file %s. Now adding.", path);
            return this.git.add(path);
          }
        });
    } catch (e) {
      Commons.LogException(e, e.message, true);
      return null;
    }
  }
}