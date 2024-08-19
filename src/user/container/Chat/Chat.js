import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {

    const [res, setRes] = useState('')
    const [msg, setMsg] = useState('')
    const [allMsg, setAllMsg] = useState([]);
    const [group, setGroup] = useState('');

    const socket = useMemo(() => io('http://localhost:8081'), [])

    useEffect(() => {
        socket.on('connect', () => { console.log('Connect Client', socket.id) });

        socket.on('welcome', (msg) => { console.log(msg); })

        socket.on('greeting', (msg) => { console.log(msg); })

        socket.on('res-msg', (msg) => setAllMsg((per) => [...per, msg]))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit('message', {
            receiver: res,
            message: msg
        })
    }
    const handleGroup = (e) => {
        e.preventDefault()
        socket.emit('group-message', group)
    }

    return (
        <div>
            {/* Single Page Header start */}

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>

            {
                allMsg.map((v) => (
                    <p>{v}</p>
                ))
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='receiver'
                    placeholder='Reciver'
                    onChange={(e) => setRes(e.target.value)}

                />

                <input
                    type="text"
                    name="message"
                    placeholder='Name'
                    onChange={(e) => setMsg(e.target.value)}
                />

                <input type='submit' />
            </form>

            <form onSubmit={handleGroup}>
                <input
                    type="text"
                    name='receiver'
                    placeholder='Reciver'
                    onChange={(e) => setGroup(e.target.value)}

                />

                <input type='submit' />
            </form>
        </div>
    );
}

export default Chat;    