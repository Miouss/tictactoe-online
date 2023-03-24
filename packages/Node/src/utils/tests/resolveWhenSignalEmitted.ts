import { Socket } from "socket.io";
import { wait } from "@utils";

export function resolveWhenSignalEmitted(
  action: () => void,
  sockets: Socket | Socket[],
  signal: string,
  ...expectedArgs: any
) {
  return new Promise((resolve) => {
    const socketsList = Array.isArray(sockets) ? sockets : [sockets];

    const listenToSignals = socketsList.map((socket, index) =>
      listenToSignal(signal, socket, expectedArgs[index])
    );

    Promise.all(listenToSignals)
      .then(() => resolve(true))
      .catch(() => resolve(false));

    action();

    wait(1000).then(() => resolve(false));
  });
}

function listenToSignal(
  signal: string,
  socket: Socket,
  expectedArg?: any
) {
  return new Promise((resolve) => {
    socket.on(signal, async (...argsReceived) => {
      await checkArg(expectedArg, argsReceived);
      resolve(true);
    });
  });
}

function checkArg(expectedArgs: any, argReceived: any) {
  const isExpectingArg = expectedArgs !== undefined;

  if (isExpectingArg) {
    expectedArgs = Array.isArray(expectedArgs) ? expectedArgs : [expectedArgs];
    const isArgMatch = expectedArgs.every((expectedArg: any, index: number) => expectedArg === argReceived[index]);

    if (!isArgMatch) return Promise.reject(false);
  }
}
