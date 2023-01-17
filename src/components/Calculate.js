import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";
import refresh from "../assets/refresh.png";
import dollar from "../assets/dollar.png";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import ProgressBar from "@ramonak/react-progress-bar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { IoMdInformationCircle } from "react-icons/io";

import "./Calculate.css";

import { IoIosArrowBack } from "react-icons/io";

import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Modal,
  Steps,
  Tabs,
  Theme,
  Toggle,
} from "react-daisyui";
import { useQuery } from "react-query";
import Calculate from "../services/calculate";

function CalculateComponent() {
  const [selectedTab, setselectedTab] = useState(0);
  const [goalData, setgoalData] = useState({});

  const goalDataRef = useRef();
  const calculateService = new Calculate();


  const { data, status, refetch  } = useQuery(["goalData", goalData ], () => calculateService.totalGoal(goalData), {
    enabled: false,
  });

  console.log(goalData);


  const liStyle = (curIdx) => {
    var style = "";
    style = curIdx === selectedTab ? "step step-dark-red" : "step";
    style = `${style} ${
      curIdx < selectedTab ? "step-dark-red step-success" : ""
    }`; 
    return style;
  };
 
  return (
    <div className="flex-col relative h-auto w-full flex justify-center items-center gap-12 py-5 md:py-36">
      {selectedTab <= 3 ? (
        <>
          <ul className="steps steps-horizontal w-full md:w-2/5 lg:steps-horizontal relative md:absolute md:top-7">
            <li className={liStyle(0)}>Personal</li>
            <li className={liStyle(1)}>Assets</li>
            <li className={liStyle(2)}>Liabilities</li>
            <li className={liStyle(3)}>Other</li>
          </ul>
        </>
      ) : (
        <></>
      )}

      {selectedTab === 0 ? (
        <PersonalForm
          setData={(value) => { 
            if (value.names && value.goalsData ) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData({ ...value });
            }
          }}
        ></PersonalForm>
      ) : selectedTab === 1 ? (
        <AssetsForm
          goBack={()=> setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.assets) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              })); 
              setTimeout(() => {
                refetch()
              }, 100);
            }
          }}
        ></AssetsForm>
      ) : selectedTab === 2 ? (
        <LiabilitiesForm
          goBack={()=> setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.liabilities && value.revexp ) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));
            }
          }}
        ></LiabilitiesForm>
      ) : selectedTab === 3 ? (
        <OtherForm
          goBack={()=> setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.other ) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));

            }
          }}
        ></OtherForm>
      ) : selectedTab === 4 ? (
        <Output
          nextTab={() => {  
            setselectedTab(selectedTab + 1);  
          }}
          goalData={goalData}
        ></Output>
      ) : selectedTab === 5 ? (
        <AnnualForm goalData={goalData}></AnnualForm>
      ) : (
        <></>
      )
      }
    </div>
  );
}

export default CalculateComponent;

const InputNames = ({
  isLast,
  item,
  onChangeValues,
  addNewName,
  isDeletedButtonVisible,
  handleRemoveName,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-1 "> 
        <div className="flex justify-between">
          <p className="font-bold">Personal Info</p>
          <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block"></IoMdInformationCircle>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-10 items-center">
          <div className="w-full md:w-1/3">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              name="firstname"
              type="text"
              value={item.firstname}
              onChange={(e) =>
                onChangeValues({
                      firstname: e.target.value,
                      lastname: item.lastname,
                      agenew: item.agenew,
                      email: item.email,
                      contact: item.contact,
                })
              }
              required
            />
          </div>

          <div className="w-full md:w-1/3">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              name="lastname"
              type="text"
              value={item.lastname}
              onChange={(e) =>
                onChangeValues({
                      firstname: item.firstname,
                      lastname: e.target.value,
                      agenew: item.agenew,
                      email: item.email,
                      contact: item.contact,
                })
              }
              required
            />
          </div>

          <div className="w-full md:w-1/3">
            <label>Age</label>
            <input
              name="agenew"
              type="number"
              className="input input-bordered w-full border-slate-400"
              value={item.agenew}
              onChange={(e) =>
                onChangeValues({
                      firstname: item.firstname,
                      lastname: item.lastname,
                      agenew: e.target.value,
                      email: item.email,
                      contact: item.contact,
                })
              }
              required
              max={99}
              
            />
          </div>
          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5"
              onClick={handleRemoveName}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-start gap-2 md:gap-10">
              <div className="w-full md:w-1/3">
                <label>Email Address</label>
                <input
                  className="input input-bordered w-full border-slate-400"
                  name="email"
                  type="email"
                  value={item.email}
                  onChange={(e) =>
                    onChangeValues({
                      firstname: item.firstname,
                      lastname: item.lastname,
                      agenew: item.agenew,
                      email: e.target.value,
                      contact: item.contact,
                    })
                  }
                  required
                />
              </div>

              <div className="w-full md:w-1/3">
                <label>Contact Number</label>
                <input
                  className="input input-bordered w-full border-slate-400"
                  name="contact"
                  type="number"
                  value={item.contact}
                  onChange={(e) =>
                    onChangeValues({
                      firstname: item.firstname,
                      lastname: item.lastname,
                      agenew: item.agenew,
                      email: item.email,
                      contact: e.target.value,
                    })
                  }
                  required
                />
              </div>  
              <div className="w-full md:w-1/3">
              
              </div>  
        </div>
        {/* 
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewName}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Dependent</p>
          </div>
        )} */}
      </div>
    </>
  );
};

const InputDependents = ({
  isLast,
  item,
  onChangeValues,
  addNewNameDependent,
  isDeletedButtonVisible,
  handleRemoveNameDependent,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-1">
        <p className="font-bold">Dependents</p>
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-10 items-center">
          <div className="w-full md:w-1/3">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              name="firstnamedependent"
              type="text"
              value={item.firstnamedependent}
              onChange={(e) =>
                onChangeValues({
                  firstnamedependent: e.target.value,
                  lastnamedependent: item.lastnamedependent,
                  agedependent: item.agedependent,
                })
              }
              
            />
          </div>

          <div className="w-full md:w-1/3">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              name="lastnamedependent"
              type="text"
              value={item.lastnamedependent}
              onChange={(e) =>
                onChangeValues({
                  firstnamedependent: item.firstnamedependent,
                  lastnamedependent: e.target.value,
                  agedependent: item.agenewdependent,
                })
              }
              
            />
          </div>

          <div className="w-full md:w-1/3">
            <label>Age</label>
            <input
              name="agedependent"
              type="number"
              className="input input-bordered w-full border-slate-400"
              value={item.agedependent}
              onChange={(e) =>
                onChangeValues({
                  firstnamedependent: item.firstnamedependent,
                  lastnamedependent: item.lastnamedependent,
                  agedependent: e.target.value,
                })
              }
              
            />
          </div>
          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5 hidden md:block"
              onClick={handleRemoveNameDependent}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>

        <div className=" flex flex-col justify-start gap-10">
              <div className="w-full md:w-1/3">
                <label>Relationship</label>
                <div className="flex flex items-center">
                  <input
                    className="input input-bordered w-full border-slate-400"
                    name="relationship"
                    type="text"
                    value={item.relationship}
                    onChange={(e) =>
                      onChangeValues({
                        firstname: e.target.value,
                        lastname: item.lastname,
                        agenew: item.agenew,
                      })
                    }
                  />
                  {isDeletedButtonVisible && (
                    <span
                      className="cursor-pointer ml-4 md:mt-5 block md:hidden"
                      onClick={handleRemoveNameDependent}
                    >
                      <BsTrash className="text-[#A0161B]"></BsTrash>
                    </span>
                  )}
                </div>
              </div>
        </div>

        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewNameDependent}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another Dependent</p>
          </div>
        )}
      </div>
    </>
  );
};

const InputRevExp = ({
  isLast,
  item,
  onChangeValues,
  addNewRevExp,
  handleRemoveRevExp,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex items-start flex-col w-full gap-10 items-center">
          
          <div className="flex flex-col w-full gap-2 ">
                <p className="font-bold">Monthly Revenue</p>
                <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10">
                  <div className="w-full md:w-1/2">
                    <label>Multiplier</label>
                    <div className="flex items-center border-slate-400">
                      <input
                        name="multiplierrev"
                        type="number"
                        className="input input-bordered w-full border-slate-400"
                        placeholder="0"
                        value={item.multiplierrev}
                        onChange={(e) =>
                          onChangeValues({
                            revenue: item.revenue,
                            multiplierrev: e.target.value,
                            expenses: item.expenses,
                            multiplierexp: item.multiplierexp,
                            currencyrev: item.currencyrev,
                            currencyexp: item.currencyexp,
                          })
                        }
                        max={100}
                        required
                      />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <label>Monthly Revenue</label>
                  <div className="flex items-center border-slate-400">
                    <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                        <select
                            className="w-11/12"
                            value={item.currencyrev}
                            onChange={(e) =>
                              onChangeValues({ 
                                revenue: item.revenue,
                                multiplierrev: item.multiplierrev,
                                expenses: item.expenses,
                                multiplierexp: item.multiplierexp,
                                currencyrev: e.target.value, 
                                currencyexp: item.currencyexp,
                              })
                            }
                            required
                          >
                          <option disabled>
                            {" "}
                            Choose Currency{" "}
                          </option>
                          <option value="usd" selected>USD</option>
                          <option value="eur">EUR</option>
                          <option value="cad">CAD</option>
                          <option value="gbp">GBP</option>
                          <option value="bhd">BHD</option>
                          <option value="kwd">KWD</option>
                        </select>
                    </div>
                    <input
                      name="revenue"
                      type="number"
                      className="input w-full rounded-l-none border-slate-400"
                      placeholder="0"
                      value={item.revenue}
                      onChange={(e) =>
                        onChangeValues({
                          revenue: e.target.value,
                          multiplierrev: item.multiplierrev,
                          expenses: item.expenses,
                          multiplierexp: item.multiplierexp, 
                          currencyrev: item.currencyrev,
                          currencyexp: item.currencyexp,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <p className="font-bold">Monthly Expenses</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-10">
                <div className="w-full md:w-1/2">
                  <label>Multiplier</label>
                  <div className="flex items-center border-slate-400">
                    <input
                      name="multiplierexp"
                      type="number"
                      className="input input-bordered w-full border-slate-400"
                      placeholder="0"
                      value={item.multiplierexp}
                      onChange={(e) =>
                        onChangeValues({
                          revenue: item.revenue,
                          multiplierrev: item.multiplierrev,
                          expenses: item.expenses,
                          multiplierexp: e.target.value,
                          currencyrev: item.currencyrev,
                          currencyexp: item.currencyexp,             
                        })
                      }
                      required
                      max={100}
                    />
                  </div>
                </div>     
          
                <div className="w=full md:w-1/2">
                  <label>Monthly Expenses</label>
                  <div className="flex items-center border-slate-400">
                    <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                        <select
                            className="w-11/12"
                            value={item.currencyexp}
                            onChange={(e) =>
                              onChangeValues({ 
                                revenue: item.revenue,
                                multiplierrev: item.multiplierrev,
                                expenses: item.expenses,
                                multiplierexp: item.multiplierexp,
                                currencyrev: item.currencyrev,
                                currencyexp: e.target.value,    })
                            }
                            required
                          >
                          <option disabled>
                            {" "}
                            Choose Currency{" "}
                          </option>
                          <option value="usd" selected>USD</option>
                          <option value="eur">EUR</option>
                          <option value="cad">CAD</option>
                          <option value="gbp">GBP</option>
                          <option value="bhd">BHD</option>
                          <option value="kwd">KWD</option>
                        </select>
                    </div>
                    <input
                      name="expenses"
                      type="number"
                      className="input input-bordered rounded-l-none w-full border-slate-400"
                      placeholder="0"
                      value={item.expenses}
                      onChange={(e) =>
                        onChangeValues({
                          revenue: item.revenue,
                          multiplierrev: item.multiplierrev,
                          expenses: e.target.value,
                          multiplierexp: item.multiplierexp, 
                          currencyrev: item.currencyrev,
                          currencyexp: item.currencyexp, 
                        })
                      }
                      required
                    />
                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InputGoals = ({
  isLast,
  item,
  onChangeValues,
  addNewGoal,
  handleRemoveGoal,
  isDeletedButtonVisible,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Goal</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.goal}
              onChange={(e) =>
                onChangeValues({ goal: e.target.value, amount: item.amount })
              }
              required
            >
              <option disabled selected>
                {" "}
                Choose a Goal{" "}
              </option>
              <option value="savings">Savings</option>
              <option value="house">House</option>
              <option value="car">Luxury Car</option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label>Amount</label>
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/3 md:w-1/4 input input-bordered border-black items-center">
                {/* <p className="text-center">USD</p> */}
                <select
                  className="w-11/12"
                  value={item.currency}
                  onChange={(e) =>
                    onChangeValues({ goal: item.goal, currency: e.target.value, amount: item.amount })
                  }
                  required
                >
                    <option disabled >
                      {" "}
                      Choose Currency{" "}
                    </option>
                    <option value="usd" selected>USD</option>
                    <option value="eur">EUR</option>
                    <option value="cad">CAD</option>
                    <option value="gbp">GBP</option>
                    <option value="bhd">BHD</option>
                    <option value="kwd">KWD</option>
                </select>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                value={item.amount}
                onChange={(e) =>
                  onChangeValues({ goal: item.goal, currency: item.currency, amount: e.target.value })
                }
                required
              />

              {isDeletedButtonVisible && (
                <span
                className="cursor-pointer ml-4 md:mt-5 block md:hidden"
                onClick={handleRemoveGoal}
                >
                      <BsTrash className="text-[#A0161B]"></BsTrash>
                </span>
              )}
            </div>

          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5 hidden md:block"
              onClick={handleRemoveGoal}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}

          
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewGoal}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another Goal</p>
          </div>
        )}
      </div>
    </>
  );
};

const InputAssets = ({
  isLast,
  item,
  onChangeValues,
  addNewAsset,
  handleRemoveAsset,
  isDeletedButtonVisible,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Asset</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.asset}
              onChange={(e) =>
                onChangeValues({ asset: e.target.value, amount: item.amount, assetmultiplier: item.assetmultiplier})
              }
              required
            >
              <option disabled selected>
                Choose an Asset
              </option>
              <option value="home">Home</option>
              <option value="investment">Investments</option>
              <option value="business">Busines Value</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-10 w-full md:w-1/2">
            <div className="w-full md:w-1/4">
              <label>Multiplier</label>
              <div className="flex items-center border-slate-400 w-full"> 
                <input
                  name="assetmultiplier"
                  type="number"
                  placeholder="0"
                  className="input w-full input-bordered border-slate-400"
                  value={item.assetmultiplier}
                  onChange={(e) =>
                    onChangeValues({ asset: item.asset, currency: item.currency, amount: item.amount, assetmultiplier: e.target.value})
                  }
                  max={100}
                />
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <label>Amount</label>
              <div className="flex items-center border-slate-400 w-full items-center">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  {/* <p className="text-center">USD</p> */}
                  <select
                    className="w-11/12"
                    value={item.currency}
                    onChange={(e) =>
                      onChangeValues({ asset: item.asset, currency: e.target.value, amount: item.amount, assetmultiplier: item.assetmultiplier })
                    }
                    required
                  >
                      <option disabled>
                        {" "}
                        Choose Currency{" "}
                      </option>
                      <option value="usd" selected>USD</option>
                      <option value="eur">EUR</option>
                      <option value="cad">CAD</option>
                      <option value="gbp">GBP</option>
                      <option value="bhd">BHD</option>
                      <option value="kwd">KWD</option>
                  </select>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full md:w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) =>
                    onChangeValues({ asset: item.asset, currency: item.currency, amount: e.target.value, assetmultiplier: item.assetmultiplier})
                  }
                  required
                />

                { isDeletedButtonVisible && ( <span
                    className="cursor-pointer block md:hidden ml-4"
                    onClick={handleRemoveAsset}
                >
                    <BsTrash className="text-[#A0161B]"></BsTrash>
                </span>)
                }

              </div>
            </div>
          </div>

           { isDeletedButtonVisible && (
              <span
                className="cursor-pointer hidden md:block -mt-6 md:mt-5"
                onClick={handleRemoveAsset}
              >
                  <BsTrash className="text-[#A0161B]"></BsTrash>
              </span>
            )
           }       
          
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewAsset}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another Asset</p>
          </div>
        )}
      </div>
    </>
  );
};

const InputLiabilities = ({
  isLast,
  item,
  onChangeValues,
  addNewLiability,
  handleRemoveLiability,
  isDeletedButtonVisible,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-3 md:gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Liability</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.liability}
              onChange={(e) =>
                onChangeValues({
                  liability: e.target.value,
                  amount: item.amount,
                  liabilitymultiplier: item.liabilitymultiplier
                })
              }
              required
            >
              <option disabled selected>
                Select a Liability
              </option>
              <option value="mortgage">Mortgage</option>
              <option value="creditcard">Credit Card</option>
              <option value="studentdebt">Student Debt</option>
            </select>
          </div>

          <div className="w-full flex-col md:flex-row flex gap-3 md:gap-10 md:w-1/2">

            <div className="w-full md:w-1/4">
              <label>Multiplier</label>
              <div className="flex items-center border-slate-400 w-full"> 
                <input
                  placeholder="0"
                  name="liabilitymultiplier"
                  type="number"
                  className="input w-full input-bordered border-slate-400"
                  value={item.liabilitymultiplier}
                  onChange={(e) =>
                    onChangeValues({ liability: item.liability, amount: item.amount, liabilitymultiplier: e.target.value, currencyliability: item.currencyliability })
                  }
                  max={100}
                />
              </div>
            </div>
          
            <div className="w-full md:w-3/4">
            <label>Amount</label>
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                {/* <p className="text-center">USD</p> */}
                  <select
                    className="w-11/12"
                    value={item.currencyliability}
                    onChange={(e) =>
                      onChangeValues({ liability: item.liability, amount: item.amount, liabilitymultiplier: item.liabilitymultiplier, currencyliability: e.target.value })
                    }
                    required
                  >
                      <option disabled>
                        {" "}
                        Choose Currency{" "}
                      </option>
                      <option value="usd" selected>USD</option>
                      <option value="eur">EUR</option>
                      <option value="cad">CAD</option>
                      <option value="gbp">GBP</option>
                      <option value="bhd">BHD</option>
                      <option value="kwd">KWD</option>
                  </select>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                value={item.amount}
                onChange={(e) =>
                  onChangeValues({
                    liability: item.liability,
                    amount: e.target.value,
                    liabilitymultiplier: item.liabilitymultiplier,
                    currencyliability: item.currencyliability,
                  })
                }
                required
              />

              { isDeletedButtonVisible && (<span
                className="cursor-pointer ml-4 block md:hidden"
                onClick={handleRemoveLiability}
              >
                <BsTrash className="text-[#A0161B]"></BsTrash>
              </span>)
              }
              
            </div>
            </div>
            
          </div>

          <span
            className="cursor-pointer -mt-6 md:mt-5 hidden md:block"
            onClick={handleRemoveLiability}
          >
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span>
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewLiability}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another Liability</p>
          </div>
        )}
      </div>
    </>
  );
};

const InputOther = ({
  isLast,
  item,
  onChangeValues,
  addNewOther,
  handleRemoveOther,
  isDeletedButtonVisible
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-col w-full gap-3 md:gap-10 items-start">      
          
          <div className="w-full flex flex-col md:flex-row gap-3 md:gap-10 md:w-1/2">
            <div className="w-full md:w-3/4">
              <label>Account title</label>
              <div className="flex items-center border-slate-400 w-full"> 
                <input
                  placeholder="0"
                  name="account"
                  type="text"
                  className="input w-full input-bordered border-slate-400"
                  value={item.account}
                  onChange={(e) =>
                    onChangeValues({ account: e.target.value, amount: item.amount, plan: item.plan })
                  }
             
                />
              </div>
            </div>
          
            <div className="flex items-center gap-5 w-full md:w-3/4">
            <div className="w-full">
              <label>Score</label>
              <div className="flex items-center border-slate-400">
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full border-slate-400"
                  value={item.amount}
                  onChange={(e) =>
                    onChangeValues({
                      account: item.account, amount: e.target.value, plan: item.plan
                    })
                  }
                  required
                />
              </div>
            </div>
            {
              isDeletedButtonVisible && (<span
                className="cursor-pointer "
                onClick={handleRemoveOther}
              >
                  <BsTrash className="text-[#A0161B]"></BsTrash>
              </span>)
            }
              
            </div>
            
          </div>

          <div className="w-full">
              <label>Plan</label>
              <div className="flex items-center border-slate-400 w-full"> 
                <input
                  placeholder="Write your plan"
                  name="plan"
                  type="text"
                  className="input w-full input-bordered border-slate-400"
                  value={item.plan}
                  onChange={(e) =>
                    onChangeValues({ account: item.account, amount: item.amount, plan: e.target.value })
                  }
             
                />
              </div>
          </div>

          
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewOther}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another</p>
          </div>
        )}
      </div>
    </>
  );
};

function PersonalForm({ setData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      // firstName: firstName,
      // lastName: lastName,
      // age: age,
      names: names,
      dependents: dependents,
      goalsData: goals,
      
    });

  
  };

  
  const [names, setNames] = useState([
    {
      firstname: "",
      lastname: "",
      agenew: "not filled",
      email: "",
      contact: "",
    },
  ]);

  const [dependents, setDependents] = useState([
    {
      firstnamedependent: "",
      lastnamedependent: "",
      agedependent: "not filled",
      relationship: "",
    },
  ]);

  const [goals, setGoals] = useState([
    {
      amount: 0.0,
      goal: "savings",
      currency: "usd",
    },
  ]);

  const addNewName = () => {
    setNames([
      ...names,
      {
        firstname: "",
        agenew: "not filled",
      },
    ]);
  };

  const addNewNameDependent = () => {
    setDependents([
      ...dependents,
      {
        firstnamedependent: "",
        agedependent: "not filled",
    
      },
    ]);
  };

  const handleRemoveName = (index) => {
    if (names.length !== 1) {
      const values = [...names];
      values.splice(index, 1);
      setNames(values);
    }
  };

  const handleRemoveNameDependent = (index) => {
    if (dependents.length !== 1) {
      const values = [...dependents];
      values.splice(index, 1);
      setDependents(values);
    }
    console.log("remove dependents");
  };

  const handleRemoveGoal = (index) => {
    if (goals.length !== 1) {
      const values = [...goals];
      values.splice(index, 1);
      setGoals(values);
    }
  };

  const addNewGoal = () => {
    setGoals([
      ...goals,
      {
        amount: 0.0,
        goal: "savings",
        currency: "usd",
      },
    ]);
  };

  return (
   
      <div className="w-full justify-center items-center flex flex-col gap-3 ">
        <div className="w-full md:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-0 md:px-7 py-7 rounded-lg shadow-none md:shadow-md">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="gap-10 flex flex-col w-5/6	md:w-full"
            >
              {names.map((item, index) => (
                <div key={index} className="px-0 w-full">
                  <InputNames
                    item={item}
                    onChangeValues={(data) => {
                      var namesTemporary = [...names];
                      namesTemporary[index] = data;
                      setNames(namesTemporary);
                    }}
                    addNewName={addNewName}
                    handleRemoveName={handleRemoveName}
                    isDeletedButtonVisible={names.length - 1 > 0}
                    isLast={names.length - 1 === index}
                  />
                </div>
              ))}

            
              {goals.map((item, index) => (
                <div key={index} className="px-0 w-full">
                  <InputGoals
                    item={item}
                    onChangeValues={(data) => {
                      var goalsTemporary = [...goals];
                      goalsTemporary[index] = data;
                      setGoals(goalsTemporary);
                    }}
                    addNewGoal={addNewGoal}
                    handleRemoveGoal={handleRemoveGoal}
                    isDeletedButtonVisible={goals.length - 1 > 0}
                    isLast={goals.length - 1 === index}
                  />
                </div>
              ))}

              {dependents.map((item, index) => (
                <div key={index} className="px-0 w-full">
                  <InputDependents
                    item={item}
                    onChangeValues={(data) => {
                      var dependentsTemporary = [...dependents];
                      dependentsTemporary[index] = data;
                      setDependents(dependentsTemporary);
                    }}
                    addNewNameDependent={addNewNameDependent}
                    handleRemoveNameDependent={handleRemoveNameDependent}
                    isDeletedButtonVisible={dependents.length - 1 > 0}
                    isLast={dependents.length - 1 === index}
                  />
                </div>
              ))}

              <input
                type="submit"
                className="py-3 w-full md:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
                value="Next Step"
              />
            </form>
            <a href="/calculate" className="flex items-center gap-2">
              <img src={refresh} className="w-4 h-4"></img>
              <p className="text-[#8A8A8E]">Back to start</p>
            </a>
        </div>
      </div>
  
  );
}

function AssetsForm({ setData, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      assets: assets,
    });
  };

  const [assets, setAssets] = useState([
    {
      asset: "home",
      amount: 0.0,
      assetmultiplier: 0.0,
      currency: "usd"
    },
  ]);

  const addNewAsset = () => {
    setAssets([
      ...assets,
      {
        asset: "home",
        amount: 0.0,
        assetmultiplier: 0.0,
        currency: "usd",
      },
    ]);
  };

  const handleRemoveAsset = (index) => {
    if (assets.length !== 1) {
      const values = [...assets];
      values.splice(index, 1);
      setAssets(values);
    }
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 ">
      <div className="w-full md:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-none md:shadow-md">
          <div className="w-full flex justify-between">
            <p className="font-bold text-center md:text-left">
              Assement Management
            </p>
            <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-10 w-full"
          >
            {assets.map((item, index) => (
              <div key={index} className="px-0 w-full">
                <InputAssets
                  item={item}
                  onChangeValues={(data) => {
                    var assetsTemporary = [...assets];
                    assetsTemporary[index] = data;
                    setAssets(assetsTemporary);
                  }}
                  addNewAsset={addNewAsset}
                  handleRemoveAsset={handleRemoveAsset}
                  isLast={assets.length - 1 === index}
                  isDeletedButtonVisible={assets.length - 1 > 0}
                />
              </div>
            ))}

            <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3 md:gap-12">
              <div className="flex items-center cursor-pointer gap-2 justify-center" onClick={goBack}>
                <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
                <p className="text-[#A0161B] font-bold">Go Back</p>
              </div>

              <input
                type="submit"
                className="py-3 w-full md:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
                value="Next Step"
              />
            </div>
          </form>
          
          <a href="/calculate" className="flex items-center gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
      </div>

    </div>
  );
}

function LiabilitiesForm({ setData, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      liabilities: liabilities,
      revexp: revexp,
    });
  };

  const [revexp, setRevexp] = useState([
    {
      revenue: 0.0,
      multiplierrev: 0.0,
      expenses: 0.0,
      multiplierexp: 0.0,
      currencyrev: "usd",
      currencyexp: "usd",
    },
  ]);

  const [liabilities, setLiability] = useState([
    {
      liability: "Mortgage",
      amount: 0.0,
      liabilitymultiplier: 0.0,
      currencyliability: "usd",
    },
  ]);

  const addNewLiability = () => {
    setLiability([
      ...liabilities,
      {
        liability: "Mortgage",
        amount: 0.0,
        liabilitymultiplier: 0.0,
        currencyliability: "usd",
      },
    ]);
  };

  const handleRemoveLiability = (index) => {
    if (liabilities.length !== 1) {
      const values = [...liabilities];
      values.splice(index, 1);
      setLiability(values);
    }
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      
      <div className="w-full md:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-0 md:px-7 py-7 rounded-lg shadow-none md:shadow-md">
          <div className="w-full flex justify-between">
            <p className="font-bold text-center md:text-left">
              Liability Management
            </p>
            <IoMdInformationCircle className="text-2xl hidden md:block"></IoMdInformationCircle>
          </div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col w-5/6 md:w-full gap-10"
          >
            {liabilities.map((item, index) => (
              <div key={index} className="px-0 w-full">
                <InputLiabilities
                  item={item}
                  onChangeValues={(data) => {
                    var liabilityTemporary = [...liabilities];
                    liabilityTemporary[index] = data;
                    setLiability(liabilityTemporary);
                  }}
                  addNewLiability={addNewLiability}
                  handleRemoveLiability={handleRemoveLiability}
                  isLast={liabilities.length - 1 === index}
                  isDeletedButtonVisible={liabilities.length - 1 > 0}
                />
              </div>
            ))}

            {revexp.map((item, index) => (
              <div key={index} className="px-0 w-full">
                <InputRevExp
                  item={item}
                  onChangeValues={(data) => {
                    var namesTemporary = [...revexp];
                    namesTemporary[index] = data;
                    setRevexp(namesTemporary);
                  }}
                  // addNewRevExp={addNewRevExp}
                  // handleRemoveRevExp={handleRemoveRevExp}
                  isLast={revexp.length - 1 === index}
                />
              </div>
            ))}

            <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-7">
              <div className="flex items-center justify-center cursor-pointer gap-2" onClick={goBack}>
                <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
                <p className="text-[#A0161B] font-bold">Go Back</p>
              </div>

              <input
                type="submit"
                className="py-3 w-full md:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
                value="Next Step"
            />
            </div>
          </form>

          <a href="/calculate" className="flex items-center gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
      </div>
      
    </div>
  );
}

function OtherForm({ setData, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      other: other,
    });
  };

  const [other, setOther] = useState([
    {
      account: "",
      amount: 0.0,
      plan: "",
    },
  ]);

  const addNewOther = () => {
    setOther([
      ...other,
      {
        account: "",
        amount: 0.0,
        plan: "",
      },
    ]);
  };

  const handleRemoveOther = (index) => {
    if (other.length !== 1) {
      const values = [...other];
      values.splice(index, 1);
      setOther(values);
    }
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">

      
      
      <div className="w-full md:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-0 md:px-7 py-7 rounded-lg shadow-md">

         <div className="w-full flex justify-between px-8 md:px-0">
          <p className="font-bold text-center md:text-left">
            Others
          </p>
          <IoMdInformationCircle className="text-2xl hidden md:block"></IoMdInformationCircle>
        </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col w-5/6 md:w-full gap-10"
          >
            {other.map((item, index) => (
              <div key={index} className="px-0 w-full">
                <InputOther
                  item={item}
                  onChangeValues={(data) => {
                    var otherTemporary = [...other];
                    otherTemporary[index] = data;
                    setOther(otherTemporary);
                  }}
                  addNewOther={addNewOther}
                  handleRemoveOther={handleRemoveOther}
                  isLast={other.length - 1 === index}
                  isDeletedButtonVisible={other.length - 1 > 0}
                />
              </div>
            ))}

            <div className=" w-full flex flex-col md:flex-row justify-end gap-7">
              <div className="flex items-center justify-center cursor-pointer gap-2" onClick={goBack}>
                <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
                <p className="text-[#A0161B] font-bold">Go Back</p>
              </div>

              <input
                type="submit"
                className="py-3 w-full md:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
                value="Next Step"
              />
            </div>
          </form>

          <a href="/calculate" className="flex items-center gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
      </div>
      
    </div>
  );
}

function Output({ goalData, nextTab  }) {
  const {
    firstName,
    lastName,
    age,
    names,
    goalsData,
    assets,
    revexp,
    assetName,
    assetAmount,
    liabilityName,
    liabilities,
    liabilityAmount,
  } = goalData;

  const revexpSum = revexp.map((object) => {
    return Number(object.revenue) - Number(object.expenses);
  });

  const assetSum = assets.reduce((accumulator, object) => {
    return accumulator + Number(object.amount) * Number(object.assetmultiplier);
  }, 0);

  const liabilitySum = liabilities.reduce((accumulator, object) => {
    return accumulator + Number(object.amount) * Number(object.liabilitymultiplier);
  }, 0);

  const revenueSum = revexp.map((object) => {
    return Number(object.revenue) * Number(object.multiplierrev);
  });

  const expensesSum = revexp.reduce((accumulator, object) => {
    return accumulator + Number(object.expenses) * Number(object.multiplierexp);
  }, 0);


  const goalsCurrency = goalsData.map((object) => {
    return (object.currency);
  });

  const assetsCurrency = assets.map((object) => {
    return (object.currency);
  });

  const liabilityCurrency = liabilities.map((object) => {
    return (object.currencyliability);
  });

  const revCurrency = revexp.map((object) => {
    return (object.currencyrev);
  });

  const expCurrency = revexp.map((object) => {
    return (object.currencyexp);
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    nextTab();
  };

  const percentage = 60;

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="flex flex-col gap-5 w-5/6 md:w-3/5	">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="px-0 flex flex-col w-full md:w-2/5 shadow-gray-400 px-7 py-7 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl">Realistically Towards Dream</h2>
              <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
            </div>

            <div className="p-10 ">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur. Turpis massa tincidunt non quam gravida porttitor sem nulla. Morbi venenatis imperdiet at vitae lectus pellentesque nisl ultricies mattis.</p>
            </div>
          </div>

          <div className="flex flex-col gap-7 w-full md:w-3/5">
            <div className="flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-md">
              <div className="flex flex-row gap-2 justify-between">
                <p className="font-bold">Financially Towards Dream 40%</p>
                <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
              </div>

              <div>
                <ProgressBar
                  completed={40}
                  bgColor={"#D35055"}
                  baseBgColor={"#FFD2D2"}
                  isLabelVisible={false}
                  borderRadius={10}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 shadow-gray-400 px-7 py-7 rounded-lg shadow-md h-full">
              <div className="flex justify-between">
                <p className="font-bold">Total Calculation</p>
                <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
              </div>
              <div className="flex justify-between flex-row gap-2 bg-[#FFE0E0] px-3 py-3 rounded-md">
                <p>Total Revenue:</p>
                <p className="py-0 my-0"> 
                  {
                    revCurrency == "usd" ? <>$</>:<></>
                  }
                  {
                    revCurrency == "eur" ? <>EUR</>:<></>
                  }
                  {
                    revCurrency == "cad" ? <>CAD</>:<></>
                  }
                  {
                    revCurrency == "gbp" ? <>GBP</>:<></>
                  }
                  {
                    revCurrency == "bhd" ? <>BHD</>:<></>
                  }
                  {
                    revCurrency == "kwd" ? <>KWD</>:<></>
                  }
                   &nbsp;
                  {revenueSum}</p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#FFE0E0] px-3 py-3 rounded-md">
                <p>Total Assets:</p>
                <p className="py-0 my-0">
                  {
                    assetsCurrency == "usd" ? <>$</>:<></>
                  }
                  {
                    assetsCurrency == "eur" ? <>EUR</>:<></>
                  }
                  {
                    assetsCurrency == "cad" ? <>CAD</>:<></>
                  }
                  {
                    assetsCurrency == "gbp" ? <>GBP</>:<></>
                  }
                  {
                    assetsCurrency == "bhd" ? <>BHD</>:<></>
                  }
                  {
                    assetsCurrency == "kwd" ? <>KWD</>:<></>
                  }
                   &nbsp;
                  {assetSum}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#FFE0E0] px-3 py-3 rounded-md">
                <p>Total Liabilities:</p>
                <p className="py-0 my-0"> 
                  {
                    liabilityCurrency == "usd" ? <>$</>:<></>
                  }
                  {
                    liabilityCurrency == "eur" ? <>EUR</>:<></>
                  }
                  {
                    liabilityCurrency == "cad" ? <>CAD</>:<></>
                  }
                  {
                    liabilityCurrency == "gbp" ? <>GBP</>:<></>
                  }
                  {
                    liabilityCurrency == "bhd" ? <>BHD</>:<></>
                  }
                  {
                    liabilityCurrency == "kwd" ? <>KWD</>:<></>
                  }
                   &nbsp;
                  {liabilitySum}</p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#FFE0E0] px-3 py-3 rounded-md">
                <p>Total Expenses:</p>
                <p className="py-0 my-0"> 
                  {
                    expCurrency == "usd" ? <>$</>:<></>
                  }
                  {
                    expCurrency == "eur" ? <>EUR</>:<></>
                  }
                  {
                    expCurrency == "cad" ? <>CAD</>:<></>
                  }
                  {
                    expCurrency == "gbp" ? <>GBP</>:<></>
                  }
                  {
                    expCurrency == "bhd" ? <>BHD</>:<></>
                  }
                  {
                    expCurrency == "kwd" ? <>KWD</>:<></>
                  }
                   &nbsp;
                {expensesSum}</p>            
              </div>

              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="flex bg-green-400 bg-green-400 w-full gap-10 "
              >
                <input
                  type="submit"
                  className="py-3 w-full rounded-md bg-[#A0161B] text-white cursor-pointer"
                  value="See Details"
                />
              </form>
            </div>
            
          </div>
        </div>

        <div className="flex justify-center">
          <a href="/calculate" className="flex text-center items-center gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
        </div>
      </div>
    </div>
  );
}

function CalculateForm({ goalData }) {
  const {
    firstName,
    lastName,
    age,
    names,
    goalsData,
    assets,
    assetName,
    assetAmount,
    liabilityName,
    liabilities,
    liabilityAmount,
  } = goalData;

  const [newAssetsData, setNewAssetsData] = useState([]);

  useEffect(() => {
    const temporaryAssetsData = [];
    goalData.assets.map((assetItem) => {
      temporaryAssetsData.push({
        ...assetItem,
        year_one: (assetItem.amount * assetItem.assetmultiplier)* 1,
        year_two: (assetItem.amount * assetItem.assetmultiplier) * 2,
        year_three: (assetItem.amount * assetItem.assetmultiplier) * 3,
        year_four: (assetItem.amount * assetItem.assetmultiplier) * 4,
        year_five: (assetItem.amount * assetItem.assetmultiplier) * 5,
        year_six: (assetItem.amount * assetItem.assetmultiplier) * 6,
        year_seven: (assetItem.amount * assetItem.assetmultiplier) * 7,
        year_eight: (assetItem.amount * assetItem.assetmultiplier) * 8,
        year_nine: (assetItem.amount * assetItem.assetmultiplier) * 9,
        year_ten: (assetItem.amount * assetItem.assetmultiplier) * 10,
      });
    });
    console.log(temporaryAssetsData);
    setNewAssetsData(temporaryAssetsData);
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-11 my-4 w-80 md:w-full">
        <div className="text-left "></div>
        <div className="">1st Year</div>
        <div className="">2nd Year</div>
        <div className="">3rd Year</div>
        <div className="">4th Year</div>
        <div className="">5th Year</div>
        <div className="">6th Year</div>
        <div className="">7th Year</div>
        <div className="">8th Year</div>
        <div className="">9th Year</div>
        <div className="">10th Year</div>
      </div>
      {newAssetsData.map((assetItem) => (
        <div className="grid grid-cols-11 w-fit md:w-full">
          <div className="text-center py-3">{assetItem.asset}</div>
          <div className="py-3">{assetItem.year_one}</div>
          <div className="py-3">{assetItem.year_two}</div>
          <div className="py-3">{assetItem.year_three}</div>
          <div className="py-3">{assetItem.year_four}</div>
          <div className="py-3">{assetItem.year_five}</div>
          <div className="py-3">{assetItem.year_six}</div>
          <div className="py-3">{assetItem.year_seven}</div>
          <div className="py-3">{assetItem.year_eight}</div>
          <div className="py-3">{assetItem.year_nine}</div>
          <div className="py-3">{assetItem.year_ten}</div>
        </div>
      ))}
    </div>
  );
}

function CalculateLiabilityForm({ goalData }) {
  const {
    firstName,
    lastName,
    age,
    names,
    goalsData,
    assets,
    assetName,
    assetAmount,
    liabilityName,
    liabilities,
    liabilityAmount,
  } = goalData;

  const [newLiabilityData, setLiabilityData] = useState([]);

  useEffect(() => {
    const temporaryLiabilitiesData = [];
    goalData.liabilities.map((liabilityItem) => {
      temporaryLiabilitiesData.push({
        ...liabilityItem,
        year_one: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 1,
        year_two: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 2,
        year_three: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 3,
        year_four: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 4,
        year_five: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 5,
        year_six: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 6,
        year_seven: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 7,
        year_eight: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 8,
        year_nine: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 9,
        year_ten: (liabilityItem.amount *liabilityItem. liabilitymultiplier) * 10,
      });
    });

    setLiabilityData(temporaryLiabilitiesData);
  }, []);

  return (
    <div className="shadow-gray-400 px-7 py-7 rounded-lg shadow-md">
      <div className="grid grid-cols-11 my-4">
        <div className="text-left"></div>
        <div className="">1st Year</div>
        <div className="">2nd Year</div>
        <div className="">3rd Year</div>
        <div className="">4th Year</div>
        <div className="">5th Year</div>
        <div className="">6th Year</div>
        <div className="">7th Year</div>
        <div className="">8th Year</div>
        <div className="">9th Year</div>
        <div className="">10th Year</div>
      </div>
      {newLiabilityData.map((liabilityItem) => (
        <div className="grid grid-cols-11 ">
          <div className="text-center py-3">{liabilityItem.liability}</div>
          <div className="py-3 ">{liabilityItem.year_one}</div>
          <div className="py-3">{liabilityItem.year_two}</div>
          <div className="py-3">{liabilityItem.year_three}</div>
          <div className="py-3">{liabilityItem.year_four}</div>
          <div className="py-3">{liabilityItem.year_five}</div>
          <div className="py-3">{liabilityItem.year_six}</div>
          <div className="py-3">{liabilityItem.year_seven}</div>
          <div className="py-3">{liabilityItem.year_eight}</div>
          <div className="py-3">{liabilityItem.year_nine}</div>
          <div className="py-3">{liabilityItem.year_ten}</div>
        </div>
      ))}
    </div>
  );
}

function AnnualForm({ goalData }) {
  const {
    firstName,
    lastName,
    age,
    names,
    goalsData,
    assets,
    assetName,
    assetAmount,
    liabilityName,
    liabilities,
    liabilityAmount,
  } = goalData;

  const assetsAnuallytotal = goalData.assets.reduce((accumulator, goalData) => {
    return accumulator * goalData.amount;
  }, 1);

  return (
    <div className="w-full justify-center items-center flex flex-col gap-8 ">
      <div className="flex flex-col gap-20 w-10/12">
        <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-full">
          <div className="w-full flex justify-between">
            <h2 className="font-bold text-lg text-center md:text-left">
              Assets
            </h2>
            <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
          </div>

          <div className="w-full grid ">
            <div className="flex flex-col md:w-full">
              <div className="text-center shadow-gray-400 rounded-lg shadow-md">
                <CalculateForm goalData={goalData}></CalculateForm>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-full">
          <div className="w-full flex justify-between">
            <h2 className="font-bold text-lg text-center md:text-left">
              Liabilities
            </h2>
            <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
          </div>
          <div className="w-full grid ">
            <div className="flex flex-col">
              <div className="text-center">
                <CalculateLiabilityForm
                  goalData={goalData}
                ></CalculateLiabilityForm>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <p>Year 3</p>
          <p>investment: {investmentYearly}</p>
        </div>
        <div>
          <p>Year 3</p>
          <p>Home: {homeYearly}</p>
        </div> */}
      </div>
      <div className="flex justify-center">
        <a href="/calculate" className="flex text-center items-center gap-2">
          <img src={refresh} className="w-4 h-4"></img>
          <p className="text-[#8A8A8E]">Back to start</p>
        </a>
      </div>
    </div>
  );
}
