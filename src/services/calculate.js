import { Assets } from "../models/assets";
import { Dream } from "../models/dream";
import { Liabilities } from "../models/liabilities";

export default class Calculate {

    async totalGoal(data){ 
        console.log(data, "log on total goal function"); 
        if(data.goalsData){
            const dreamModel = new Dream(
                0,
                data.goalsData.filter((goalData) => goalData.goal === "savings")[0]?.amount, 
                data.goalsData.filter((goalData) => goalData.goal === "car")[0]?.amount, 
                data.goalsData.filter((goalData) => goalData.goal === "amount")[0]?.amount, 
            );
            const assetModel = new Assets(
                0,
                data.assets.filter((assetData) => assetData.asset === "home")[0]?.amount * data.assets.filter((assetData) => assetData.asset === "home")[0]?.assetmultiplier, 
                data.assets.filter((assetData) => assetData.asset === "investment")[0]?.amount * data.assets.filter((assetData) => assetData.asset === "investment")[0]?.assetmultiplier, 
                data.assets.filter((assetData) => assetData.asset === "business")[0]?.amount * data.assets.filter((assetData) => assetData.asset === "business")[0]?.assetmultiplier, 
                0
            );
            
            const liabilityModel = new Liabilities(
                data.liabilities.filter((liabilityData) => liabilityData.liability === "mortgage")[0]?.amount * data.liabilities.filter((liabilityData) => liabilityData.liability === "mortgage")[0]?.liabilitymultiplier, 
                data.liabilities.filter((liabilityData) => liabilityData.liability === "creditcard")[0]?.amount * data.liabilities.filter((liabilityData) => liabilityData.liability === "creditcard")[0]?.liabilitymultiplier, 
                data.liabilities.filter((liabilityData) => liabilityData.liability === "studentdebt")[0]?.amount * data.liabilities.filter((liabilityData) => liabilityData.liability === "studentdebt")[0]?.liabilitymultiplier,                 
            );
            
            console.log(assetModel);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({    
                    "dream": dreamModel,
                    "assets": assetModel,
                    "liabilities": liabilityModel,
                    "monthlyRevenue": 220000,
                    "monthlyExpense": 45000
                })
            };
    
            const response = await fetch('http://localhost:5000/api/calculator', requestOptions); 
            return response.json();
        }
        return null;
        
    }

}