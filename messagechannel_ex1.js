const { MessageChannel, receiveMessageOnPort } 
        = require('worker_threads'); 


const { port1, port2 } = new MessageChannel(); 

// Sending data to port 2 
// by using postMessage() method 
port1.postMessage({ hello: 'world1' }); 
  
// Posting data in port 1 
// by using postMessage() method 
port2.postMessage({ hello: 'world2' }); 
  
/// Display the result 
console.log("recived data in port1 : "); 
console.log(receiveMessageOnPort(port1)); 
  
console.log("recived data in port2 : "); 
console.log(receiveMessageOnPort(port2)); 


// Closing the ports 
port1.close(); 
port2.close(); 
