/**
 * Socket Provider
 */
import React, {useEffect, useRef} from 'react';
import socketIOClient from 'socket.io-client';
import { baseUrl } from './Services/ApiList';
// import {ANDROID, IOS} from '../constants/constants';
// import {isIOS} from '../helper';

const SOCKET_DEV = baseUrl; //'https://backend.halla.sa';

export const SocketContext = React.createContext({socket: null});

/**
 * connectionConfig
 */
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],

//optional
  query: {
    source: 'auction:mobile',
    platform: 'android',
  },

};

/**
 * SocketProvider
 * @param {*} param0
 * @returns
 */
export const SocketProvider = ({children}) => {
  const env = SOCKET_DEV;
  const socket = useRef(socketIOClient(env, connectionConfig));
  console.log("🚀 ~ SocketProvider ~ socket:", socket)

  useEffect(() => {
    socket.current.on('connect', () => {});

    socket.current.on('disconnect', msg => {
      console.log('SocketIO: Disconnect', msg);
      socket.current = socketIOClient(env, connectionConfig);
    });

    return () => {
      if (socket && socket.current) {
        socket?.current?.removeAllListeners();
        socket?.current?.close();
      }
    };
  }, [env]);

  return (
    <SocketContext.Provider value={{socket: socket.current}}>
      {children}
    </SocketContext.Provider>
  );
};
