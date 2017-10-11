var mysql = require('mysql')
// import mysql from 'mysql'为什么import会报错

var co = _conn()

function _conn () {
  let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Tigris',
    database: 'keepaccounts'
  })

  connection.connect()
  return connection
}

export const selectByUsername = (params) => {
  return new Promise(function (resolve, reject) {
    let sql = 'select * from account_users where username = ?'
    let sqlParams = [params.username]
    co.query(sql, sqlParams, function (err, result) {
      if (err) {
        return console.log(err.message)
      }
      console.log('======开始查询======')
      console.log(result)
      console.log('======查询结束======')
      resolve(result)
    })
  }).then(function (value) {
    return value
  })
}

// selectByUsername({username: 'Meso1', password: '123456'})

