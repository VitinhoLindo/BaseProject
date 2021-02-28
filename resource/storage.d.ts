interface ExistsInterface {
  status: boolean;
  path: string;
}

interface WriteFile {
  path: string;
  filename?: string;
  encoding?: EncondingTypes;
  parser?: ParseContent;
  value: any;
}

interface ReadFile {
  path: string;
  filename?: string;
  encoding?: EncondingTypes;
  parser?: ParseContent;
}

interface DiskWrite {
  filename: string;
  encoding?: EncondingTypes;
  parser?: ParseContent;
  value: any;
}

interface DiskRead {
  filename: string;
  encoding?: EncondingTypes;
  parser?: ParseContent;
}

type EncondingTypes = 'utf-8';
type ParseContentType = 'write' | 'read';
type ParseContent = 'json';

class Disk {
  save(arg: DiskWrite): void;
  find(arg: DiskRead): any;
  list(): string[];
}

class Storage {
  _fs: typeof import('fs');
  _path: import('./path');

  exists(arg: string): ExistsInterface;
  is_dir(arg: string): ExistsInterface;
  is_file(arg: string): ExistsInterface;
  mkdir(path: string) : void;
  parseContent(type: ParseContentType, value: any, parser: ParseContent): any;

  static require(path: string): any;
  require(path: string): any;

  static disk(path: string, type: 'public' | 'private' | string): Disk;
  disk(path: string, type: 'public' | 'private' | string): Disk;

  get(arg: ReadFile): any;
  set(arg: WriteFile): void;
}

export = Storage;