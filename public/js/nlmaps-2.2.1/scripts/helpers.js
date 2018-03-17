const conf = require('./conf.json');
const ArgumentParser = require('argparse').ArgumentParser;

//console.log('what are the argvars?')
//console.log(process.argv)
const parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});
parser.addArgument(
  [ '-w', '--watch' ],
  {
    action: 'storeTrue',
    defaultValue: false,
    help: 'start rollup in watch mode (only used for build script).'
  }
);
parser.addArgument(
  ['-p', '--packages'],
  {
    help: 'the packages to build as a comma-separated list: -p leaflet,openlayers,nlmaps'
  }
);

const args = parser.parseArgs();

function determineTaskList(packages) {
  if ( packages === null ) {
    return conf.packages; 
  } else if (typeof packages === 'string'){
    return packages.split(',')
  } else {
    throw 'problem reading list of packages. It is neither empty nor a comma-separated list.'
  }
}

function isRegisteredTask(arg) {
  const flag = conf.packages.includes(arg);
  if (!flag) {
    console.log('WARNING: a package name (' + arg +') was provided which is not specified in scripts/conf.json. Ignoring it.')
  }
  return flag;
}

function packagePath(name){
  if (name === 'nlmaps') {
    return 'nlmaps';
  }
  return 'nlmaps-' + name;
}

//the main function: creates a list of packages to operate on,
//using all registered packages unless the user provides a list.
function tasks(){
  let tasks = determineTaskList(args.packages).filter(isRegisteredTask);
  return tasks;
}

module.exports = {
  packagePath: packagePath,
  isRegisteredTask: isRegisteredTask,
  tasks: tasks,
  args: args
}
