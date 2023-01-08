const express = require('express');
const app = express();
const port = 8000;
const childProcess = require('child_process');
const fs = require("fs");
let base;
let firstLaunched = true;


app.use( function( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With, content-type' );
    res.setHeader( 'Access-Control-Allow-Credentials', true);
    next();
  });


app.get( '/download', ( req, res ) => {

  try {
    const fileName = base + req.query.path;
      
    if ( !isFolder(fileName)) {
      throw new Error();      
    };

    console.log(fileName);
    res.sendFile(fileName);
  } 

  catch {
      console.log(fileName + "- the wrong way to file!");
      res.json({
        result: false
      });
  };
});


app.get('/',(req, res) => {
       
    if (firstLaunched){
      disks = getLocalDiskNames();     
      base = disks[0];
      firstLaunched = false;
    }

    let path = ''; 

    if ('path' in req.query){
        path = req.query.path;
    }

    if ('base' in req.query){
      base = req.query.base;
    }
    
    if (isFolder(base+path)){ 
       
      let files=fs.readdirSync(base+path).map(item => { 

        try{        

          isDir = fs.lstatSync(base+path+'/'+item).isDirectory(); 
          let size = 0;

          if (!isDir){
            size=fs.statSync(base+path+'/'+item) 
            console.log('File ' + item + ' detected');
          }

          else console.log('Folder ' + item + ' detected');
          
          return{
            name: item,
            dir: isDir,
            size: size.size ?? 0
          };
        }

        catch{
          console.log('Not enough rights');
        }
         
      })

      res.json({
        base: base,
        path: path,
        result: true,
        files: files,
        disks: disks
      });       
    }    
})

app.listen(port, ()=>{
  console.log('Server is successfully started!');
  console.log('Detected local disks: ' + getLocalDiskNames());
})

function getLocalDiskNames() {
  const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
  const lines = buffer.split('\r\r\n');

  const disks = [];

  for (const line of lines) {
    if(!line) {
      continue;
    }

    const lineData = line.split('=');
    disks.push(lineData[1]);
  }
  
  return disks;
}

function isFolder(path){
  return fs.lstatSync(path).isDirectory && fs.existsSync(path);
}