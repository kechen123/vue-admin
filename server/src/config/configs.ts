export default {
  inits: {
    directory: {
      run: false,
      dirs: ['public/upload', 'public/temp'],
    },
    socket: {
      run: false,
    },
  },
  port: 5000,
  StandSocketPort: 1202,
  db_dialect: 'mysql',
  DbLogClose: false,
  dbconfig: {
    db_host: '127.0.0.1',
    //db_host: '192.168.21.99',
    db_port: 3306,
    db_name: 'datav',
    db_user: 'root',
    db_pass: 'kechen0487561',
    db_char: 'utf8mb4',
    db_conn: 5,
  },
  jwt: {
    secret: 'zh-123456SFU>a4bh_$3#46d0e85W10aGMkE5xKQ',
    expires_max: 36000,
  },
  encserver: ['http://127.0.0.1:8801', 'http://192.168.0.141:8802', 'http://192.168.0.141:8803', 'http://192.168.0.141:8804'],
  uploaDir: '/upload',
  uploadMax: 10,
  servnumbers: 1,
}
