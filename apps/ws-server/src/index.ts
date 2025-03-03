import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface player {
  id: number;
  x: number;
  y: number;
  room: string;
  initialState: number;
  key: string;
}

const players = new Map<number, player>();
//to get the info of the clients connected to the room
const clientsMessage = new Map<string, WebSocket[]>();
// const clientsGame = new Map<string,WebSocket[]>();

wss.on("connection", (socket) => {
  let myId = -1;
  let myRoom = "";
  //listen for messages from the client
  socket.on("message", (message) => {
    const parsedData = JSON.parse(message.toString());

    //this will initialize a room containing all the sockets

    //join game
    if (parsedData.type === "joingame") {
      const { id, x, y, room, initialState ,key} = parsedData.payload;
      if (clientsMessage.has(room)) {
        const clientArray = clientsMessage.get(room);
        if (clientArray && !clientArray?.includes(socket)) {
          clientsMessage.set(room, [...clientArray, socket]);
        }
      } else {
        clientsMessage.set(room, [socket]);
      }
      myRoom = room;
      myId = id;

      if (id && x && y && initialState && key) {
        players.set(id, { id, x, y, room, initialState,key});
      }

      //get only those players where the room id is same
      let playersArray: WebSocket[] | undefined = [];
      if (clientsMessage.has(room)) {
        const playerInRoom = clientsMessage.get(room);
        playersArray = playerInRoom?.filter((players) => {
          return players && players !== socket;
        });
      }
      //initializing the current player details in the map
      socket.send(
        JSON.stringify({
          type: "init",
          players: playersArray,
        }),
      );
    }

    //for updating the player location
    if (parsedData.type === "updatePlayer") {
      const { id, x, y, room, initialState, key } = parsedData.payload;
      players.set(id, { id, x, y, room, initialState,key });

      //broadcast the updated position to all other clients
      const messageData = {
        type: "updatePlayer",
        payload: {
          id,
          x,
          y,
          initialState,
          key
        },
      };
      const playerArray = clientsMessage.get(room);
      playerArray?.forEach((ws) => {
        if (ws !== socket) {
          ws.send(JSON.stringify(messageData));
        }
      });
    }

    //message
    if (parsedData.type === "message") {
      const { sender, message, room } = parsedData.payload;
      const messageData = {
        type: "message",
        payload: {
          sender,
          message,
          room,
        },
      };
      if (clientsMessage.has(room)) {
        const clientArray = clientsMessage.get(room);
        clientArray?.forEach((clients) => {
          if (
            clients &&
            clients.readyState === WebSocket.OPEN &&
            clients !== socket
          ) {
            clients.send(JSON.stringify(messageData));
          } else {
            console.log("couldnt send the message");
          }
        });
      } else {
        console.log("no room exists");
      }
    }

    //animation
    if (parsedData.type === "updateAnimation") {
      if (clientsMessage.has(parsedData.payload.room)) {
        const clientArray = clientsMessage.get(parsedData.payload.room);
        clientArray?.forEach((clients) => {
          if (
            clients &&
            clients.readyState === WebSocket.OPEN &&
            clients !== socket
          ) {
            clients.send(JSON.stringify(parsedData));
          }
        });
      }
    }
  });

  //when the client is disconnected remove it from the map
  socket.on("close", () => {
    console.log(`${myId} disconnected`);
    players.delete(myId);
    const playersInRoom = clientsMessage.get(myRoom);
    const newPlayersArray = playersInRoom?.filter((ws) => {
      return ws !== socket;
    })
    if(newPlayersArray) clientsMessage.set(myRoom,newPlayersArray);
    //removing socket instance from message memory


    // broadcasting the removal of the client
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "removePlayer",
            payload: {
              id: myId,
            },
          }),
        );
      }
    });
  });
});
