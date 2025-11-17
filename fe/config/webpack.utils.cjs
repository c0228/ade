const Path = require('path');
const axios = require('axios');
const fs = require('fs');

function webpackLibraryAliasConfiguration(modules) {
/**
 * This Function includes the Webpack ModuleAliasNames in the Dependency Packages into the Main Application
 */
 let webpackConfigAlias = { };
 modules.forEach((module)=>{
  const webpackConfig = require( Path.resolve(__dirname+'./../node_modules/'+module+'/webpack.config.cjs') );
    Object.keys( webpackConfig.resolve.alias ).map((k)=>{
      webpackConfigAlias[k] = webpackConfig.resolve.alias[k]
    });
  });
  return webpackConfigAlias;
}

function setPackageInfo( versionType ) {
/**
 * This Function sets Package Version Dynamically by checking it with Hosted/Deployed Version and keeps updated.
 */
  const packageFile = Path.resolve(__dirname,'./../package.json');

  function setPackageVersion( packageJsonObj, version ){
    packageJsonObj.version = version;
    packageJsonObj = JSON.stringify(packageJsonObj,  null, 1);
    fs.writeFile(packageFile, packageJsonObj, (err) => {
      if (err) throw err;
    }); 
  }

  fs.readFile( packageFile , (err, data) => {
    let packageJsonObj = JSON.parse(data);
    let packageName = packageJsonObj.name;
    axios.get('https://registry.npmjs.org/'+packageName).then((response)=>{
        let npmVersionSplit = response.data['dist-tags']?.latest?.split(".");
        console.log( npmVersionSplit );
        let npmMajorVersion = parseInt(npmVersionSplit?.[0]);
        if(versionType.toUpperCase()==='MAJOR') { npmMajorVersion++; }
        let npmMinorVersion = parseInt(npmVersionSplit?.[1]);
        if(versionType.toUpperCase()==='MINOR') { npmMinorVersion++; }
        let npmPatchVersion = parseInt(npmVersionSplit?.[2]);
        if(versionType.toUpperCase()==='PATCH') { npmPatchVersion++; }
        setPackageVersion( packageJsonObj, npmMajorVersion+"."+npmMinorVersion+"."+npmPatchVersion );
    }).catch((error)=>{
      setPackageVersion( packageJsonObj, '1.0.0' );
    });
  });
}

exports.webpackLibraryAliasConfiguration = webpackLibraryAliasConfiguration;
exports.setPackageInfo = setPackageInfo;