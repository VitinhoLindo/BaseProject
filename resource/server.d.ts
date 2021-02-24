interface CallbackArguments {
  protocol: string;
  host: string;
  port: string;
}

class Server {
  static listen(callback?: (arg: CallbackArguments) => void): void;
}

export = Server;