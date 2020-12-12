const express=require("express");
const app=express();
const PORT=4000;
const path=require("path");

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
let worker = null;
if (isMainThread) {
    worker =new Worker(path.resolve(__dirname,"workerservice.js"),
    {
        workerData : {"name" : "jamie"},
        env : {
            "mysqlport" : "3306"
        }
    });
    console.log("worker.threadId ",worker.threadId);

    worker.on('message', (message)=>{
        console.log("worker message ",message)
        //worker.postMessage('Hello, world from worker!');

    });
    worker.on('error', (err)=>{
        console.log("worker error ",err)
    });
    worker.on('exit', (code) => {
        console.log(`Worker stopped with exit code ${code}`);
    });
}
else{

}



app.get("/parent",(req,res)=>{
    console.log("in /parent")

    worker.postMessage({data : "hello"})
    console.log("terminating")
    worker.terminate()
    /*
    worker.terminate().then((result)=>{
        console.log("termin ",result)
    }).catch((err)=>{
        console.log("err ",err);
    })
    */
    res.send({data : "in parent"})
})


app.get("/worker",(req,res)=>{
    console.log("in /worker")


    res.send({data : "in worker"})
})

app.listen(PORT,()=>{
    console.log("app listening on port ",PORT)
})