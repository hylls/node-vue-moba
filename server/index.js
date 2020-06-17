const express = require('express')
const app = express()

app.set('SECRET', 'ASKJD!#%DQN123123!@#$%')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

require('./plugins/db.js')(app)
require('./routes/admin/index.js')(app)
require('./routes/web/index.js')(app)

app.listen(3000, () => {
  console.log('server 3000 running');
})