import { useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import "./Calculate.css"

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
    <div className="flex-col relative h-auto w-full flex justify-center items-center gap-12 py-5 md:py-52 ">
      <ul className="steps steps-horizontal lg:steps-horizontal absolute top-16">
        <li className={liStyle(0)}>Personal</li>
        <li className={liStyle(1)}>Assets</li>
        <li className={liStyle(2)}>Liabilities</li>
        <li className={liStyle(3)}>Result</li>
      </ul>

      {/* <div className="flex flex-wrap flex-col justify-center items-center px:10 md:px-24 gap-3">
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
      </div> */}

      {
        selectedTab === 0 ?
          <PersonalForm
            setData={(value)=> {
              console.log(value);
              if(value.firstName && value.lastName && value.age && value.goalsData ){
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

const InputNames = ({ 
  isLast,
  item, 
  onChangeValues,
  addNewGoal, 
}) => {
 

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full gap-10">
          <div className="w-1/2">
            <label>Goal</label>
            <select className="input input-bordered w-full" value={item.goal} onChange={(e) => onChangeValues({goal: e.target.value, amount: item.amount})}>
            <option disabled selected> Choose a Goal </option>
              <option value="savings">Savings</option>
              <option value="house">House</option>
              <option value="car">Luxury Car</option>
            </select>
          </div>

          <div className="w-1/2">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              className="input input-bordered w-full"
              value={item.amount}
              onChange={(e) => onChangeValues({goal: item.goal, amount: e.target.value})}
            />
          </div>
        </div>
        {
          isLast &&
            <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewGoal}
            >
              <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
              <p className="text-sm my-2 text-[#A0161B]">Add Another Goal</p>
            </div> 
        }

      </div>
    </>
  );
};

function PersonalForm({ setData }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState(); 
 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setData({
      firstName: firstName, lastName: lastName, age: age, goalsData: goals
    }); 
  };


  const [goals, setGoals] = useState([
    {
      amount: 0.0, goal: "savings"
    }
  ]);

  const addNewGoal = () => {
    setGoals([
      ...goals,
      {
        amount: 0.0, goal: "savings"
      }
    ]);
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2"><p className="font-bold text-left">Personal Info</p></div>
      <form onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400 gap-10 flex flex-col w-1/2"
      >
    
    <div className="flex justify-between w-full gap-5">
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          className="input input-bordered w-full"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
     
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          className="input input-bordered w-full"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      
      <div>
        <label>Age</label>
        <input
          name="age"
          type="number"
          value={age}
          className="input input-bordered w-full"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

    </div>

      {/* <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full gap-10">
          <div className="w-1/2">
            <label>Goal</label>
            <select className="input input-bordered w-full"value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option disabled selected> Choose a Goal </option>
              <option value="savings">Savings</option>
              <option value="house">House</option>
              <option value="car">Luxury Car</option>
            </select>
          </div>

          <div className="w-1/2">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              className="input input-bordered w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div
        className="flex items-center gap-2 cursor-pointer"
        // onClick={addNewGoal}
        >
          <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
          <p className="text-sm my-2 text-[#A0161B]">Add Another Person</p>
        </div>

      </div> */}

          {goals.map((item, index) => (
            <div key={index} className="px-0 w-full">
              <InputNames 
                item={item}
                onChangeValues={(data) => { 
                  var goalsTemporary = [...goals];
                  goalsTemporary[index] = data;
                  setGoals(goalsTemporary);
                }}
                addNewGoal={addNewGoal}
                isLast={(goals.length - 1) === index}
              />
            </div>
          ))}
      
        <input type="submit" className="py-3 w-52 rounded-md bg-[#A0161B] text-white" value="Next Step" />

      </form>
    </div>
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
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2"><p className="font-bold text-left">Assement Management</p></div>
      <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400 flex flex-col gap-10 w-1/2"
    >
      <div className="flex gap-10">
        <div className="w-full">
          <label>Asset:</label>
          <select value={assetName} className="input input-bordered w-full" onChange={(e) => setAssetName(e.target.value)}>
            <option disabled selected> Select an Asset </option>
            <option value="home">Home</option>
            <option value="investment">Investments</option>
            <option value="business">Busines Value</option>
          </select>
        </div>

        <div className="w-full">
          <label>Asset Amount:</label>
          <input
            name="assetAmount"
            type="number"
            value={assetAmount}
            className="input input-bordered w-full"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      
      <input type="submit" className="py-3 w-52 rounded-md bg-[#A0161B] text-white" value="Next Step" />
    </form>
    </div>
    
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
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2"><p className="font-bold text-left">Assement Management</p></div>
      <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="bg-red-400 flex flex-col w-1/2 gap-10"
    >
    
      <div className="w-full flex flex-row gap-10">
        <div className="w-1/2">
          <label>Liability:</label>
          <select className="input input-bordered w-full" value={liabilityName} onChange={(e) => setLiabilityName(e.target.value)}>
            <option disabled selected> Select a Liability </option>
            <option value="mortgage">Mortgage</option>
            <option value="creditcard">Credit Card</option>
            <option value="studentdebt">Student Debt</option>
          </select>
        </div>
    
        <div className="w-1/2">
          <label>Liability Amount:</label>
          <input
            name="liabilityAmount"
            type="number"
            value={liabilityAmount}
            onChange={(e) => setLiabilityAmount(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      
     
      <input type="submit" className="py-3 w-52 rounded-md bg-[#A0161B] text-white" value="Next Step" />
      </form>
    </div>

    
  );
}

function Output({ goalData }) {
  const {firstName, lastName, age, goalsData, amount, assetName, assetAmount, liabilityName, liabilityAmount} = goalData;
 
  return ( 
    <div className="w-full justify-center items-center flex flex-col gap-3">
    <div className="flex flex-col">
        <label>First Name : {firstName}</label> 
        <label>First Name : {lastName}</label> 
        <label>Asset Name : {assetName} </label> 
        <label>Asset Amount : {assetAmount} </label> 
        <label>Liability Name : {liabilityName}</label> 
        <label>Liability Amount : {liabilityAmount}</label> 
        <label>Liability Amount : {goalsData}</label> 
     </div>
    </div>
     
  );
}