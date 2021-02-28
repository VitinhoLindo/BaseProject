interface Paths {
  dir: string;
  path: string;
}

interface Info {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
  /**
   * The file name including extension (if any) such as 'index.html'
   */
  base: string;
  /**
   * The file extension (if any) such as '.html'
   */
  ext: string;
  /**
   * The file name without extension (if any) such as 'index'
   */
  name: string;
}

type getPath = 'root' | 'public' | 'private'; 

class Path {
  _process : typeof import('process');
  _path    : typeof import('path');
  _paths   : Paths;

  plataformDir(): void;
  info(): Info;
  exec_dir(argv: string[]): string;
  path_dir(path: string): string;
  join_path(args: string[]): string;

  set(): void;
  get(arg: getPath): string;
}

export = Path;