export interface Params$CreateRoom<T = any> {
  name: string;
  numPlayers: number;
  setupData?: T;
}

export interface Params$JoinRoom {
  name: string;
  roomID: string;
  playerID: number;
  playerName: string;
}

export interface Params$LeaveRoom {
  name: string;
  roomID: string;
  playerID: number;
  credentials: string;
}

export interface Params$GetGame {
  name: string;
  gameID: string;
}

export interface Params$GetAllRoom {
  name: string;
}

export interface Params$GetRoom extends Params$GetAllRoom {
  roomID: string;
}

export interface Response$GetGame {
  roomID: string;
  players: Array<{ id: number }>;
}

export interface Response$GetAllRoom {
  rooms: Array<{
    gameID: string;
    players: Array<{ id: number }>;
  }>;
}
