import React, { useEffect, useState} from 'react';

import './App.css';

function App() {
  const [parent, setParent] = useState('');
  const [data, setData] = useState({
    path: "",
    files: [],
    disks: []
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
    .then(res => res.json())
    .then(
      (result) => {
        setParent('');
        setData(result);
      },
      (error) =>{

      }
    )
  }, []);

  const changeFolder = event => {

    event.preventDefault();
      
    fetch("http://localhost:8000/?path="+event.target.attributes.href.value)
    .then(res => res.json())
    .then(
      (result) => {
        let linkArr = result.path.split('/');
        console.log(linkArr);
        linkArr.pop();
        setParent(linkArr.join('/'));
        setData(result);
      },

      (error) => {
                
      }
    );
  }

  const changeDisk = event => {

    event.preventDefault();
      
    fetch("http://localhost:8000/?base="+event.target.attributes.href.value)
    .then(res => res.json())
    .then(
      (result) => {
        let linkArr = result.path.split('/');
        console.log(linkArr);
        linkArr.pop();
        setParent(linkArr.join('/'));
        setData(result);        
      },

      (error) => {
              
      }
    );
  }
      
  const downloadFile = event => {

    event.preventDefault();
    
    let pathToFile = event.target.attributes.href.value; 
    fetch("http://localhost:8000/download/?path="+pathToFile)

    .then(result => {
      result.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        let position = pathToFile.lastIndexOf('/')
        let fileName = pathToFile.slice(position+1);
        a.href = url;
        a.download = fileName;
        a.click();
      });
    });
  }

  const dirs = data.files.filter( item => item && item.dir )
  const files = data.files.filter( item => item && !item.dir )

  const hasFiles = dirs.length + files.length;

  const showFiles = hasFiles
  ? [ 
    dirs.map( item =>
      <li key={item.name} className = "Folder"> 
        <a href={data.path+'/'+item.name} onClick={changeFolder}>
          <span className="material-icons">&#xe2c7;</span>
          {item.name}
        </a>
      </li>
    ),

    files.map( item =>
      <li key={item.name} className="File">
        <a href={data.path+'/'+item.name} onClick={downloadFile}>
          <span className="material-icons">&#xe873;</span>
          {item.name}
        </a>
      </li>
    )
  ]
  : <p><b>Chosen folder is empty or you do not have enough rights to access it</b></p>

  return (
    
    <div className="file-manager">
      Local disks:

      <ul className="disk-list">
        {data.disks.map(item => {      
          if (item!=null){
            return <li key={item} className="Disk"> 
                      <a href={item} onClick={changeDisk}>               
                        {item}
                      </a>
                    </li>
          }
        })}
      </ul>

      <div className="current-level">
        Path: {data.base}{data.path === '' ? '/' : data.path}
      </div>
      
      <div>
        <a href={parent} onClick={changeFolder}>
            <span className="material-icons">&#xe5d8;</span>
            Back to parent folder
        </a>
      </div>

      <ul className="folder-list">
        {showFiles}
      </ul>
    </div>
  );
}

export default App;