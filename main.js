/*
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
  
if (isMainThread) {
    module.exports = function parseJSAsync(script) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: script
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };
} else {
    const { parse } = require('some-js-parsing-library');
    const script = workerData;
    parentPort.postMessage(parse(script));
}
*/

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

console.log("isMainThread ",isMainThread);
if (isMainThread) {
    let worker=new Worker(__filename,{
        workerData : {"name" : "jamie"},
        env : {
            "mysqlport" : "3306"
        }
    });
    
    worker.on('message', (message)=>{
        console.log("worker message ",message)
        worker.postMessage('Hello, world from worker!');

    });
    worker.on('error', (err)=>{
        console.log("worker error ",err)
    });
    worker.on('exit', (code) => {
    console.log("worker code ",code)
    if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
}
else{
    
    parentPort.postMessage({data : "hello"})
    

    parentPort.on('message', (message)=>{
        console.log("parentPort message ",message);
    });
}