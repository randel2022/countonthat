import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";
import refresh from "../assets/refresh.png";
import dollar from "../assets/dollar.png";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import ProgressBar from "bootstrap-progress-bar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { IoMdInformationCircle } from "react-icons/io";

import "./Calculate.css";

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

function Calculate() {
  const [selectedTab, setselectedTab] = useState(0);
  const [goalData, setgoalData] = useState({});

  const liStyle = (curIdx) => {
    return curIdx === selectedTab ? "step step-primary" : "step";
  };

  console.log(goalData);
  return (
    <div className="flex-col relative h-auto w-full flex justify-center items-center gap-12 py-5 md:py-36">
      {selectedTab <= 2 ? (
        <>
          <ul className="steps steps-horizontal lg:steps-horizontal relative md:absolute md:top-16">
            <li className={liStyle(0)}>Personal</li>
            <li className={liStyle(1)}>Assets</li>
            <li className={liStyle(2)}>Liabilities</li>
            {/* <li className={liStyle(3) || liStyle(4)}>Result</li> */}
          </ul>
        </>
      ) : (
        <></>
      )}

      {selectedTab === 0 ? (
        <PersonalForm
          setData={(value) => {
            console.log(value);
            if (
              // value.firstName &&
              // value.lastName &&
              // value.age &&
              value.names &&
              value.goalsData &&
              value.revexp
            ) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData({ ...value });
            }
          }}
        ></PersonalForm>
      ) : selectedTab === 1 ? (
        <AssetsForm
          setData={(value) => {
            if (value.assets) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));
            }
          }}
        ></AssetsForm>
      ) : selectedTab === 2 ? (
        <LiabilitiesForm
          setData={(value) => {
            if (value.liabilities) {
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
        <Output
          setData={(value) => {
            if (value.liabilities) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));
            }
          }}
          goalData={goalData}
        ></Output>
      ) : selectedTab === 4 ? (
        <AnnualForm goalData={goalData}></AnnualForm>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Calculate;

const InputNames = ({
  isLast,
  item,
  onChangeValues,
  addNewName,
  handleRemoveName,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-10 items-center">
          <div className="w-full md:w-1/2">
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
                })
              }
              required
            />
          </div>

          <div className="w-full md:w-1/2">
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
                })
              }
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <label>Age</label>
            <input
              name="agenew"
              type="number"
              className="input input-bordered w-full border-slate-400"
              value={item.agenew}
              onChange={(e) =>
                onChangeValues({
                  firstname: item.firstname,
                  agenew: e.target.value,
                })
              }
              required
            />
          </div>
          <span
            className="cursor-pointer -mt-6 md:mt-5"
            onClick={handleRemoveName}
          >
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span>
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewName}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Dependent</p>
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
        <div className="flex flex-col md:flex-row w-full gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Monthly Revenue</label>
            <div className="flex items-center border-slate-400">
              <input
                name="revenue"
                type="number"
                className="input input-bordered w-full border-slate-400"
                placeholder="Revenue"
                value={item.revenue}
                onChange={(e) =>
                  onChangeValues({
                    expenses: item.expenses,
                    revenue: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label>Monthly Expenses</label>
            <div className="flex items-center border-slate-400">
              <input
                name="expenses"
                type="number"
                className="input input-bordered w-full border-slate-400"
                value={item.expenses}
                onChange={(e) =>
                  onChangeValues({
                    revenue: item.revenue,
                    expenses: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          {/* <span
            className="cursor-pointer -mt-6 md:mt-5"
            onClick={handleRemoveRevExp}
          >
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span> */}
        </div>
        {/* {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewRevExp}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add Another Goal</p>
          </div>
        )} */}
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
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-10 items-center">
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
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                <p className="text-center">USD</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                value={item.amount}
                onChange={(e) =>
                  onChangeValues({ goal: item.goal, amount: e.target.value })
                }
                required
              />
            </div>
          </div>

          <span
            className="cursor-pointer -mt-6 md:mt-5"
            onClick={handleRemoveGoal}
          >
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span>
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
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Asset</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.asset}
              onChange={(e) =>
                onChangeValues({ asset: e.target.value, amount: item.amount })
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

          <div className="w-full md:w-1/2">
            <label>Amount</label>
            <div className="flex items-center border-slate-400 w-full">
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                <p className="text-center">USD</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                value={item.amount}
                onChange={(e) =>
                  onChangeValues({ asset: item.asset, amount: e.target.value })
                }
                required
              />
            </div>
          </div>

          <span
            className="cursor-pointer -mt-6 md:mt-5"
            onClick={handleRemoveAsset}
          >
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span>
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
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-10 items-center">
          <div className="w-full md:w-1/2">
            <label>Liability</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.liability}
              onChange={(e) =>
                onChangeValues({
                  liability: e.target.value,
                  amount: item.amount,
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

          <div className="w-full md:w-1/2">
            <label>Amount</label>
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                <p className="text-center">USD</p>
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
                  })
                }
                required
              />
            </div>
          </div>

          <span
            className="cursor-pointer -mt-6 md:mt-5"
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

function PersonalForm({ setData }) {
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [age, setAge] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      // firstName: firstName,
      // lastName: lastName,
      // age: age,
      names: names,
      goalsData: goals,
      revexp: revexp,
    });
  };

  const [revexp, setRevexp] = useState([
    {
      revenue: 0.0,
      expenses: 0.0,
    },
  ]);

  const [names, setNames] = useState([
    {
      name: "",
      lastname: "",
      agenew: "not filled",
    },
  ]);

  const [goals, setGoals] = useState([
    {
      amount: 0.0,
      goal: "savings",
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

  const handleRemoveName = (index) => {
    if (names.length !== 1) {
      const values = [...names];
      values.splice(index, 1);
      setNames(values);
    }
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
      },
    ]);
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2 ">
        <p className="font-bold text-center md:text-left">Personal Info</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="gap-10 flex flex-col w-5/6	md:w-1/2"
      >
        {/* <div className="flex justify-between w-full gap-5">
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
        </div> */}

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
              isLast={names.length - 1 === index}
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
              isLast={goals.length - 1 === index}
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
          value="Next Step"
        />
      </form>
      <a href="/calculate" className="flex items-center gap-2">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function AssetsForm({ setData }) {
  // const [assetName, setAssetName] = useState();
  // const [assetAmount, setAmount] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      // assetName: assetName,
      // assetAmount: assetAmount,
      assets: assets,
    });
  };

  const [assets, setAssets] = useState([
    {
      asset: "home",
      amount: 0.0,
    },
  ]);

  const addNewAsset = () => {
    setAssets([
      ...assets,
      {
        asset: "home",
        amount: 0.0,
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
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2">
        <p className="font-bold text-center md:text-left">
          Assement Management
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col gap-10 w-5/6 md:w-1/2"
      >
        {/* <div className="flex gap-10">
          <div className="w-full">
            <label>Asset:</label>
            <select
              value={assetName}
              className="input input-bordered w-full"
              onChange={(e) => setAssetName(e.target.value)}
            >
              <option disabled selected>
                {" "}
                Select an Asset{" "}
              </option>
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
        </div> */}

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
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white cursor-pointer"
          value="Next Step"
        />
      </form>
      <a href="/calculate" className="flex items-center gap-2">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function LiabilitiesForm({ setData }) {
  // const [liabilityName, setLiabilityName] = useState();
  // const [liabilityAmount, setLiabilityAmount] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      // liabilityName: liabilityName,
      // liabilityAmount: liabilityAmount,
      liabilities: liabilities,
    });
  };

  const [liabilities, setLiability] = useState([
    {
      liability: "Mortgage",
      amount: 0.0,
    },
  ]);

  const addNewLiability = () => {
    setLiability([
      ...liabilities,
      {
        liability: "Mortgage",
        amount: 0.0,
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
      <div className="w-1/2 ">
        <p className="font-bold text-center md:text-left">
          Liability Management
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col w-5/6 md:w-1/2 gap-10"
      >
        {/* <div className="w-full flex flex-row gap-10">
          <div className="w-1/2">
            <label>Liability:</label>
            <select
              className="input input-bordered w-full"
              value={liabilityName}
              onChange={(e) => setLiabilityName(e.target.value)}
            >
              <option disabled selected>
                {" "}
                Select a Liability{" "}
              </option>
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
        </div> */}

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
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white cursor-pointer"
          value="Next Step"
        />
      </form>

      <a href="/calculate" className="flex items-center gap-2">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function BasicExample() {
  return <ProgressBar now={60} />;
}

function Output({ goalData, setData }) {
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
    return accumulator + Number(object.amount);
  }, 0);

  const liabilitySum = liabilities.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      liabilities: liabilities,
    });
  };

  const percentage = 66;

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="flex flex-col gap-5 w-5/6 md:w-1/2">
        {/* <div className="flex justify-between items-center">
          <h2 className="font-bold ">Calculated Dreams</h2>
          <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
        </div> */}
        {/* <div className="flex space-between bg-red-400">
          <div className="w-1/2">
            <p>
              Lorem ipsum dolor sit amet consectetur. At sed mauris vestibulum
              ac sem. Feugiat arcu amet habitant ultrices urna eu ut aliquet.
              Molestie scelerisque dictumst tristique suspendisse massa.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-end bg-green-400">
            <img src={dollar} className="w-12"></img>
          </div>
        </div> */}

        <div className="flex gap-10">
          <div className="px-0 flex flex-col w-2/5">
            <div className="flex justify-between">
              <h2 className="font-bold">Realistically Towards Dream</h2>
              <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
            </div>

            <div className="p-10 ">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
          </div>

          <div className="flex flex-col gap-7 w-3/5">
            <div className="flex flex-row gap-2 justify-between">
              <p className="font-bold">Total Calculations</p>
              <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
            </div>

            <div>
              <ProgressBar now={60} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between flex-row gap-2">
                <p>You need to save monthly:</p>
                <p className="py-0 my-0"> ${revexpSum}</p>
              </div>

              <div className="flex justify-between flex-row gap-2">
                <p>Total Assets:</p>
                <p className="py-0 my-0"> ${assetSum}</p>
              </div>

              <div className="flex justify-between flex-row gap-2">
                <p>Total Liabilities:</p>
                <p className="py-0 my-0"> ${liabilitySum}</p>
              </div>
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
        year_one: assetItem.amount * 1,
        year_two: assetItem.amount * 2,
        year_three: assetItem.amount * 3,
        year_four: assetItem.amount * 4,
        year_five: assetItem.amount * 5,
        year_six: assetItem.amount * 6,
        year_seven: assetItem.amount * 7,
        year_eight: assetItem.amount * 8,
        year_nine: assetItem.amount * 9,
        year_ten: assetItem.amount * 10,
      });
    });
    console.log(temporaryAssetsData);
    setNewAssetsData(temporaryAssetsData);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-11 my-4">
        <div className="text-left"></div>
        <div className="">Year 1</div>
        <div className="">Year 2</div>
        <div className="">Year 3</div>
        <div className="">Year 4</div>
        <div className="">Year 5</div>
        <div className="">Year 6</div>
        <div className="">Year 7</div>
        <div className="">Year 8</div>
        <div className="">Year 9</div>
        <div className="">Year 10</div>
      </div>
      {newAssetsData.map((assetItem) => (
        <div className="grid grid-cols-11">
          <div className="text-left">{assetItem.asset}</div>
          <div className="">{assetItem.year_one}</div>
          <div className="">{assetItem.year_two}</div>
          <div className="">{assetItem.year_three}</div>
          <div className="">{assetItem.year_four}</div>
          <div className="">{assetItem.year_five}</div>
          <div className="">{assetItem.year_six}</div>
          <div className="">{assetItem.year_seven}</div>
          <div className="">{assetItem.year_eight}</div>
          <div className="">{assetItem.year_nine}</div>
          <div className="">{assetItem.year_ten}</div>
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
        year_one: liabilityItem.amount * 1,
        year_two: liabilityItem.amount * 2,
        year_three: liabilityItem.amount * 3,
        year_four: liabilityItem.amount * 4,
        year_five: liabilityItem.amount * 5,
        year_six: liabilityItem.amount * 6,
        year_seven: liabilityItem.amount * 7,
        year_eight: liabilityItem.amount * 8,
        year_nine: liabilityItem.amount * 9,
        year_ten: liabilityItem.amount * 10,
      });
    });

    setLiabilityData(temporaryLiabilitiesData);
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-11 my-4">
        <div className="text-left"></div>
        <div className="">Year 1</div>
        <div className="">Year 2</div>
        <div className="">Year 3</div>
        <div className="">Year 4</div>
        <div className="">Year 5</div>
        <div className="">Year 6</div>
        <div className="">Year 7</div>
        <div className="">Year 8</div>
        <div className="">Year 9</div>
        <div className="">Year 10</div>
      </div>
      {newLiabilityData.map((liabilityItem) => (
        <div className="grid grid-cols-11">
          <div className="text-left">{liabilityItem.liability}</div>
          <div className="">{liabilityItem.year_one}</div>
          <div className="">{liabilityItem.year_two}</div>
          <div className="">{liabilityItem.year_three}</div>
          <div className="">{liabilityItem.year_four}</div>
          <div className="">{liabilityItem.year_five}</div>
          <div className="">{liabilityItem.year_six}</div>
          <div className="">{liabilityItem.year_seven}</div>
          <div className="">{liabilityItem.year_eight}</div>
          <div className="">{liabilityItem.year_nine}</div>
          <div className="">{liabilityItem.year_ten}</div>
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
          <h2 className="text-3xl md:text-lg font-bold ">Assets</h2>
          <div className="w-full grid ">
            <div className="flex flex-col">
              <div className="text-center">
                <CalculateForm goalData={goalData}></CalculateForm>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-full">
          <h2 className="text-3xl md:text-lg font-bold ">Liabilities</h2>
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
