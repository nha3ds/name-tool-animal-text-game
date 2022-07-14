
class FlowController {
    constructor() {
        this.waitingTobeCalled = "";
    }

    callRule(rule, delay) {

        if (this.waitingTobeCalled != "")
        {
            clearTimeout(this.waitingTobeCalled);
        }
        
        return new Promise(resolve => {
            this.waitingTobeCalled = setTimeout(function () {
                this.waitingTobeCalled = "";
                rule();
                resolve();
            }, delay)
        });
    }

  }

module.exports = FlowController;