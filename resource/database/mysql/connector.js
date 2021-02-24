const Mysql = require('mysql2');
const Collection = require('./collection');
const process = require('process');

class Connector {
  constructor() {}

  getConfig() {
    return {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB
    };
  }

  createConnection(configs = { host: '', port: '', user: '', password: '', database: '' }) {
    this.client = Mysql.createConnection({
      connectTimeout: 12000,
      multipleStatements: false,
      ...configs
    });
  }

  open() {
    if ((this.client || null) == null) this.createConnection(this.getConfig());
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.client.end((err) => {
        if (err) return reject(err);
        delete this.client;
        return resolve();
      });
    });
  }

  ExecuteReader(args = { query: '', model: '' }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.client) await this.open();
        this.client.execute(args.query, async (error, data) => {
          await this.close();
          if (error) return reject(error);
          return resolve(new Collection(data, args.model.constructor));
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  ExecuteNonQuery(args = { query: '' }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.client) await this.open();
        this.client.execute(args.query, async (error, data) => {
          await this.close();
          if (error) return reject(error);
          return resolve(data.insertId);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  ExecuteNonQueryDeleteOrUpdate(args = { query: '' }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.client) await this.open();
        this.client.execute(args.query, async (error, data) => {
          await this.close();
          if (error) return reject(error);
          return resolve(data.affectedRows);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = Connector;