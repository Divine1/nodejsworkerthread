const { MessageChannel, receiveMessageOnPort }  
        = require('worker_threads'); 
  
// Creating and initializng the MessageChannel 
const { port1, port2 } = new MessageChannel(); 
  
// Catching the event message 
port2.on('message', (message) => console.log(message)); 
  
// Catching the event close 
port2.on('close', () => console.log('closed!')); 
  
// Sending message to port2 
// by using postMessage() method 
port1.postMessage('GFG'); 
  
// Closing port by using 
// close() method 
port1.close(); 