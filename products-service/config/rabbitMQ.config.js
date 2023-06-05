const amqp = require('amqplib');


let channel;
const connectToChannel = async ()=>{
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        return await connection.createChannel();
        
    } catch (error) {
        console.log("can not connect to server");
    }
}

const returnChannel = async ()=>{
    if(!channel){
        channel = await connectToChannel()
    }
    return channel;
}

const pushToQueue = async (queueName , data)=>{
    try {
        await returnChannel()
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName , Buffer.from(JSON.stringify(data))) 
    } catch (error) {
        
    }
}
const createQueue = async (queueName)=>{
    let maChannel = await returnChannel();
    await maChannel.assertQueue(queueName);
    return maChannel;
}

module.exports ={
    pushToQueue,
    returnChannel,
    connectToChannel,
    createQueue
}