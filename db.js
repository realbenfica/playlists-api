const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL || port
const sequelize = new Sequelize(connectionString, { define: { timestamps: false } })

sequelize.sync()
  // to be an argument for previous function sync() {force:true}
  .then(() => {
    console.log('Sequelize updated database schema')
  })
  .catch(console.error)

module.exports = sequelize

// 'postgres://postgres:secret@localhost:5432/postgres'