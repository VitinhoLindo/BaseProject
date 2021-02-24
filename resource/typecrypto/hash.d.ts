import crypto from 'crypto';
import Variables from './variables'

class Hash extends Variables {
  value: any;

  constructor(value: string): void;

  createHash(): crypto.Hash;

  update(): string;
}

export = Hash;