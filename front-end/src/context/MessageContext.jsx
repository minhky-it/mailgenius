import { createContext } from 'react';
import { message } from 'antd';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (content, type = "success") => {
        messageApi.open({
            content,
            duration: 2.5,
            type,
            style: {
                marginTop: '5vh',
            }
        })
    }

    return <MessageContext.Provider
        value={{ showMessage }}
    >
        {contextHolder}
        {children}
    </MessageContext.Provider>
}