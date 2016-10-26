exports.Client = {
    HANDSHAKE:1,
    LOGIN:2,
    LOG:3,
    HELLO:4,
};

exports.Server = {
    HANDSHAKE_RESPONSE:1,
    LOGIN_RESPONSE:2,
};

exports.Status = {
    KO:-1,
    OK:1,
}

exports.Server = {
    DAEMON:1,
    CONNECTION:2,
    CHAT:3,
    GAME:4,
    LOG:4,
    MATCHMAKING:5,
    MONITOR:6,
}
