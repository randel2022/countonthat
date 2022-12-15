import { useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";


import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Modal,
  Steps,
  Tabs,
  Theme,
  Toggle
} from "react-daisyui";

function Calculate() {

  const [selectedTab, setselectedTab] = useState(0);
  const [goalData, setgoalData] = useState({});
 
  const liStyle = (curIdx)=> {
    return curIdx === selectedTab ? "step step-primary" : "step";
  }

  
  console.log(goalData); 
  return (
    <div className="flex-col h-auto w-full flex justify-center items-center gap-12 py-5 md:py-52 ">
      <ul className="steps steps-horizontal lg:steps-horizontal">
        <li className={liStyle(0)}>Personal</li>
        <li className={liStyle(1)}>Assets</li>
        <li className={liStyle(2)}>Liabilities</li>
        <li className={liStyle(3)}>Result</li>
      </ul>

      <div className="flex flex-wrap flex-col justify-center items-center px:10 md:px-24 gap-3">
        <h2 className="text-3xl md:text-6xl text-center">
          Take the first step to<br></br>achieving your dreams.
        </h2>
        <p className="text-center">
          Achieving your dreams is a process that starts with taking the first
          step. Understanding your goal and outlining the steps to get there are
          crucial to becoming successful. DreamWalk is guided by the philosophy
          of getting into a business mindset. You tell us your dreams, then we
          quantify them and
        </p>
        <button className="py-3 px-3 rounded-3xl bg-[#A0161B] text-white">
          Calculate Your Dream
        </button>
      </div>


      {
        selectedTab === 0 ?
          <PersonalForm
            setData={(value)=> {
              if(value.firstName && value.lastName && value.age && value.goal && value.amount ){
                /// if all values have data then go to next Tabs
                setselectedTab(selectedTab + 1);
                setgoalData({...value})
              }
            }}
          ></PersonalForm>
        : selectedTab === 1 ? 
            <AssetsForm
            setData={(value)=> {
              if(value.assetName && value.assetAmount ){
                /// if all values have data then go to next Tabs
                setselectedTab(selectedTab + 1); 
                setgoalData(previousGoalData => ({
                  ...previousGoalData,
                  ...value
                }));
              }
            }}
            ></AssetsForm>
        : selectedTab === 2 ? 
        <LiabilitiesForm
          setData={(value)=> {
            if(value.liabilityName && value.liabilityAmount  ){
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1); 
              setgoalData(previousGoalData => ({
                ...previousGoalData,
                ...value
              }));
            }
          }}
        ></LiabilitiesForm>
        : selectedTab === 3 ? 
            <Output
              goalData={goalData}
            ></Output>
        : <></> 
      }
    </div>
  );
}

export default Calculate;

function PersonalForm({ setData }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [goal, setGoal] = useState();
  const [amount, setAmount] = useState();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      firstName: firstName, lastName: lastName, age: age, goal: goal, amount: amount
    });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400 gap-10 flex flex-col"
    >
      <div className="flex w-full gap-5">
      <label>First Name:</label>
      <br />
      <input
        name="firstName"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last Name:</label>
      <br />
      <input
        name="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>Age:</label>
      <br />
      <input
        name="age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      </div>

      <div className="flex justify-between w-full gap-10">
      <label>Goal:</label>
      <br />
      <select className="w-full"value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <label>Amount:</label>
      <br />
      <input
        name="amount"
        type="number"
        className="w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      </div>
      

      <input type="submit" className="py-3 px-12 rounded-3xl bg-[#A0161B] text-white" value="Calculate" />
    </form>
  );
}

function AssetsForm({ setData }) {
  const [assetName, setAssetName] = useState();
  const [assetAmount, setAmount] = useState();

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setData({
      assetName: assetName, assetAmount: assetAmount,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className=""
    >
      <br />
      <label>Asset:</label>
      <br />
      <select value={assetName} onChange={(e) => setAssetName(e.target.value)}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <label>Asset Amount:</label>
      <br />
      <input
        name="assetAmount"
        type="number"
        value={assetAmount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <input type="submit" value="Add Log" />
    </form>
  );
}

function LiabilitiesForm({ setData }) {
  const [liabilityName, setLiabilityName] = useState();
  const [liabilityAmount, setLiabilityAmount] = useState();

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setData({
      liabilityName: liabilityName, liabilityAmount: liabilityAmount,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400"
    >
      <br />
      <label>Liability:</label>
      <br />
      <select value={liabilityName} onChange={(e) => setLiabilityName(e.target.value)}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <br />
      <label>Liability Amount:</label>
      <br />
      <input
        name="liabilityAmount"
        type="number"
        value={liabilityAmount}
        onChange={(e) => setLiabilityAmount(e.target.value)}
      />
      <br />
      <input type="submit" value="Add Log" />
    </form>
  );
}

function Output({ goalData }) {
  const {firstName, lastName, age, goal, amount, assetName, assetAmount, liabilityName, liabilityAmount} = goalData;
 
  return ( 
     <div className="flex flex-col">
        <label>First Name : {firstName}</label> 
        <label>First Name : {lastName}</label> 
        <label>Asset Name : {assetName} </label> 
        <label>Asset Amount : ${assetAmount} </label> 
        <label>Liability Name : {liabilityName}</label> 
        <label>Liability Amount : ${liabilityAmount}</label> 
     </div>
  );
}