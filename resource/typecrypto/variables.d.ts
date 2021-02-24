interface RsaConfiguration {
  modulusLength: number;

  // default 0x10001
  publicExponent: number,
  publicKeyEncoding: {
    type: string,
    format: string
  },
  privateKeyEncoding: {
    type: string,
    format: string,
    cipher: string,
    passphrase: string
  }
}

class Variables {
  crypto: typeof import('crypto');

  hashAlgorithm: string;
  rsa: RsaConfiguration;

  load(): void;
}

export = Variables;