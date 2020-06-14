const express = require('express')
const app = express()

app.set('SECRET', 'ASKJD!#%DQN123123!@#$%')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db.js')(app)
require('./routes/admin/index.js')(app)
require('./routes/web/index.js')(app)

app.listen(3000, () => {
  console.log('server 3000 running');
})