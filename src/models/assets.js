export class Assets {
    constructor(cash = 0, home = 0, investments = 0, businessValue = 0, other = 0) {
        this.cash = cash;
        this.home = home;
        this.investments = investments;
        this.businessValue = businessValue;
        this.other = other;
    }
}