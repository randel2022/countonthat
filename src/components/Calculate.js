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

import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import Flag from "react-world-flags";

import Searchable from "react-searchable-dropdown";

import {
  Avatar,
  Button,
  Card,
  Modal,
  Steps,
  Tabs,
  Theme,
  Toggle,
} from "react-daisyui";

import { useQuery } from "react-query";

import Calculate from "../services/calculate";

var data = [
  { full_name: "Savings" },
  { full_name: "House" },
  { full_name: "Luxury Car" },
];

var assetsdata = [
  { full_name: "Home" },
  { full_name: "Investments" },
  { full_name: "Business Value" },
];

var liabilitiesdata = [
  { full_name: "Mortgage" },
  { full_name: "Credit Card" },
  { full_name: "Student Debt" },
];

function CalculateComponent() {
  const [selectedTab, setselectedTab] = useState(0);
  const [goalData, setgoalData] = useState({});

  const goalDataRef = useRef();
  const calculateService = new Calculate();

  const { data, status, refetch } = useQuery(
    ["goalData", goalData],
    () => calculateService.totalGoal(goalData),
    {
      enabled: false,
    }
  );

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
      {selectedTab <= 2 ? (
        <>
          <ul className="steps steps-horizontal w-full md:w-2/5 lg:steps-horizontal relative md:absolute md:top-7">
            <li className={liStyle(0)}>Personal</li>
            <li className={liStyle(1)}>Assets</li>
            <li className={liStyle(2)}>Liabilities</li>
            {/* <li className={liStyle(3)}>Other</li> */}
          </ul>
        </>
      ) : (
        <></>
      )}

      {selectedTab === 0 ? (
        <PersonalForm
          setData={(value) => {
            if (value.names && value.goalsData) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData({ ...value });
            }
          }}
        ></PersonalForm>
      ) : selectedTab === 1 ? (
        <AssetsForm
          currency={goalData.names.currency}
          goBack={() => setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.assets) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));
              setTimeout(() => {
                refetch();
              }, 100);
            }
          }}
        ></AssetsForm>
      ) : selectedTab === 2 ? (
        <LiabilitiesForm
          currency={goalData.names.currency}
          goBack={() => setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.liabilities && value.revexp) {
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
        // <OtherForm
        //   goBack={() => setselectedTab(selectedTab - 1)}
        //   setData={(value) => {
        //     if (value.other) {
        //       /// if all values have data then go to next Tabs
        //       setselectedTab(selectedTab + 1);
        //       setgoalData((previousGoalData) => ({
        //         ...previousGoalData,
        //         ...value,
        //       }));
        //     }
        //   }}
        // ></OtherForm>
        <Output
          goBack={() => setselectedTab(selectedTab - 1)}
          currency={goalData.names.currency}
          nextTab={() => {
            setselectedTab(selectedTab + 1);
          }}
          goalData={goalData}
        ></Output>
      ) : selectedTab === 4 ? (
        <AnnualForm goalData={goalData}></AnnualForm>
      ) : // <Output
      //   goBack={() => setselectedTab(selectedTab - 1)}
      //   currency={goalData.names.currency}
      //   nextTab={() => {
      //     setselectedTab(selectedTab + 1);
      //   }}
      //   goalData={goalData}
      // ></Output>
      selectedTab === 5 ? (
        <AnnualForm goalData={goalData}></AnnualForm>
      ) : (
        <></>
      )}
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
  const onChangeInputValue = (key, value) => {
    const currentValue = {
      firstname: item.firstName,
      lastname: item.lastname,
      agenew: item.agenew,
      email: item.email,
      contact: item.contact,
      currency: item.currency,
    };
    currentValue[key] = value;
    onChangeValues(currentValue);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-3 pb-8 border-b-g">
        <div className="flex justify-between">
          <p className="font-bold">Personal Info</p>
          <label htmlFor="my-modal-3" className="">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="py-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center ">
          <div className="w-full lg:w-1/3">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="First Name"
              name="firstname"
              type="text"
              value={item.firstname}
              onChange={(e) => onChangeInputValue("firstname", e.target.value)}
              required
            />
          </div>

          <div className="w-full lg:w-1/3">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="Last Name"
              name="lastname"
              type="text"
              value={item.lastname}
              onChange={(e) => onChangeInputValue("lastname", e.target.value)}
              required
            />
          </div>

          <div className="w-full lg:w-1/3">
            <label>Age</label>
            <input
              name="agenew"
              type="number"
              placeholder="Age"
              className="input input-bordered w-full border-slate-400"
              value={item.agenew}
              onChange={(e) => onChangeInputValue("agenew", e.target.value)}
              required
              max={99}
              min={1}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
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

        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center">
          <div className="w-full lg:w-1/3">
            <label>Email Address</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="Email Address"
              name="email"
              type="email"
              value={item.email}
              onChange={(e) => onChangeInputValue("email", e.target.value)}
              required
            />
          </div>

          <div className="w-full lg:w-1/3">
            <label>Contact Number</label>
            <input
              className="input input-bordered w-full border-slate-400 contact-field"
              placeholder="Contact Number"
              name="contact"
              type="number"
              value={item.contact}
              onChange={(e) => onChangeInputValue("contact", e.target.value)}
              required
            />
          </div>
          <div className="w-full lg:w-1/3">
            <label>Currency</label>
            <div className="flex justify-center border-slate-400 input input-bordered  items-center">
              <select
                className="w-full focus:outline-none"
                value={item.currency}
                onChange={(e) => onChangeInputValue("currency", e.target.value)}
                required
              >
                <option disabled> Choose Currency </option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="cad">CAD</option>
                <option value="gbp">GBP</option>
                <option value="bhd">BHD</option>
                <option value="kwd">KWD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Search() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      <p>Goals</p>

      <div className="search-container relative">
        <div className="search-inner">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="input input-bordered w-full border-slate-400 focus:outline-none"
          />
        </div>
        <div className="dropdown absolute">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const InputGoals = ({
  isLast,
  item,
  onChangeValues,
  addNewGoal,
  handleRemoveGoal,
  isDeletedButtonVisible,
  goalSum,
}) => {
  const onChangeInputValue = (key, value) => {
    console.log("onchange");
    console.log(key, value);

    const currentValue = {
      goal: item.goal,
      amount: item.amount,
      currency: item.currency,
    };

    currentValue[key] = value;
    onChangeValues(currentValue);
  };

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    console.log("search ", searchTerm);
    setValue(searchTerm);
    // our api to fetch the search result
    onChangeInputValue("goal", searchTerm);
  };

  console.log(value);

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4  ">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center">
          <div className="w-full lg:w-1/2">
            <label className="my-3 ">Goals</label>
            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  placeholder="Goal"
                  required={goalSum}
                />
                <select
                  className="input input-bordered w-full border-slate-400"
                  value={value}
                  onChange={(e) => onSearch(e.target.value)}
                >
                  <option value="" disabled>
                    {" "}
                    Choose a Goal{" "}
                  </option>
                  <option value="savings" className="capitalize">
                    Savings
                  </option>
                  <option value="house" className="capitalize">
                    House
                  </option>
                  <option value="car" className="capitalize">
                    Luxury Car
                  </option>
                </select>
              </div>
              <div className="dropdown relative">
                {data
                  .filter((item) => {
                    const searchTerm = value.toLowerCase();
                    const fullName = item.full_name.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.full_name)}
                      className="dropdown-row absolute"
                      key={item.full_name}
                    >
                      {item.full_name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <label>Amount</label>
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/3 md:w-1/4 input input-bordered border-black items-center">
                <p className="text-center">{item.currency}</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400 focus:outline-none"
                value={item.amount}
                onChange={(e) => onChangeInputValue("amount", e.target.value)}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                required={value}
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
            className="flex items-center justify-between cursor-pointer "
            onClick={addNewGoal}
          >
            <div className="flex items-center gap-2 border-b">
              <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
              <p className="text-sm text-[#A0161B]">Add Another Goal</p>
            </div>

            <div>
              <p className="text-sm">Total Goal Amount: {goalSum}</p>
            </div>
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
  const onChangeInputValue = (key, value) => {
    const currentValue = {
      asset: item.asset,
      amount: item.amount,
      assetmultiplier: item.assetmultiplier,
      currency: item.currency,
      revmultiplier: item.revmultiplier,
      revamount: item.revamount,
    };
    currentValue[key] = value;
    onChangeValues(currentValue);
  };

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    console.log("search ", searchTerm);
    setValue(searchTerm);
    // our api to fetch the search result
    onChangeInputValue("asset", searchTerm);
  };

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col justify-between w-full gap-4 pb-6 border-b-g">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center">
          <div className="w-full lg:w-1/2">
            <label>Asset</label>

            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  placeholder="Asset"
                  required={item.amount > 0}
                />
                <select
                  className="input input-bordered w-full border-slate-400"
                  value={item.asset}
                  onChange={(e) => onSearch(e.target.value)}
                  required={item.amount > 0}
                >
                  <option disabled value="">
                    {" "}
                    Choose a Goal{" "}
                  </option>
                  <option value="home" className="capitalize">
                    Home
                  </option>
                  <option value="investments" className="capitalize">
                    Investments
                  </option>
                  <option value="Business Value" className="capitalize">
                    Business Value
                  </option>
                </select>
              </div>
              <div className="dropdown relative">
                {assetsdata
                  .filter((item) => {
                    const searchTerm = value.toLowerCase();
                    const fullName = item.full_name.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.full_name)}
                      className="dropdown-row absolute"
                      key={item.full_name}
                    >
                      {item.full_name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 w-full lg:w-1/2 ">
            <div className="w-full lg:w-1/4">
              <label>Multiplier</label>
              <div className="flex items-center border-slate-400 w-full">
                <input
                  name="assetmultiplier"
                  type="number"
                  placeholder="0"
                  className="input w-full input-bordered border-slate-400"
                  value={item.assetmultiplier}
                  onChange={(e) =>
                    onChangeInputValue("assetmultiplier", e.target.value)
                  }
                  max={100}
                  min={0}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-3/4">
              <label>Amount</label>
              <div className="flex items-center border-slate-400 w-full items-center">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  <p className="text-center">{item.currency}</p>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full md:w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) => onChangeInputValue("amount", e.target.value)}
                  min={value === "" ? 0 : 1}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required={value}
                />

                {isDeletedButtonVisible && (
                  <span
                    className="cursor-pointer block lg:hidden ml-4"
                    onClick={handleRemoveAsset}
                  >
                    <BsTrash className="text-[#A0161B]"></BsTrash>
                  </span>
                )}
              </div>
            </div>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer hidden lg:block -mt-6 md:mt-5"
              onClick={handleRemoveAsset}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewAsset}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm text-[#A0161B]">Add Another Asset</p>
          </div>
        )}
      </div>

      <div className="w-full flex-col lg:flex-col gap-2 flex lg:w-full ">
        <p className="font-bold my-0">Monthly Revenue</p>
        <div className="flex flex-col md:flex-row w-full gap-2 lg:gap-10 ">
          <div className="w-full lg:w-1/2">
            <label>Multiplier</label>
            <div className="flex items-center border-slate-400 w-full">
              <input
                placeholder="0"
                name="liabilitymultiplier"
                type="number"
                className="input w-full input-bordered border-slate-400"
                value={item.revmultiplier}
                onChange={(e) =>
                  onChangeInputValue("revmultiplier", e.target.value)
                }
                max={100}
                min={0}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <label>Monthly Revenue</label>
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                <p className="text-center">{item.currency}</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                value={item.revamount}
                onChange={(e) =>
                  onChangeInputValue("revamount", e.target.value)
                }
                min={0}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <div className="flex flex-col justify-between w-full gap-3">
        <p className="font-bold">Dependents</p>
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center">
          <div className="w-full lg:w-1/3">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="First Name"
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

          <div className="w-full lg:w-1/3">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="Last Name"
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

          <div className="w-full lg:w-1/3">
            <label>Age</label>
            <input
              name="agedependent"
              type="number"
              placeholder="Age"
              className="input input-bordered w-full border-slate-400"
              value={item.agedependent}
              onChange={(e) =>
                onChangeValues({
                  firstnamedependent: item.firstnamedependent,
                  lastnamedependent: item.lastnamedependent,
                  agedependent: e.target.value,
                })
              }
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
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
          <div className="w-full lg:w-1/3">
            <label>Relationship</label>
            <div className="flex flex items-center mr-0 lg:mr-6">
              <input
                className="input input-bordered w-full border-slate-400"
                placeholder="Relationship"
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
            className="flex items-center cursor-pointer mt-2"
            onClick={addNewNameDependent}
          >
            <div className="flex items-center gap-2 border-b">
              <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
              <p className="text-sm text-[#A0161B]">Add Another Dependent</p>
            </div>
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
  const onChangeInputValue = (key, value) => {
    const currentValue = {
      liability: item.liability,
      amount: item.amount,
      liabilitymultiplier: item.liabilitymultiplier,
      currencyliability: item.currencyliability,
    };
    currentValue[key] = value;
    onChangeValues(currentValue);
  };

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    console.log("search ", searchTerm);
    setValue(searchTerm);
    // our api to fetch the search result
    onChangeInputValue("liability", searchTerm);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4  pb-6">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-center ">
          <div className="w-full lg:w-1/2 ">
            <label>Liabilities</label>

            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  placeholder="Liability"
                  required={item.amount > 0}
                />
                <select
                  className="input input-bordered w-full border-slate-400"
                  value={item.liability}
                  onChange={(e) => onSearch(e.target.value)}
                >
                  <option value="" disabled>
                    {" "}
                    Choose a Goal{" "}
                  </option>
                  <option value="Mortgage" className="capitalize">
                    Mortgage
                  </option>
                  <option value="Credit Card" className="capitalize">
                    Credit Card
                  </option>
                  <option value="Student Debt" className="capitalize">
                    Student Debt
                  </option>
                </select>
              </div>
              <div className="dropdown relative">
                {liabilitiesdata
                  .filter((item) => {
                    const searchTerm = value.toLowerCase();
                    const fullName = item.full_name.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.full_name)}
                      className="dropdown-row absolute"
                      key={item.full_name}
                    >
                      {item.full_name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-full flex-col lg:flex-row flex gap-3 lg:gap-10 lg:w-1/2">
            <div className="w-full lg:w-1/4">
              <label>Multiplier</label>
              <div className="flex items-center border-slate-400 w-full">
                <input
                  placeholder="0"
                  name="liabilitymultiplier"
                  type="number"
                  className="input w-full input-bordered border-slate-400"
                  value={item.liabilitymultiplier}
                  onChange={(e) =>
                    onChangeInputValue("liabilitymultiplier", e.target.value)
                  }
                  max={100}
                  min={0}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                />
              </div>
            </div>

            <div className="w-full lg:w-3/4">
              <label>Amount</label>
              <div className="flex items-center border-slate-400">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  <p className="text-center">{item.currencyliability}</p>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) => onChangeInputValue("amount", e.target.value)}
                  required={value}
                  min={value === "" ? 0 : 1}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                />

                {isDeletedButtonVisible && (
                  <span
                    className="cursor-pointer ml-4 block lg:hidden"
                    onClick={handleRemoveLiability}
                  >
                    <BsTrash className="text-[#A0161B]"></BsTrash>
                  </span>
                )}
              </div>
            </div>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5 hidden lg:block"
              onClick={handleRemoveLiability}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>
        {isLast && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={addNewLiability}
          >
            <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
            <p className="text-sm text-[#A0161B]">Add Another Liability</p>
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
  const onChangeInputValue = (key, value) => {
    const currentValue = {
      multiplierrev: item.multiplierrev,
      revenue: item.revenue,
      currencyrev: item.currencyrev,
      expenses: item.expenses,
      multiplierexp: item.multiplierexp,
      currencyexp: item.currencyexp,
    };
    currentValue[key] = value;
    onChangeValues(currentValue);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col  w-full gap-2 md:gap-5 lg:gap-10 items-center">
          {/* <div className="flex flex-col w-full gap-2 pb-8 border-b-g">
            <p className="font-bold my-0">Monthly Revenue</p>
            <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-10">
              <div className="w-full lg:w-1/2">
                <label>Multiplier</label>
                <div className="flex items-center border-slate-400">
                  <input
                    name="multiplierrev"
                    type="number"
                    className="input input-bordered w-full border-slate-400"
                    placeholder="0"
                    value={item.multiplierrev}
                    onChange={(e) =>
                      onChangeInputValue("multiplierrev", e.target.value)
                    }
                    max={100}
                    min={0}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <label>Monthly Revenue</label>
                <div className="flex items-center border-slate-400">
                  <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                    {item.currencyrev}
                  </div>
                  <input
                    name="revenue"
                    type="number"
                    className="input w-full rounded-l-none border-slate-400"
                    placeholder="0"
                    value={item.revenue}
                    onChange={(e) =>
                      onChangeInputValue("revenue", e.target.value)
                    }
                    min={0}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col w-full gap-2">
            <p className="font-bold my-0">Monthly Expenses</p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
              <div className="w-full lg:w-1/2">
                <label>Multiplier</label>
                <div className="flex items-center border-slate-400">
                  <input
                    name="multiplierexp"
                    type="number"
                    className="input input-bordered w-full border-slate-400"
                    placeholder="0"
                    value={item.multiplierexp}
                    onChange={(e) =>
                      onChangeInputValue("multiplierexp", e.target.value)
                    }
                    max={100}
                    min={0}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
              </div>

              <div className="w=full lg:w-1/2">
                <label>Monthly Expenses</label>
                <div className="flex items-center border-slate-400">
                  <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                    {item.currencyexp}
                  </div>
                  <input
                    name="expenses"
                    type="number"
                    className="input input-bordered rounded-l-none w-full border-slate-400"
                    placeholder="0"
                    value={item.expenses}
                    onChange={(e) =>
                      onChangeInputValue("expenses", e.target.value)
                    }
                    required
                    min={0}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
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

const InputOther = ({
  isLast,
  item,
  onChangeValues,
  addNewOther,
  handleRemoveOther,
  isDeletedButtonVisible,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col lg:flex-col w-full gap-3 lg:gap-10 items-start">
          <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-10 lg:w-1/2">
            <div className="w-full lg:w-3/4">
              <label>Account title</label>
              <div className="flex items-center border-slate-400 w-full">
                <input
                  name="account"
                  type="text"
                  className="input w-full input-bordered border-slate-400"
                  value={item.account}
                  onChange={(e) =>
                    onChangeValues({
                      account: e.target.value,
                      amount: item.amount,
                      plan: item.plan,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-5 w-full lg:w-3/4">
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
                        account: item.account,
                        amount: e.target.value,
                        plan: item.plan,
                      })
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
              </div>
              {isDeletedButtonVisible && (
                <span className="cursor-pointer " onClick={handleRemoveOther}>
                  <BsTrash className="text-[#A0161B]"></BsTrash>
                </span>
              )}
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
                  onChangeValues({
                    account: item.account,
                    amount: item.amount,
                    plan: e.target.value,
                  })
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
      names: personalDetails,
      dependents: dependents,
      goalsData: goals,
    });
  };

  const [personalDetails, setpersonalDetails] = useState({
    firstname: "",
    lastname: "",
    agenew: "not filled",
    email: "",
    contact: "",
    currency: "USD",
  });

  const initialGoalState = {
    amount: 0.0,
    goal: "",
    currency: personalDetails.currency.toUpperCase(),
  };

  const [dependents, setDependents] = useState([
    {
      firstnamedependent: "",
      lastnamedependent: "",
      agedependent: "not filled",
      relationship: "",
    },
  ]);

  const [goals, setGoals] = useState([initialGoalState]);

  const goalSum = goals.reduce((accumulator, item) => {
    return accumulator + Number(item.amount);
  }, 0);

  const [goalsum, setGoalSum] = useState(0);

  console.log(goalSum);

  const addNewName = () => {
    setpersonalDetails([
      ...personalDetails,
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
    setGoals([...goals, initialGoalState]);
  };

  useEffect(() => {
    const temporaryGoalsArray = [...goals];
    temporaryGoalsArray.map(
      (goal, index) => (goal.currency = personalDetails.currency.toUpperCase())
    );
    setGoals(temporaryGoalsArray);
  }, [personalDetails]);

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 ">
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-0 md:px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="gap-10 flex flex-col w-5/6	md:w-full"
        >
          <div className="px-0 w-full">
            <InputNames
              item={personalDetails}
              onChangeValues={(data) => {
                setpersonalDetails(data);
              }}
              addNewName={addNewName}
            />
          </div>

          <div className="w-full pb-6 border-b-g">
            {goals.map((item, index) => (
              <div key={index} className="px-0 w-full mb-3">
                <InputGoals
                  item={item}
                  onChangeValues={(data) => {
                    var goalsTemporary = [...goals];
                    goalsTemporary[index] = data;
                    console.log(goalsTemporary);
                    setGoals(goalsTemporary);
                  }}
                  addNewGoal={addNewGoal}
                  handleRemoveGoal={handleRemoveGoal}
                  isDeletedButtonVisible={goals.length - 1 > 0}
                  isLast={goals.length - 1 === index}
                  goalSum={goalSum}
                />
              </div>
            ))}
          </div>

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
                goalSum={goalSum}
              />
            </div>
          ))}

          <input
            type="submit"
            className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
            value="Next Step"
          />
        </form>
      </div>

      <a href="/calculate" className="flex items-center gap-2 mt-4">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function AssetsForm({ currency, setData, goBack }) {
  const initialAssetData = {
    asset: "",
    amount: 0.0,
    assetmultiplier: 1,
    currency: currency.toUpperCase(),
    revmultiplier: 1,
    revamount: 0.0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      assets: assets,
    });
  };

  const [assets, setAssets] = useState([initialAssetData]);

  const addNewAsset = () => {
    setAssets([...assets, initialAssetData]);
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
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400  px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="w-full flex justify-between">
          <p className="font-bold text-center md:text-left">
            Assement Management
          </p>

          <label htmlFor="my-modal-3">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="py-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col w-5/6 md:w-full gap-10"
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

          <div className="flex flex-col lg:flex-row justify-center md:justify-end gap-3 lg:gap-12">
            <div
              className="flex items-center cursor-pointer gap-2 justify-center"
              onClick={goBack}
            >
              <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
              <p className="text-[#A0161B] font-bold">Go Back</p>
            </div>

            <input
              type="submit"
              className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
              value="Next Step"
            />
          </div>
        </form>
      </div>

      <a href="/calculate" className="flex items-center gap-2 mt-4">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function LiabilitiesForm({ currency, setData, goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      liabilities: liabilities,
      revexp: revexp,
    });
  };

  const initialRevenueData = {
    revenue: 0.0,
    multiplierrev: 1,
    expenses: 0.0,
    multiplierexp: 1,
    currencyrev: currency.toUpperCase(),
    currencyexp: currency.toUpperCase(),
  };

  const [revexp, setRevexp] = useState([initialRevenueData]);

  const initialLiabilitiesData = {
    liability: "",
    amount: 0.0,
    liabilitymultiplier: 1,
    currencyliability: currency.toUpperCase(),
  };

  const [liabilities, setLiability] = useState([initialLiabilitiesData]);

  const addNewLiability = () => {
    setLiability([...liabilities, initialLiabilitiesData]);
  };

  const handleRemoveLiability = (index) => {
    if (liabilities.length !== 1) {
      const values = [...liabilities];
      values.splice(index, 1);
      setLiability(values);
    }
  };

  console.log(liabilities);

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="w-full flex justify-between">
          <p className="font-bold text-center md:text-left">
            Liability Management
          </p>
          <label htmlFor="my-modal-3" className="">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="py-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col w-5/6 md:w-full gap-10"
        >
          <div className="w-full border-b-g">
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
          </div>

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

          <div className="flex flex-col lg:flex-row justify-end gap-3 md:gap-7">
            <div
              className="flex items-center justify-center cursor-pointer gap-2"
              onClick={goBack}
            >
              <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
              <p className="text-[#A0161B] font-bold">Go Back</p>
            </div>

            <input
              type="submit"
              className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
              value="Next Step"
            />
          </div>
        </form>
      </div>

      <a href="/calculate" className="flex items-center gap-2 mt-4">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function OtherForm({ currency, setData, goBack }) {
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
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="w-full flex justify-between px-8 md:px-0">
          <p className="font-bold text-center md:text-left">Others</p>
          <label htmlFor="my-modal-3" className="">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="py-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
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

          <div className=" w-full flex flex-col lg:flex-row justify-end gap-7">
            <div
              className="flex items-center justify-center cursor-pointer gap-2"
              onClick={goBack}
            >
              <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
              <p className="text-[#A0161B] font-bold">Go Back</p>
            </div>

            <input
              type="submit"
              className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
              value="Next Step"
            />
          </div>
        </form>
      </div>

      <a href="/calculate" className="flex items-center gap-2 mt-4">
        <img src={refresh} className="w-4 h-4"></img>
        <p className="text-[#8A8A8E]">Back to start</p>
      </a>
    </div>
  );
}

function Output({ currency, setData, goalData, nextTab, goBack }) {
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
    return (
      accumulator + Number(object.amount) * Number(object.liabilitymultiplier)
    );
  }, 0);

  const revenueSum = assets.map((object) => {
    return Number(object.revmultiplier) * Number(object.revamount);
  });

  const expensesSum = revexp.reduce((accumulator, object) => {
    return accumulator + Number(object.expenses) * Number(object.multiplierexp);
  }, 0);

  const totalCurrency = goalsData[0].currency;

  const goalsCurrency = goalsData.map((object) => {
    return object.currency;
  });

  const assetsCurrency = assets.map((object) => {
    return object.currency;
  });

  const liabilityCurrency = liabilities.map((object) => {
    return object.currencyliability;
  });

  const revCurrency = revexp.map((object) => {
    return object.currencyrev;
  });

  const expCurrency = revexp.map((object) => {
    return object.currencyexp;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    nextTab();
  };

  const percentage = 60;

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3">
      <div className="flex flex-col gap-5 w-5/6 lg:w-3/5">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="px-0 flex flex-col w-full lg:w-2/5 shadow-gray-400 px-7 py-7 rounded-lg shadow-md">
            <div className="flex justify-between py-0 ">
              <h2 className="font-bold text-xl my-0">
                Realistically Towards Dream
              </h2>
              <label htmlFor="towards-dream" className="py-0 ">
                <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
              </label>
            </div>

            <input
              type="checkbox"
              id="towards-dream"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="towards-dream"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold text-center my-0">
                  Realistically Towards Dream
                </h3>
                <p className="py-4 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="p-10 md:p-20 lg:p-10">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Turpis massa tincidunt
                non quam gravida porttitor sem nulla. Morbi venenatis imperdiet
                at vitae lectus pellentesque nisl ultricies mattis.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-7 w-full lg:w-3/5">
            <div className="flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-md">
              <div className="flex flex-row gap-2 item-center justify-between">
                <p className="font-bold my-0">Financially Towards Dream 40%</p>
                <label htmlFor="finacial" className="">
                  <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
                </label>
              </div>

              <input type="checkbox" id="finacial" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="finacial"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-center">
                    Financially Towards Dream
                  </h3>
                  <p className="py-4 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>

              <div>
                <ProgressBar
                  completed={40}
                  bgColor={"#D35055"}
                  baseBgColor={"#F9E8E8"}
                  isLabelVisible={false}
                  borderRadius={10}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 shadow-gray-400 px-7 py-7 rounded-lg shadow-md h-full">
              <div className="flex justify-between items-center ">
                <p className="font-bold my-0">Total Calculation</p>
                <label htmlFor="my-modal-3" className="">
                  <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
                </label>
              </div>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-center">
                    Total Calculation
                  </h3>
                  <p className="py-4 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Revenue:</p>
                <p className="py-0 my-0">
                  {totalCurrency}
                  &nbsp;
                  {revenueSum}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Assets:</p>
                <p className="py-0 my-0">
                  {totalCurrency}
                  &nbsp;
                  {assetSum}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Liabilities:</p>
                <p className="py-0 my-0">
                  {totalCurrency}
                  &nbsp;
                  {liabilitySum}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Expenses:</p>
                <p className="py-0 my-0">
                  {totalCurrency}
                  &nbsp;
                  {expensesSum}
                </p>
              </div>

              <div className="flex gap-3">
                <div
                  className="flex items-center rounded-md justify-center shadow-md cursor-pointer gap-2 w-1/2"
                  onClick={goBack}
                >
                  <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
                  <p className="text-[#A0161B] font-bold">Go Back</p>
                </div>

                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  className="flex bg-green-400 bg-green-400 w-1/2 gap-10 "
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
        </div>

        <div className="flex justify-center mt-2">
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
        year_one: assetItem.amount * assetItem.assetmultiplier * 1,
        year_two: assetItem.amount * assetItem.assetmultiplier * 2,
        year_three: assetItem.amount * assetItem.assetmultiplier * 3,
        year_four: assetItem.amount * assetItem.assetmultiplier * 4,
        year_five: assetItem.amount * assetItem.assetmultiplier * 5,
        year_six: assetItem.amount * assetItem.assetmultiplier * 6,
        year_seven: assetItem.amount * assetItem.assetmultiplier * 7,
        year_eight: assetItem.amount * assetItem.assetmultiplier * 8,
        year_nine: assetItem.amount * assetItem.assetmultiplier * 9,
        year_ten: assetItem.amount * assetItem.assetmultiplier * 10,
      });
    });
    console.log(temporaryAssetsData);
    setNewAssetsData(temporaryAssetsData);
  }, []);

  return (
    <div className="overflow-x-auto w-25 lg:w-full">
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div">
        <div className="capitalize text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1 "></div>
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
        <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div">
          <div className="text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1 capitalize">
            {assetItem.asset}
          </div>
          <div className="py-3 ">{assetItem.year_one}</div>
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
        year_one: liabilityItem.amount * liabilityItem.liabilitymultiplier * 1,
        year_two: liabilityItem.amount * liabilityItem.liabilitymultiplier * 2,
        year_three:
          liabilityItem.amount * liabilityItem.liabilitymultiplier * 3,
        year_four: liabilityItem.amount * liabilityItem.liabilitymultiplier * 4,
        year_five: liabilityItem.amount * liabilityItem.liabilitymultiplier * 5,
        year_six: liabilityItem.amount * liabilityItem.liabilitymultiplier * 6,
        year_seven:
          liabilityItem.amount * liabilityItem.liabilitymultiplier * 7,
        year_eight:
          liabilityItem.amount * liabilityItem.liabilitymultiplier * 8,
        year_nine: liabilityItem.amount * liabilityItem.liabilitymultiplier * 9,
        year_ten: liabilityItem.amount * liabilityItem.liabilitymultiplier * 10,
      });
    });

    setLiabilityData(temporaryLiabilitiesData);
  }, []);

  return (
    <div className="overflow-x-auto w-25 lg:w-full">
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full ">
        <div className="text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1"></div>
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
        <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div">
          <div className="text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1">
            {liabilityItem.liability}
          </div>
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
      <div className="flex flex-col gap-20 w-10/12 ">
        <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3 w-full">
          <div className="w-full flex justify-between">
            <h2 className="font-bold text-lg text-center md:text-left">
              Assets
            </h2>
            <label htmlFor="assets" className="">
              <IoMdInformationCircle className="text-2xl md:text-4xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
            </label>
          </div>

          <input type="checkbox" id="assets" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="assets"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold text-center">Assets</h3>
              <p className="py-4 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
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
            <label htmlFor="liability" className="">
              <IoMdInformationCircle className="text-2xl md:text-4xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
            </label>
          </div>
          <input type="checkbox" id="liability" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="liability"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold text-center">Liabilities</h3>
              <p className="py-4 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="w-full grid ">
            <div className="flex flex-col">
              <div className="text-center shadow-gray-400 rounded-lg shadow-md">
                <CalculateLiabilityForm
                  goalData={goalData}
                ></CalculateLiabilityForm>
              </div>
            </div>
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
  );
}
