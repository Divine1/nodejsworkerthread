
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');


parentPort.on('message', (message)=>{
    console.log("parentPort message ",message);
    console.log("workerData ",workerData)
    console.log("process.env ",process.env)
    /*
        parentPort message  { data: 'hello' }
        workerData  { name: 'jamie' }
        process.env  { mysqlport: '3306' }

    */
   parentPort.postMessage({data : "from workerthread"})
});


console.log("workerservice called");
