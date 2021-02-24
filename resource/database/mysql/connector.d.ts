import { ConnectionOptions, Connection } from 'mysql2'
import Collection from './collection'
import Model from './model'

interface BaseArgument {
  query: string;
}

interface ReaderAguments extends BaseArgument {
  model: Model;
}

class Connector {
  client: Connection;
  
  getConfig(): ConnectionOptions;
  createConnection(configs: ConnectionOptions): void;
  open(): void;
  close(): void;
  ExecuteReader(arg: ReaderAguments): Collection;
  ExecuteNonQuery(arg: BaseArgument): number;
  ExecuteNonQueryDeleteOrUpdate(arg: BaseArgument): number;
}

export = Connector;