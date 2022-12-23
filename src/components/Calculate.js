import { useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";
import refresh from "../assets/refresh.png";
import dollar from "../assets/dollar.png";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

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
    <div className="flex-col relative h-auto w-full flex justify-center items-center gap-12 py-5 md:py-52 ">
      {selectedTab <= 2 ? (
        <>
          <ul className="steps steps-horizontal lg:steps-horizontal absolute top-16">
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
              value.goalsData
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
        <div className="flex w-full gap-10 items-center">
          <div className="w-1/2">
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
            />
          </div>

          <div className="w-1/2">
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
            />
          </div>

          <div className="w-1/2">
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
            />
          </div>
          <span className="cursor-pointer mt-5" onClick={handleRemoveName}>
            <BsTrash className="text-[#A0161B]"></BsTrash>
          </span>
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewName}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm my-2 text-[#A0161B]">Add New Name</p>
          </div>
        )}
      </div>
    </>
  );
};

const InputGoals = ({ isLast, item, onChangeValues, addNewGoal }) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full gap-10 items-center">
          <div className="w-1/2">
            <label>Goal</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.goal}
              onChange={(e) =>
                onChangeValues({ goal: e.target.value, amount: item.amount })
              }
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

          <div className="w-1/2">
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
              />
            </div>
          </div>

          <span className="cursor-pointer mt-5">
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

const InputAssets = ({ isLast, item, onChangeValues, addNewAsset }) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full gap-10">
          <div className="w-1/2">
            <label>Asset</label>
            <select
              className="input input-bordered w-full border-slate-400"
              value={item.asset}
              onChange={(e) =>
                onChangeValues({ asset: e.target.value, amount: item.amount })
              }
            >
              <option disabled selected>
                Choose an Asset
              </option>
              <option value="home">Home</option>
              <option value="investment">Investments</option>
              <option value="business">Busines Value</option>
            </select>
          </div>

          <div className="w-1/2">
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
                  onChangeValues({ asset: item.asset, amount: e.target.value })
                }
              />
            </div>
          </div>
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
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full gap-10">
          <div className="w-1/2">
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
            >
              <option disabled selected>
                Select a Liability
              </option>
              <option value="mortgage">Mortgage</option>
              <option value="creditcard">Credit Card</option>
              <option value="studentdebt">Student Debt</option>
            </select>
          </div>

          <div className="w-1/2">
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
              />
            </div>
          </div>
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
    });
  };

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
      <div className="w-1/2">
        <p className="font-bold text-left">Personal Info</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="gap-10 flex flex-col w-1/2"
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
              isLast={goals.length - 1 === index}
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white"
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

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2">
        <p className="font-bold text-left">Assement Management</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col gap-10 w-1/2"
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
              isLast={assets.length - 1 === index}
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white"
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

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-1/2 ">
        <p className="font-bold text-left">Liability Management</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" flex flex-col w-1/2 gap-10"
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
              isLast={liabilities.length - 1 === index}
            />
          </div>
        ))}

        <input
          type="submit"
          className="py-3 w-52 rounded-md bg-[#A0161B] text-white "
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

function Output({ goalData, setData }) {
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

  // const Forms = () => {
  //   assets.map((object) => {
  //     const Total = object.map((x) => x * 2);
  //     return <div>{Total}</div>;
  //   });
  // };

  const map1 = assets.map((x) => x * 2);
  console.log(typeof map1);

  const assetAnnual = assets.reduce((object) => {
    return Number(object.amount);
  }, 0);

  const investmentYearly = assets.reduce((accumulator, object) => {
    if (object.asset === "investment") {
      accumulator += Number(object.amount) * 3;
    }
    return accumulator;
  }, 0);

  const homeYearly = assets.reduce((accumulator, object) => {
    if (object.asset === "home") {
      accumulator += Number(object.amount) * 3;
    }
    return accumulator;
  }, 0);

  const assetSum = assets.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  const liabilitySum = liabilities.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      // liabilityName: liabilityName,
      // liabilityAmount: liabilityAmount,
      liabilities: liabilities,
    });
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="flex flex-col gap-5 w-1/2">
        {/* {goalsData.map((goals) => (
          <label>
            Goals: {goals.goal} ({goals.amount}*5)
          </label>
        ))} */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold ">Calculated Dreams</h2>
          <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
        </div>
        <div className="flex space-between">
          <div className="w-1/2">
            <p>
              Lorem ipsum dolor sit amet consectetur. At sed mauris vestibulum
              ac sem. Feugiat arcu amet habitant ultrices urna eu ut aliquet.
              Molestie scelerisque dictumst tristique suspendisse massa.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <img src={dollar} className="w-12"></img>
          </div>
        </div>

        <div className="px-8">
          <h2 className="font-bold">You need to save</h2>
          <div className="flex gap-5 items-center">
            <h2 className="font-bold text-6xl">$10,000</h2>
            <h2 className="font-bold">Monthly</h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Total Calculations</p>
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
          className="flex flex-col w-full gap-10"
        >
          <input
            type="submit"
            className="py-3 w-52 rounded-md bg-[#A0161B] text-white"
            value="Next Step"
          />
        </form>

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

  const sumFunc = (assetType, assets) => {
    return assets.reduce((accumulator, object) => {
      if (object.asset === assetType) {
        accumulator += Number(object.amount);
      }
      return accumulator;
    }, 0);
  };

  const assetAnnual = assets.reduce((object) => {
    return Number(object.amount);
  }, 0);

  var arrayOfNumbers = [1, 2, 3, 4, 5];

  const squareValue = arrayOfNumbers.map((number) => {
    return number * number;
  });

  /**/
  const investmentYearly = assets.reduce((accumulator, object) => {
    if (object.asset === "investment") {
      accumulator += Number(object.amount) * 1;
    }
    return accumulator;
  }, 0);

  const homeYearly = assets.reduce((accumulator, object) => {
    if (object.asset === "home") {
      accumulator += Number(object.amount) * 3;
    }
    return accumulator;
  }, 0);

  const businessYearly = assets.reduce((accumulator, object) => {
    if (object.asset === "business") {
      accumulator += Number(object.amount) * 3;
    }
    return accumulator;
  }, 0);

  const assetSum = assets.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  const liabilitySum = liabilities.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  const businessSum = liabilities.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="flex flex-col gap-5 bg-green-400 w-10/12">
        <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-full">
          <h2 className="text-3xl md:text-lg font-bold ">Assets</h2>
          <div className="w-full grid grid-cols-11">
            <div className="flex flex-col">
              <br />
              <p>Income</p>
              <p>Home</p>
              <p>Investments</p>
              <p>Business Value</p>
            </div>
            <div className="flex flex-col">
              <p>1st Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>{sumFunc("investment", assets)}</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>2nd Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>3rd Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>4th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>5th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>

            <div className="flex flex-col">
              <p>6th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>7th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>8th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>9th Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
            <div className="flex flex-col">
              <p>10 Year</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
              <p>7,000,000</p>
            </div>
          </div>
        </div>

        <div>
          <p>Year 3</p>
          <p>investment: {investmentYearly}</p>
        </div>

        <div>
          <p>Year 3</p>
          <p>Home: {homeYearly}</p>
        </div>
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
