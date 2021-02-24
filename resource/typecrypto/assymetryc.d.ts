import { KeyPairSyncResult } from 'crypto';

class Assymetryc {
  constructor(): void;

  set_keys(): KeyPairSyncResult<string, string>;

  encrypt(key: string, data: string): string;
  decrypt(key: string, data: string): string;
}

export = Assymetryc;