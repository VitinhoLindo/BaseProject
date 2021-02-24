interface Paths {
  dir: string;
  path: string;
}

type getPath = 'root' | 'public' | 'private'; 

class Path {
  _process : typeof import('process');
  _path    : typeof import('path');
  _paths   : Paths;

  plataformDir(): void;
  exec_dir(argv: string[]): string;
  path_dir(path: string): string;
  join_path(args: string[]): string;

  set(): void;
  get(arg: getPath): string;
}

export = Path;