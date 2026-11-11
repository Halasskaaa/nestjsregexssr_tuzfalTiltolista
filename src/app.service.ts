import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { BlockList } from 'net';
import { title } from 'process';
import { NewRuleDto } from './newRule.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'test1'
})


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getBlocklist() {
    const [results] = await mysqlConnection.execute(
      'SELECT * FROM blocklist'
    )
    const rows = results as BlockList[];
    return rows;
  }
  

  async newBlocklist(priority: number, mac: string, enabled: boolean ) {
    const [results] = await mysqlConnection.execute(
      'INSERT INTO blobklist (nev) VALUES (?)',
      [priority, mac, enabled]
    )
    const rows = results as any;
    return {
      id: rows.insertId,
      priority,
      mac,
      enabled
    } as NewRuleDto;
  }
}

