export default class Calculate {
  constructor(props) {
    this.auth = props.auth;
  }
  async totalGoal(data) {
    console.log("log on total goal function", data);
    if (data) {
      const goals = [];
      data.goalsData.forEach((goal) => {  
        goals.push({
          name: goal.goal,
          value: parseFloat(goal.amount)
        });
      });

      const assets = [];
      data.assets.forEach((asset) => {
        assets.push({
          name: asset.asset,
          value: parseFloat(asset.amount),
          multiplier: parseFloat(asset.assetmultiplier)
        });
      });

      const liabilities = [];
      data.liabilities.forEach((liability) => {
        liabilities.push({
          name: liability.liability,
          value: parseFloat(liability.amount),
          multiplier: parseFloat(liability.liabilitymultiplier)
        });
      });

      const monthlyRevenue = {
        value: parseFloat(data.rev.amount),
        multiplier: parseFloat(data.rev.multiplier) 
      };

      const monthlyExpense = {
        value: parseFloat(data.revexp.amount),
        multiplier: parseFloat(data.revexp.multiplier)
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${this.auth}`},
        body: JSON.stringify({
          goals: goals,
          assets: assets,
          liabilities: liabilities,
          monthlyRevenue: monthlyRevenue,
          monthlyExpense: monthlyExpense,
        }),
      };

      const response = await fetch(
        "http://137.184.16.76:81/api/user/calculator",
        requestOptions
      );
      return response.json();
    }
    return null;
  }
}
