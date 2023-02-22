import { io } from "./server";
import ip from "ip";
import jsonfile from "jsonfile";

interface Player {
  name: string;
  id: string;
}

export function handleLobby() {
  io.on("connection", (socket) => {
    socket.on("createLobby", createLobby);
    socket.on("joinLobby", joinLobby);
  });
}
async function createLobby(player: Player) {
  try {
    await getLobbyFile(player.id);
    io.to(player.id).emit("lobbyAlreadyExists");
  } catch (e) {
    console.log("Lobby not found, creating new lobby");
    await createLobbyFile(player);
    io.to(player.id).emit("lobbyCreated", player);
  }
}

async function joinLobby(player: Player, lobbyId: string) {
  try {
    const players = await getLobbyFile(lobbyId);

    if (getPlayerBy("id", player.id, players))
      return io.to(player.id).emit("playerAlreadyJoined");
    if (getPlayerBy("name", player.name, players))
      return io.to(player.id).emit("playerNameTaken");

    players.push(player);

    updateLobbyFile(`./src/lobbies/${lobbyId}.json`, players);

    players.forEach((player: Player) => {
      io.to(player.id).emit("playerJoined", players);
    });

  } catch (e) {
    console.log(e);
  }
}

function getPlayerBy(key: "id" | "name", value: String, players: Player[]) {
  return players.find((player) => player[key] === value);
}

async function createLobbyFile(player: Player) {
  await jsonfile.writeFile(
    `./src/lobbies/${player.id}.json`,
    [
      {
        name: player.name,
        id: player.id,
        ip: ip.address(),
      },
    ],
    { flag: "w" }
  );
}

async function updateLobbyFile(path: string, data: any) {
  await jsonfile.writeFile(path, data, {
    flag: "w",
  });
}

async function getLobbyFile(lobbyId: string) {
  return await jsonfile.readFile(`./src/lobbies/${lobbyId}.json`);
}
