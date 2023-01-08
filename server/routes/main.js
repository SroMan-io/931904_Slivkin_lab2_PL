
/*const fs = require("fs");
const __startFile = fileURLToPath( import.meta.url );
const __startFilePath = dirname( __startFile );

module.exports = function(app){
    app.get('/',(req, res) => {
        //res.end('main');
        

        let path = '\\';

        let files=fs.readdirSync(__startFilePath+path);
        res.json(files);
    })
}*/