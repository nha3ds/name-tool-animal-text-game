
class GameOperations {
    constructor(players, allReady) {
        this.players = players;
        this.allReady = allReady;
    }

    ready(player) {
        var index = this.players.indexOf(player);
        this.players[index].ready = true;
        this.checkReadiness();
    }
    unReady(player) {
        var index = this.players.indexOf(player);
        this.players[index].ready = false;
    }

    isAllReady() {
        for (let index = 0; index < this.players.length; index++) {
            if (!this.players[index].ready)
                return false;

        }
        return true;
    }
    checkReadiness()
    {
        if (this.isAllReady())
            this.allReady();
    }
    remove(player)
    {
        var index = this.players.indexOf(player);
        this.players.splice(index,1);
        this.checkReadiness();//change name!
    }
}

module.exports = GameOperations;