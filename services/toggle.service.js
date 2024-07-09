class ToggleService {
    constructor() {
        this.useMongo = true;
    }

    toggleDatabase() {
        this.useMongo = !this.useMongo;
    }

    isMongo() {
        return this.useMongo;
    }
}

module.exports = new ToggleService();
