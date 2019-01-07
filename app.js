const express = require('express')
const initMongodb = require('./model/db')
const chatModel = require('./model/chat')
const app = express()

const server = app.listen(3001, async () => {
    console.log('Server is running on 3001.');

    // Init db
    await initMongodb();
})

const io = require('socket.io')(server)

// listen connection
io.on('connection', (socket) => {
    function getAllMsgList() {
        chatModel.find()
            .then((data) => {
                io.emit('msgList', { msgList: data });
            })
            .catch(err => {
                throw err;
            });
    }
    
    // Global emit message list
    socket.on('msgList', getAllMsgList);

    // Create new user
    // socket.on('login', async (username = '') => {
    //     try{
    //         // Create new user
    //         const user = await chatModel.create({ 
    //             username: username !== '' ? username : 'Anonymous',
    //         });
    //         io.emit('user', user);            
    //     } catch(err) {
    //         throw err;
    //     }
    // });
    
    // Update user's message
    socket.on('message', async (data) => {
        try {
            await chatModel.create(data);
            getAllMsgList();
        } catch(err) {
            throw err;
        }
    });

    // Clear all chat history
    socket.on('clear', async () => {
        try{
            await chatModel.deleteMany();
        } catch(err) {
            throw err;
        }
    })
})