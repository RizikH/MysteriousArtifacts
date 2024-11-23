const db = require('./db-conn')

function getUserById (id) {
  let sql = `
    SELECT * from users where user_id = ?;
  `

  return db.get(sql, id)
}

function createNewUser (params) {
  let sql =
    'INSERT INTO users ("user_id","user_name","user_email", "user_img" ,"user_type") VALUES (?,?,?,?,?);'
  const info = db.run(sql, params)
  return info
}

module.exports = {
  getUserById,
  createNewUser
}
