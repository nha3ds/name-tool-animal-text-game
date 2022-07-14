var FlowController = require('./rulesFlowController');
var FlowOperations = require('./gameFlowOperations');

class Game{
    constructor()
    {
        // this.players;//include score,answers,styles
        // this.room;
        // this.score;
         this.operations = new FlowOperations();
         this.flowController = new FlowController();
         this.rules;
    }

    //on leave/dc
    //operations.remove(player)
    run()
    {
        //this.operations.
        this.rules.start();
        this.callRule("vote");
        //after time
    }

    callRule(rule)
    {
        this.flowController.callRule(this.rules[rule].call,this.rules[rule].delay);
    }
}

module.exports = Game; 