import Assymetryc from "./typecrypto/assymetryc";
import Symetryc from "./typecrypto/symetryc";

class Crypto {
  constructor(): void;

  symetric(): Symetryc;
  assymetryc(): Assymetryc;
}

export = Crypto;