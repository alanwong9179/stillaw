def REACT_NATIVE_VERSION = new File(['node', '--print',"JSON.parse(require('fs').readFileSync(require.resolve('react-native/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())


buildscript {
     // ...
}
    
    
allprojects {
    configurations.all {
          resolutionStrategy {
            force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
          }
    }
    // ...  
}