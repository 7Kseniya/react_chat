import React, {useState, useEffect} from "react";
import client, { databases, DATABASE_ID, COLLECTION_MESSAGES_ID } from "../appwriteConfig";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash } from "react-feather";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";


const Room = () => {

const {user} = useAuth()
const [messages, setMessages] = useState([])
const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        /* получение, создание и удаление сообщений 
         делаем внутри useEffect для получения исходного списка 
         из бд при монтировании компонента */
        getMessages()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_MESSAGES_ID}.documents`, response => {
            console.log('real time: ', response);
            if(response.events.includes("databases.*.collections.*.documents.*.create")) {
                setMessages(prevState => [response.info, ...prevState])
                console.log('a message was created')
            }
            if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setMessages(prevState => prevState.filter(message => message.$id !== response.info.$id))
                console.log('a message was deleted')
            }
        });
        console.log('unsubscribe', unsubscribe)

        return () => {
            unsubscribe()
        }
    }, [])

    /* отправка сообщения */
    const handleSubmit = async (e) => {
        e.preventDefault() 
        /*предотвращение отправки пустого сообщения */
        console.log('message:', messageBody)
        let info = {
            user_id:user.$id,
            user_name:user.name,
            body:messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id))
        ]
        
        /* создание нового документа в коллекции бд 
        с текущим телом сообщения */
        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_MESSAGES_ID,
            ID.unique(),
            info,
            permissions
        )
        console.log("response: ", response)
        /* очищает поле ввода после отправки сообщения */
        setMessageBody('') 
    }
    /* получение сообщений из бд, фильтрация */
    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_MESSAGES_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100)
            ]
        )
        console.log('response: ', response.documents)
        setMessages(response.documents)
    }

    const deleteMessage = async (message_id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_MESSAGES_ID, message_id)
    }

    return (
        <main className="container">
            <Header/>

            <div className="room--container">
                
                <form id="message--form" 
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}>
                    <div>
                        <textarea
                            required
                            maxLength="1000"
                            placeholder="write smth..."
                            onChange={(e) => {setMessageBody(e.target.value)}}
                            value={messageBody}>
                        </textarea>
                    </div>

                    <div className="send-btn--wrapper">
                        <input 
                            className="btn btn--secondary" 
                            type="submit" 
                            value="send"/>
                    </div>

                </form>


                <div>
                    {messages.map(message => (
                        <div key={message.$id} className="message--wrapper">
                            <div className="message--header">

                                <p>
                                    {message?.user_name ? (
                                        <span>{message?.user_name}</span>
                                    ): (
                                        <span>undefined user</span>
                                    )}

                                    <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>

                                </p>

                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                <Trash className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
                            </div>

                            <div className={"message--body " + (message.user_id === user.$id ? 'message--body--owner' : '')}>
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Room