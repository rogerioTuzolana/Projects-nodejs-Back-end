//import App from './index'
const app = require('./index')
const port = process.env.port || 8080;

app.listen(port,()=>{
    console.log('Server listenig on port',port);
})