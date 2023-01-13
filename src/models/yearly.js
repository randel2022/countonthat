import { Assets } from "./assets.js";
import { Dream } from "./dream.js";
import { Liabilities } from "./liabilities.js";

export class YearlyValue {
    constructor(assets = new Assets(), liabilities = new Liabilities(), monthlyRevenue = 0, monthlyExpense = 0, financiallyTowardsDream = 0) {
        this.assets = assets;
        this.liabilities = liabilities;
        this.monthlyRevenue = monthlyRevenue;
        this.monthlyExpense = monthlyExpense;

        this.monthlyNet = this.monthlyRevenue - this.monthlyExpense;
        this.annualNet = this.monthlyNet * 12;

        this.netWorth = this.assets.totalAssets + this.annualNet;

        this.financiallyTowardsDream = financiallyTowardsDream;
    }
}