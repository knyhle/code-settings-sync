
"use strict";

import * as simplegit from 'simple-git/promise';

export class GitService {
  public git: simplegit.SimpleGit = null;

  constructor (workspace: string) {
    this.git = simplegit(workspace);
  }

  public initialize(): Promise<void> {
    return this.git.init();
  }
}