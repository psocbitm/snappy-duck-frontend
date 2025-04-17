import { useDispatch, useSelector } from "react-redux";
import {
  socketEmitEvent,
  socketListenEvent,
} from "../redux/slices/socketSlice";

const useSocket = () => {
  const dispatch = useDispatch();
  const { connected, error, socketId } = useSelector((state) => state.socket);

  const emitEvent = (event, data) => {
    dispatch(socketEmitEvent(event, data));
  };

  const listenEvent = (event, callback) => {
    dispatch(socketListenEvent(event, callback));
  };

  return {
    connected,
    error,
    socketId,
    emitEvent,
    listenEvent,
  };
};

export default useSocket;
