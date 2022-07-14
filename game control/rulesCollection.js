
function startGameSimple(room) {
    //add to each player score 
    room.emit("startGame");
}

function playRoundSimple(room, roundId) {
    room.emit("round", roundId)
}

function voteOtherPlayers(room) {
    room.emit("vote")
}

function calculateScore() {

}

function showScore(room,score) {
    room.emit("score",score)
}

function endGameSimple(room,score) {
    room.emit("end",score)
}

exports.startGameSimple = startGameSimple;
exports.playRoundSimple = playRoundSimple;
exports.voteOtherPlayers = voteOtherPlayers;
exports.showScore = showScore;
exports.endGameSimple = endGameSimple;