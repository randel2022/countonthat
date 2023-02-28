import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import React from "react";
import API from "./mockAPI";
import refresh from "../assets/refresh.png";
import dollar from "../assets/dollar.png";
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import ProgressBar from "@ramonak/react-progress-bar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { IoMdInformationCircle } from "react-icons/io";

import { Spinner } from "@chakra-ui/react";

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
import { ErrorText } from "./ErrorText";

import 'jspdf-autotable';

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

var assets = [''];
  var year1asset=['1st Year'];
  var year2asset=['2nd Year'];
  var year3asset=['3rd Year'];
  var year4asset=['4th Year'];
  var year5asset=['5th Year'];
  var year6asset=['6th Year'];
  var year7asset=['7th Year'];
  var year8asset=['8th Year'];
  var year9asset=['9th Year'];
  var year10asset=['10th Year'];
  var i = 1;

  var liabilities = [''];
  var year1liability=['1st Year'];
  var year2liability=['2nd Year'];
  var year3liability=['3rd Year'];
  var year4liability=['4th Year'];
  var year5liability=['5th Year'];
  var year6liability=['6th Year'];
  var year7liability=['7th Year'];
  var year8liability=['8th Year'];
  var year9liability=['9th Year'];
  var year10liability=['10th Year'];
  var j = 1;






function checkIsEmptyObjects(object) {
  return Object.values(object).every((x) => x === null || x === "");
}

function checkIsEmptyArrayObjects(array) {
  return array
    .map((arr) => Object.values(arr).every((x) => x === null || x === ""))
    .every((x) => x === true);
}
function checkString(value, requiredMsg) {
  const newVal = value.trim();
  if (newVal === "") {
    return requiredMsg;
  } else {
    return "";
  }
}

function checkAmount(amount, name) {
  /// criteria
  /// name w/ value && amount empty and 0 = required
  /// name w/o value && amount empty = success
  if ((amount === "" || amount <= 0) && name !== "") {
    return "Amount is required";
  } else {
    return "";
  }
}

function checkAge(age) {
  if (age === "") {
    return "Age is Required";
  } else if (age <= 0) return "Age is must be greater than 0";
  else if (age > 100) return "Age is must be lesser than 100";
  else return "";
}

function checkEmail(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email === "") {
    return "Email is Required";
  }
  if (email.match(regex)) return "";
  else return "Email not valid ";
}

function CalculateComponent() {
  const [selectedTab, setselectedTab] = useState(0);
  const [goalData, setgoalData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const goalDataRef = useRef();
  const calculateService = new Calculate();

  const {
    data: backendData,
    status,
    refetch,
  } = useQuery(
    ["goalData", goalData],
    () => calculateService.totalGoal(goalData),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (selectedTab === 3) {
      setisLoading(true);
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
    }
  }, [selectedTab]);

  console.log(backendData, "data from backend");

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
      <div className={`${selectedTab === 0 ? "flex w-full" : "hidden"}`}>
        <PersonalForm
          setData={(value) => {
            if (value.names && value.goalsData) {
              /// if all values have data then go to next Tabs
              setselectedTab(selectedTab + 1);
              setgoalData({ ...value });
            }
          }}
        ></PersonalForm>
      </div>
      <div className={`${selectedTab === 1 ? "flex  w-full" : "hidden"}`}>
        <AssetsForm
          currency={goalData?.names?.currency}
          goBack={() => setselectedTab(selectedTab - 1)}
          setData={(value) => {
            console.log(value, "valuevalue");
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
      </div>
      <div className={`${selectedTab === 2 ? "flex  w-full" : "hidden"}`}>
        <LiabilitiesForm
          currency={goalData?.names?.currency}
          goBack={() => setselectedTab(selectedTab - 1)}
          setData={(value) => {
            if (value.liabilities && value.revexp) {
              /// if all values have data then go to next Tabs
              setgoalData((previousGoalData) => ({
                ...previousGoalData,
                ...value,
              }));
              setTimeout(() => {
                refetch();
              }, 100);
              setselectedTab(selectedTab + 1);
            }
          }}
        ></LiabilitiesForm>
      </div>
      <div className={`${selectedTab === 3 ? "flex  w-full" : "hidden"}`}>
        {isLoading ? (
          <>
            <div className="flex justify-center w-full h-[500px] items-center">
              <button
                disabled
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 spinner inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-7 h-7 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-lg">Calculating...</p>
              </button>
            </div>
          </>
        ) : (
          <Output
            goBack={() => setselectedTab(selectedTab - 1)}
            nextTab={() => {
              setselectedTab(selectedTab + 1);
            }}
            currency={goalData?.names?.currency}
            data={backendData?.data}
          ></Output>
        )}
      </div>
      <div className={`${selectedTab === 4 ? "flex w-full" : "hidden"}`}>
        <AnnualForm goalData={backendData?.data} currency={goalData?.names?.currency}></AnnualForm>
      </div>
    </div>
  );
}

export default CalculateComponent;

const InputNames = ({
  isLast,
  errors,
  item,
  onChangeValues,
  addNewName,
  isDeletedButtonVisible,
  handleRemoveName,
  inputHandler,
  ref
}) => {

  // const [inputValuesPersonal, setInputValuesPersonal] = useState([]);

  // useEffect(() => {
  //   const storedValuePersonal = localStorage.getItem('inputValuesPersonal');
  //   if (storedValuePersonal) {
  //     setInputValuesPersonal(JSON.parse(storedValuePersonal));
  //     onChangeValues(JSON.parse(storedValuePersonal));
  //   }
  // }, []);
  const onChangeInputValue = (key, value) => {
    // setInputValuesPersonal({ ...inputValuesPersonal, [key]: value });
    // localStorage.setItem('inputValuesPersonal', JSON.stringify({ ...inputValuesPersonal, [key]: value }));
    item[key] = value;
    onChangeValues(item);
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
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-5 md:gap-2 lg:gap-10 items-center">
          <div className="w-full lg:w-1/3 relative">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400 "
              placeholder="First Name"
              name="firstname"
              type="text"
              value={item.firstname}
              onChange={(e) => onChangeInputValue("firstname", e.target.value)}
              
            />
            {errors.firstname && (
              <span className="text-red-600 text-sm absolute w-full required">
                {errors.firstname}
              </span>
            )}
          </div>

          <div className="w-full lg:w-1/3 relative">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="Last Name"
              name="lastname"
              type="text"
              value={item.lastname}
              onChange={(e) => onChangeInputValue("lastname", e.target.value)}
            />
            {errors.lastname && (
              <span className="text-red-600 text-sm absolute w-full required">
                {errors.lastname}
              </span>
            )}
          </div>

          <div className="w-full lg:w-1/3 relative">
            <label>Age</label>
            <input
              name="agenew"
              placeholder="Age"
              className="input input-bordered w-full border-slate-400 appearance-none agediv"
              value={item.agenew}
              onChange={(e) =>
                onChangeInputValue(
                  "agenew",
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              // onKeyDown={(e) =>
              //   ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              // }
              type="text"
              maxLength="2"
            />
            {errors.agenew && (
              <span className="text-red-600 text-sm absolute w-full required">
                {errors.agenew}
              </span>
            )}
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

        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-5 md:gap-2 lg:gap-10 items-center mt-0 md:mt-3 pt-2 md:pt-0">
          <div className="w-full lg:w-1/3 relative ">
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
            {errors.email && (
              <span className="text-red-600 absolute w-full required text-sm">
                {errors.email}
              </span>
            )}
          </div>

          <div className="w-full lg:w-1/3 relative">
            <label>Contact Number</label>
            <input
              className="input input-bordered w-full border-slate-400 contact-field"
              placeholder="Contact Number"
              name="contact"
              type="number"
              onKeyDown={(evt) =>  (evt.key.match(/^[0-9]$/) || evt.key === 'Backspace' || evt.key === 'Tab') || evt.preventDefault()}
              value={item.contact}
              onChange={(e) =>
                onChangeInputValue(
                "contact",
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            />
            {errors.contact && (
              <span className="text-red-600 absolute w-full required text-sm">
                {errors.contact}
              </span>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <label>Currency</label>
            <div className="flex justify-center border-slate-400 input input-bordered px-0 items-center relative">
              <label className="absolute bg-white mt-3 uppercase w-16 left-0 text-center self-start ">
                {item.currency}
              </label>
              <select
                className="w-full focus:outline-none "
                value={item.currency}
                onChange={(e) =>
                  onChangeInputValue("currency", e.target.value.toUpperCase())
                }
              >
                <option disabled value="" className="currency">
                  {" "}
                  Choose Currency{" "}
                </option>
                <option value="usd" className="currency" style={{ display: "none", height: 0, padding: 0 }}>
                  USD
                </option>
                <option value="USD"  className="currency">
                  USD
                </option>
                <option value="PHP" className="currency">
                  PHP
                </option>
                
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
  errors,
  currency,
}) => {
  const[editGoals, setEditGoals] = useState(true);
  // const [inputValuesGoal, setInputValuesGoal] = useState([]);

  // useEffect(() => {
  //   const storedValueGoal = localStorage.getItem('inputValuesGoals');
  //   if (storedValueGoal) {
  //     setInputValuesGoal(JSON.parse(storedValueGoal));
  //     onChangeValues(inputValuesGoal);
  //     console.log(inputValuesGoal)
  //   }
  // }, []);
  // console.log(inputValuesGoal)
  const onChangeInputValue = (key, value) => {
    // setInputValuesGoal({ ...inputValuesGoal, [key]: value });
    // localStorage.setItem('inputValuesGoals', JSON.stringify({ ...inputValuesGoal, [key]: value }));
    item[key] = value;
    onChangeValues(item);
  };

  const onSearch = (searchTerm) => {
    onChangeInputValue("goal", searchTerm);
    if (searchTerm===""){
      setEditGoals(false)
    }
    if(searchTerm==="luxury car"){
      setEditGoals(true)
    }
    if(searchTerm==="house"){
      setEditGoals(true)
    }
    if(searchTerm==="savings"){
      setEditGoals(true)
    }
  };

  const[curSymbol, setCurSymbol]= useState();


  useEffect(() => {
    if(item.currency == 'USD'){
      setCurSymbol('$')
    }else{
      setCurSymbol('₱')
    }
  },[currency])
  console.log(currency);
  
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-5 md:gap-2 lg:gap-10 items-center relative">
          <div className="w-full md:w-[75%] lg:w-[68%]">
            <label className="my-3">Goals</label>
            <div className="search-container relative">
              <div className="search-inner relative input input-bordered border-slate-400 px-0">
                <input
                  type="text"
                  disabled = {editGoals}
                  value={item.goal}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 h-full ml-4 md:ml-4 border-slate-400 focus:outline-none capitalize mr-4 md:mr-2"
                  placeholder="Goal"
                />

                <select
                  className="input border-none focus:outline-none w-full ml-4 md:mx-0 h-full"
                  value={item.goal}
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
                  <option value="luxury car" className="capitalize">
                    Luxury Car
                  </option>
                  <option value="" className="capitalize">
                    Customize...
                  </option>
                </select>
              </div>
              {errors?.goal && (
                <span className="text-red-600 top-px text-sm absolute w-full required">
                  {errors?.goal}
                </span>
              )}
              <div className="dropdown relative">
                {data
                  .filter((goalItem) => {
                    const searchTerm = item?.goal?.toLowerCase();
                    const fullName = goalItem.full_name.toLowerCase();
                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((goalItem) => (
                    <div
                      onClick={() => onSearch(goalItem.full_name)}
                      className="dropdown-row absolute"
                      key={goalItem.full_name}
                    >
                      {goalItem.full_name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-[33%] lg:w-[32%] pr-0 md:pr-8">
            <label>Amount</label>
            <div className="flex items-center border-slate-400 relative">
              <div className="flex justify-center rounded-r-none w-1/3 md:w-1/4 input input-bordered border-black items-center ">
                <p className="text-center">{currency}</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-full rounded-l-none border-slate-400 focus:outline-none"
                value={item.amount}
                onChange={(e) => onChangeInputValue("amount", e.target.value)}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                min={0}
              />
              {errors?.amount && (
                <span className="text-red-600 text-sm absolute top-px w-full required">
                  {errors?.amount}
                </span>
              )}

              {isDeletedButtonVisible && (
                <span
                  className="cursor-pointer ml-4 md:mt-5 block md:hidden "
                  onClick={handleRemoveGoal}
                >
                  <BsTrash className="text-[#A0161B]"></BsTrash>
                </span>
              )}
            </div>
          </div>
          
          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5 hidden md:block absolute delbutton  ml-10"
              onClick={handleRemoveGoal}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>
           
       {isLast && 
          
          <div
            className="flex flex-col gap-3 md:flex-row items-start md:items-center justify-between cursor-pointer mt-2 "
            onClick={addNewGoal}
          >
            <div className="flex items-center gap-2 border-b">
              <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
              <p className="text-sm text-[#A0161B]">Add Another Goal</p>
            </div>

            <div className="flex ">
              <p className="text-sm ">
                Total Goal Amount:
                {(currency == 'USD'? '$' : '₱') + 
                goalSum
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
       }
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
  errors,
}) => {
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-6 mb-7">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-5 md:gap-2 lg:gap-10 items-center relative ">
          <div className="w-full lg:w-1/3 relative">
            <label>First Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="First Name"
              name="firstnamedependent"
              type="text"
              value={item.firstnamedependent}
              onChange={(e) =>
                onChangeInputValue("firstnamedependent", e.target.value)
              }
            />

            <span className="text-red-600 text-sm absolute w-full required">
              {errors?.firstnamedependent}
            </span>
          </div>

          <div className="w-full lg:w-1/3 relative">
            <label>Last Name</label>
            <input
              className="input input-bordered w-full border-slate-400"
              placeholder="Last Name"
              name="lastnamedependent"
              type="text"
              value={item.lastnamedependent}
              onChange={(e) =>
                onChangeInputValue("lastnamedependent", e.target.value)
              }
            />
            <span className="text-red-600 text-sm absolute w-full required">
              {errors?.lastnamedependent}
            </span>
          </div>

          <div className="w-full lg:w-1/3 pr-0 md:pr-8 relative">
            <label>Age</label>
            <input
              name="agedependent"
              placeholder="Age"
              className="input input-bordered w-full border-slate-400"
              value={item.agedependent}
              onChange={(e) =>
                onChangeInputValue(
                  "agedependent",
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              min={1}
              max={99}
              type="text"
              maxLength="2"
            />
            <span className="text-red-600 text-sm absolute w-full required">
              {errors?.agedependent}
            </span>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer -mt-6 md:mt-5 hidden md:block delbutton absolute ml-10"
              onClick={handleRemoveNameDependent}
            >
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-10">
          <div className="w-full lg:w-1/3">
            <label>Relationship</label>
            <div className="flex flex items-center mr-0 lg:mr-7 pr-0 relative">
              <input
                className="input input-bordered w-full border-slate-400"
                placeholder="Relationship"
                name="relationship"
                type="text"
                value={item.relationship}
                onChange={(e) =>
                  onChangeInputValue("relationship", e.target.value)
                }
              />
              {isDeletedButtonVisible && (
                <span
                  className="cursor-pointer ml-4 md:mt-5 block md:hidden "
                  onClick={handleRemoveNameDependent}
                >
                  <BsTrash className="text-[#A0161B]"></BsTrash>
                </span>
              )}

              <span className="text-red-600 text-sm absolute w-full required top-[1px]">
                {errors?.relationship}
              </span>
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

const InputAssets = ({
  isLast,
  item,
  onChangeValues,
  addNewAsset,
  handleRemoveAsset,
  isDeletedButtonVisible,
  errors,
  currency,
}) => {

  const[editAssets, setEditAssets] = useState(true) 
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  const onSearch = (searchTerm) => {
    onChangeInputValue("asset", searchTerm);
    if (searchTerm===""){
      setEditAssets(false)
    }
    if(searchTerm==="home"){
      setEditAssets(true)
    }
    if(searchTerm==="investments"){
      setEditAssets(true)
    }
    if(searchTerm==="Business Value"){
      setEditAssets(true)
    }
  };

  return (
    <div className="flex gap-10 flex-col mb-5">
      <div className="flex flex-col justify-between w-full gap-6 md:gap-4 ">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-4 md:gap-2 lg:gap-10 items-start pr-0 md:pr-10 h-[210px] md:h-[70px]">
          <div className="w-full lg:w-1/2 ">
            <label>Asset</label>

            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  disabled = {editAssets}
                  value={item.asset}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  style={{ borderColor: "#8A8A8E" }}
                  placeholder="Asset"
                />
                <select
                  className="input input-bordered w-full border-slate-400"
                  value={item.asset}
                  onChange={(e) => onSearch(e.target.value)}
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
                  <option value="" className="capitalize">
                    Customize...
                  </option>
                </select>

                <span className="text-red-600 text-sm absolute w-full required">
                  {errors?.asset}
                </span>
              </div>

              <div className="dropdown relative">
                {assetsdata
                  .filter((assetItem) => {
                    const searchTerm = item?.asset?.toLowerCase();
                    const fullName = assetItem.full_name.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((assetItem) => (
                    <div
                      onClick={() => onSearch(assetItem.full_name)}
                      className="dropdown-row absolute"
                      key={assetItem.full_name}
                    >
                      {assetItem.full_name}
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
                    onChangeInputValue(
                      "assetmultiplier",
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                />
              </div>
              <ErrorText value={errors?.assetmultiplier} />
            </div>
            <div className="w-full lg:w-3/4">
              <label>Amount</label>
              <div className="flex items-center border-slate-400 w-full items-center relative">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  <p className="text-center">{currency}</p>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full md:w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) =>
                    onChangeInputValue(
                      "amount",
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                />

                {isDeletedButtonVisible && (
                  <span
                    className="cursor-pointer block lg:hidden ml-4 "
                    onClick={handleRemoveAsset}
                  >
                    <BsTrash className="text-[#A0161B]"></BsTrash>
                  </span>
                )}

                <span className="text-red-600 text-sm absolute w-full required top-[2px]">
                  {errors?.amount}
                </span>
              </div>
            </div>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer hidden lg:block mt-10 absolute left-[80.5%]"
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
    </div>
  );
};

const InputLiabilities = ({
  isLast,
  item,
  onChangeValues,
  addNewLiability,
  handleRemoveLiability,
  isDeletedButtonVisible,
  errors,
  currency,
}) => {
  const[editLiabilities, setEditLiabiliities] = useState(true);
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  const onSearch = (searchTerm) => {
    onChangeInputValue("liability", searchTerm);
    if (searchTerm===""){
      setEditLiabiliities(false)
    }
    if(searchTerm==="mortgage"){
      setEditLiabiliities(true)
    }
    if(searchTerm==="credit card"){
      setEditLiabiliities(true)
    }
    if(searchTerm==="Student Debt"){
      setEditLiabiliities(true)
    }
  };

  return (
    <div className="flex gap-10 flex-col mb-5">
      <div className="flex flex-col justify-between w-full gap-6 md:gap-4">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-4 md:gap-2 lg:gap-10 items-start pr-0 md:pr-10 h-[210px] md:h-[70px]">
          <div className="w-full lg:w-1/2 ">
            <label>Liability</label>

            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  value={item.liability}
                  disabled={editLiabilities}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  placeholder="Liability"
                  style={{ borderColor: "#8A8A8E" }}
                />
                <select
                  className="input input-bordered w-full border-slate-400"
                  value={item.liability}
                  onChange={(e) => onSearch(e.target.value)}
                >
                  <option disabled value="">
                    {" "}
                    Choose a Goal{" "}
                  </option>
                  <option value="mortgage" className="capitalize">
                    Mortgage
                  </option>
                  <option value="credit card" className="capitalize">
                    Credit Card
                  </option>
                  <option value="Student Debt" className="capitalize">
                    Student Debt
                  </option>
                  <option value="" className="capitalize">
                    Customize...
                  </option>
                </select>

                <span className="text-red-600 text-sm absolute w-full required">
                  {errors?.liability}
                </span>
              </div>

              <div className="dropdown relative">
                {liabilitiesdata
                  .filter((liabilityItem) => {
                    const searchTerm = item?.liability?.toLowerCase();
                    const fullName = liabilityItem.full_name.toLowerCase();

                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((liabilityItem) => (
                    <div
                      onClick={() => onSearch(liabilityItem.full_name)}
                      className="dropdown-row absolute"
                      key={liabilityItem.full_name}
                    >
                      {liabilityItem.full_name}
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
                  name="liabilitymultiplier"
                  type="number"
                  placeholder="0"
                  className="input w-full input-bordered border-slate-400"
                  value={item.liabilitymultiplier}
                  onChange={(e) =>
                    onChangeInputValue(
                      "liabilitymultiplier",
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                />
              </div>
              <ErrorText value={errors?.liabilitymultiplier} />
            </div>
            <div className="w-full lg:w-3/4">
              <label>Amount</label>
              <div className="flex items-center border-slate-400 w-full items-center relative">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  <p className="text-center">{currency}</p>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full md:w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) =>
                    onChangeInputValue(
                      "amount",
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                />

                {isDeletedButtonVisible && (
                  <span
                    className="cursor-pointer block lg:hidden ml-4"
                    onClick={handleRemoveLiability}
                  >
                    <BsTrash className="text-[#A0161B]"></BsTrash>
                  </span>
                )}

                <span className="text-red-600 text-sm top-[3px] absolute w-full required">
                  {errors?.amount}
                </span>
              </div>
            </div>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer hidden lg:block absolute left-[80.5%] mt-10"
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
    </div>
  );
};

const InputExp = ({ item, onChangeValues, currency, errors }) => {
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4 bordertop ">
        <div className="flex flex-col  w-full gap-2 md:gap-5 lg:gap-10 items-center mt-10">
          <div className="flex flex-col w-full gap-2 pb-8 pr-0 md:pr-10">
            <p className="font-bold my-0">Monthly Expenses</p>
            <div className="flex flex-col lg:flex-row w-full gap-5 md:gap-3 lg:gap-10">

              <div className="w-full lg:w-1/2">
                <label>Monthly Expenses</label>
                <div className="flex items-center border-slate-400 relative">
                  <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                    {currency}
                  </div>
                  <input
                    name="amount"
                    type="number"
                    className="input w-full rounded-l-none border-slate-400"
                    value={item.amount}
                    onChange={(e) =>
                      onChangeInputValue(
                        "amount",
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />

                  <span className="text-red-600 text-sm absolute w-full required top-[3px]">
                    {errors?.amount}
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative">
                <label>Multiplier</label>
                <div className="flex items-center border-slate-400">
                  <input
                    name="multiplierrev"
                    type="number"
                    className="input input-bordered w-full border-slate-400"
                    value={item.multiplier}
                    onChange={(e) =>
                      onChangeInputValue(
                        "multiplier",
                        e.target.value.replace(/[^0-9.]/g, "")
                      )
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                  <span className="text-red-600 text-sm absolute w-full required top-[18px]">
                    {errors?.multiplier}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InputRev = ({ item, onChangeValues, currency, errors }) => {
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-4 bordertop ">
        <div className="flex flex-col  w-full gap-2 md:gap-5 lg:gap-10 items-center mt-10">
          <div className="flex flex-col  w-full gap-2 pb-8 pr-0 md:pr-10">
            <p className="font-bold my-0">Monthly Revenue</p>
            <div className="flex flex-col lg:flex-row w-full gap-5 md:gap-3 lg:gap-10">
              
              <div className="w-full lg:w-1/2 relative">
                <label>Monthly Revenue</label>
                <div className="flex items-center border-slate-400">
                  <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                    {currency}
                  </div>
                  <input
                    name="amount"
                    type="number"
                    className="input w-full rounded-l-none border-slate-400"
                    value={item.amount}
                    onChange={(e) =>
                      onChangeInputValue(
                        "amount",
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
                <span className="text-red-600 text-sm absolute w-full required top-[21px]">
                  {errors?.amount}
                </span>
              </div>

              <div className="w-full lg:w-1/2">
                <label>Multiplier</label>
                <div className="flex items-center border-slate-400">
                  <input
                    name="multiplierrev"
                    type="number"
                    className="input input-bordered w-full border-slate-400"
                    value={item.multiplier}
                    onChange={(e) =>
                      onChangeInputValue(
                        "multiplier",
                        e.target.value.replace(/[^0-9.]/g, "")
                      )
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
                <ErrorText value={errors?.multiplier} />
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
  const handleSubmit = () => {
    try {
      console.log(personalDetails);
      const tempErrors = {
        firstname: checkString(
          personalDetails.firstname,
          "First Name is required"
        ),
        lastname: checkString(
          personalDetails.lastname,
          "Last Name is required"
        ),
        agenew: checkAge(personalDetails.agenew),
        email: checkEmail(personalDetails.email),
        contact: checkString(personalDetails.contact, "Contact is required"),
      };

      /// validating and setting error message for dependents array
      const tempDepsErrorsArray = [];
      /// loop first
      for (const dependent of dependents) {
        /// set dependent error object
        console.log(dependent);
        const tempDepErrors = {
          firstnamedependent: checkString(
            dependent.firstnamedependent,
            "First Name is required"
          ),
          lastnamedependent: checkString(
            dependent.lastnamedependent,
            "Last Name is required"
          ),
          agedependent: checkAge(dependent.agedependent),
          relationship: checkString(
            dependent.relationship,
            "Relationship Name is required"
          ),
        };
        /// and push on temporary array
        tempDepsErrorsArray.push(tempDepErrors);
      }

      /// validating and setting error message for goals array
      const tempGoalsErrorsArray = [];
      /// loop first
      for (const goal of goals) {
        /// set goal error object
        const tempGoalsErrors = {
          amount: checkAmount(goal.amount, goal.goal),
          goal:
            goal.goal === "" && (!goal.amount === "" || goal.amount > 0)
              ? "Goal is required"
              : "",
          currency: goal.currency === "" ? "Currency is required" : "",
        };
        /// and push on temporary array
        tempGoalsErrorsArray.push(tempGoalsErrors);
      }
      console.log(tempGoalsErrorsArray);
      console.log(tempDepsErrorsArray);
      /// set errors to usestates
      setGoalsErrors(tempGoalsErrorsArray);
      setErrors(tempErrors);
      setDepErrors(tempDepsErrorsArray);

      const isEmptyPersonalDetails = checkIsEmptyObjects(tempErrors);
      const isEmptyGoals = checkIsEmptyArrayObjects(tempGoalsErrorsArray);
      const isEmptyDeps = checkIsEmptyArrayObjects(tempDepsErrorsArray);

      if (isEmptyPersonalDetails && isEmptyGoals && isEmptyDeps) {
        setData({
          names: personalDetails,
          dependents: dependents,
          goalsData: goals,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    agenew: "",
    email: "",
    contact: "",
    currency: "",
  });
  
  const [goalsErrors, setGoalsErrors] = useState([
    {
      amount: "",
      goal: "",
      currency: "",
    },
  ]);

  const [depErrors, setDepErrors] = useState([
    {
      firstnamedependent: "",
      lastnamedependent: "",
      agedependent: "",
      relationship: "",
    },
  ]);

  const [personalDetails, setpersonalDetails] = useState({
    firstname: "",
    lastname: "",
    agenew: "",
    email: "",
    contact: "",
    currency: "USD",
  });
  
  const initialGoalState = {
    amount: 0.0,
    goal: "",
    currency: personalDetails.currency?.toUpperCase(),
  };

  const [goals, setGoals] = useState([]);
  const [dependents, setDependents] = useState([]);

  
  const goalSum = goals.reduce((accumulator, item) => {
    return accumulator + Number(item.amount);
  }, 0);

  const [goalsum, setGoalSum] = useState(0);

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
        lastnamedependent: "",
        agedependent: "",
        relationship: "",
      },
    ]);
  };

  const handleRemoveNameDependent = (index) => {
    const values = [...dependents];
    values.splice(index, 1);
    setDependents(values);
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

  const[testflag, setTestFlag] = useState()
  useEffect(() => {
    const storedValuePersonal = localStorage.getItem('personalDetails');
    if (storedValuePersonal) {
      setpersonalDetails(JSON.parse(storedValuePersonal));
      setTestFlag(true);
    }
  }, []);
  
  useEffect(() => {
    const storedValueDependents = localStorage.getItem('dependents');
    if(storedValueDependents){
      setDependents(JSON.parse(storedValueDependents))
    }
  },[])


 
  

  useEffect(() => {
    const resetPersonalbtn = document.querySelector('.resetPersonal-btn');
    
    function handleResetClick() {
      setpersonalDetails({
        firstname: "",
        lastname: "",
        agenew: "",
        email: "",
        contact: "",
        currency: "USD",
      });
      setGoals([initialGoalState]);
      setDependents([]);
      localStorage.removeItem('personalDetails');
      localStorage.removeItem('goals');
      localStorage.removeItem('dependents');
    }

    resetPersonalbtn.addEventListener('click', handleResetClick);

    return () => {
      resetPersonalbtn.removeEventListener('click', handleResetClick);
    }
  }, []);



  useEffect(() => {
    const temporaryGoalsArray = [...goals];
    temporaryGoalsArray.map(
      (goal, index) => (goal.currency = personalDetails.currency?.toUpperCase())
    );
    setGoals(temporaryGoalsArray);
  }, [personalDetails]);


  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const tabEvent = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: 'tab',
        });
      console.log(document.activeElement);
      event.target.dispatchEvent(tabEvent);
    }};

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [errors]);

  useEffect(() => {
    const storedValueGoals = localStorage.getItem('goals');
    console.log(storedValueGoals);
    if(storedValueGoals){
      console.log("triggered")
      const parsedGoals = JSON.parse(storedValueGoals);
      setGoals(parsedGoals);
      console.log(goals) ;
    }else{
      console.log("triggered else")
      setGoals([initialGoalState]);
    }
  },[])

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 px-16">
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-0 md:px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="px-0 w-full">
          <InputNames
            item={personalDetails}
            errors={errors}
            onChangeValues={(data) => {
              const tempErrors = {
                firstname: "",
                lastname: "",
                agenew: "",
                email: "",
                contact: "",
              };
              setErrors(tempErrors);
              setpersonalDetails(data);
              localStorage.setItem('personalDetails', JSON.stringify(personalDetails))
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
                  // set goals data
                  var goalsTemporary = [...goals];
                  goalsTemporary[index] = data;
                  setGoals(goalsTemporary);
                  // set goals errors to empty
                  const tempGoalsErrorsArray = [];
                  goalsTemporary.map((e) =>
                    tempGoalsErrorsArray.push({
                      goal: "",
                      amount: "",
                      currency: "",
                    })
                  );
                  localStorage.setItem('goals', JSON.stringify(goals))
                  setGoalsErrors(tempGoalsErrorsArray);
                  
                }}
                addNewGoal={addNewGoal}
                handleRemoveGoal={() => handleRemoveGoal(index)}
                isDeletedButtonVisible={goals.length - 1 > 0}
                isLast={goals.length - 1 === index}
                goalSum={goalSum}
                errors={goalsErrors[index]}
                currency={personalDetails.currency}
              />
            </div>
          ))}
        </div>
        {dependents.length > 0 ? (
          <div className="w-full">
            <p className="font-bold">Dependents</p>
            {dependents.map((item, index) => (
              <div key={index} className="px-0 w-full">
                <InputDependents
                  item={item}
                  onChangeValues={(data) => {
                    var dependentsTemporary = [...dependents];
                    dependentsTemporary[index] = data;
                    setDependents(dependentsTemporary);
                    const tempDependentsErrorsArray = [];
                    dependentsTemporary.map((e) =>
                      tempDependentsErrorsArray.push({
                        firstnamedependent: "",
                        lastnamedependent: "",
                        agedependent: "",
                        relationship: "",
                      }) 
                    );
                    localStorage.setItem('dependents', JSON.stringify(dependents))
                    console.log(dependents)
                    setDepErrors(tempDependentsErrorsArray);
                  }}
                  addNewNameDependent={addNewNameDependent}
                  handleRemoveNameDependent={() =>
                    handleRemoveNameDependent(index)
                  }
                  errors={depErrors[index]}
                  isDeletedButtonVisible={true}
                  isLast={dependents.length - 1 === index}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex items-start gap-7">
            <p className="font-bold">Dependents</p>
            <div
              className="flex items-start cursor-pointer  py-0 "
              onClick={addNewNameDependent}
            >
              <div className="flex items-center gap-2 border-b py-0">
                <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
                <p className="text-sm text-[#A0161B]">Add Another Dependent</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => handleSubmit()}
          className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
        >
          Next Step
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-8/12">
        <div className="col-span-1"></div>
        <div className="col-span-1 flex justify-center">
          <a href="/calculate" className="flex justify-center text-center items-center  gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
        </div>
        <div className="col-span-1 flex justify-content-end">
          <input
            type="submit"
            className="resetPersonal-btn py-3 w-full rounded-md bg-white text-[#A0161B] cursor-pointer text-right"
            value="Reset"
          />
        </div>
      </div>
    </div>
  );
}

function AssetsForm({ currency, setData, goBack }) {
  const initialAssetData = {
    asset: "",
    amount: 0.0,
    assetmultiplier: 1,
  };

  const [assetsData, setAssetsData] = useState({
    assets: [initialAssetData],
    rev: {
      multiplier: 1,
      amount: 0,
    },
  });
  const [assetsDataErrors, setAssetsDataErrors] = useState({
    assets: [
      {
        asset: "",
        amount: "",
        assetmultiplier: "",
      },
    ],
    rev: {
      multiplier: "",
      amount: "",
    },
  });

  // Structure will be this
  // {
  //   assets : [],
  //   rev: {
  //     revmultiplier: 0 ,
  //     revamount: 0
  //  }
  // }

  const handleSubmit = () => {
    /// loop first
    var tempAssetsErrorsObject = {};
    /// set asset error object
    /// validating and setting error message for assets array
    var tempAssetsErrorsArray = [];
    for (const asset of assetsData.assets) {
      /// set asset error object
      const tempAssetsErrors = {
        asset:
          asset.asset === "" && (!asset.amount === "" || asset.amount > 0)
            ? "Asset is required"
            : "",
        amount: checkAmount(asset.amount, asset.asset),
        assetmultiplier: asset.assetmultiplier === "" ? "Amount required" : "",
      };
      /// and push on temporary array
      tempAssetsErrorsArray.push(tempAssetsErrors);
    }
    tempAssetsErrorsObject = {
      assets: tempAssetsErrorsArray,
      rev: {
        amount: checkString(
          assetsData.rev.amount.toString(),
          "Amount is required"
        ),
        multiplier: checkString(
          assetsData.rev.multiplier.toString(),
          "Multiplier is required"
        ),
      },
    };
    console.log(tempAssetsErrorsObject);
    /// set errors to usestates
    setAssetsDataErrors(tempAssetsErrorsObject);

    const isEmptyAssets = checkIsEmptyArrayObjects(
      tempAssetsErrorsObject.assets
    );
    const isEmptyRevAmount = tempAssetsErrorsObject.rev.amount === "";
    const isEmptyRevMultiplier = tempAssetsErrorsObject.rev.multiplier === "";

    if (isEmptyAssets && isEmptyRevAmount && isEmptyRevMultiplier) {
      setData(assetsData);
    }
  };

  const addNewAsset = () => {
    setAssetsData((prevAssets) => ({
      ...prevAssets,
      assets: [...assetsData.assets, initialAssetData],
    }));
  };

  const handleRemoveAsset = (index) => {
    if (assetsData.assets.length !== 1) {
      const values = [...assetsData.assets];
      values.splice(index, 1);
      setAssetsData((prevAssets) => ({
        ...prevAssets,
        assets: values,
      }));
    }
  };

  useEffect(() => {
    const resetAssetsbtn = document.querySelector('.resetAssets-btn');
    
    function handleResetClick() {
      setAssetsData({
        assets: [initialAssetData],
        rev: {
          multiplier: 1,
          amount: 0,
        },
      });
      localStorage.removeItem('assets');
    }

    resetAssetsbtn.addEventListener('click', handleResetClick);

    return () => {
      resetAssetsbtn.removeEventListener('click', handleResetClick);
    }
  }, []);

  useEffect(() => {
    const storedValueAssets = localStorage.getItem('assets');
    if(storedValueAssets){
      setAssetsData(JSON.parse(storedValueAssets))
    }
  },[])


  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 ">
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400  px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="w-full flex justify-between">
          <p className="font-bold text-center md:text-left">
            Assets Info
          </p>

          <label htmlFor="asset">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="asset" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="asset"
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

        {assetsData.assets.map((item, index) => (
          <div key={index} className="px-0 w-full ">
            <InputAssets
              item={item}
              onChangeValues={(data) => {
                var assetsTemporary = [...assetsData.assets];
                assetsTemporary[index] = data;
                setAssetsData((prev) => ({ ...prev, assets: assetsTemporary }));
                localStorage.setItem('assets', JSON.stringify(assetsData));
              }}
              addNewAsset={addNewAsset}
              handleRemoveAsset={() => handleRemoveAsset(index)}
              isLast={assetsData.assets.length - 1 === index}
              isDeletedButtonVisible={assetsData.assets.length - 1 > 0}
              errors={assetsDataErrors.assets[index]}
              currency={currency}
              
            />
          </div>
        ))}
        <div className="px-0 w-full">
          <InputRev
            item={assetsData.rev}
            onChangeValues={(data) => {
              setAssetsData((prev) => ({ ...prev, rev: data }));
              localStorage.setItem('assets', JSON.stringify(assetsData));
            }}
            currency={currency}
            errors={assetsDataErrors.rev}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center md:justify-end gap-3 lg:gap-12  w-full">
          <div
            className="flex items-center cursor-pointer gap-2 justify-center"
            onClick={goBack}
          >
            <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
            <p className="text-[#A0161B] font-bold">Go Back</p>
          </div>

          <button
            onClick={() => handleSubmit()}
            className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-8/12">
        <div className="col-span-1"></div>
        <div className="col-span-1 flex justify-center">
          <a href="/calculate" className="flex justify-center text-center items-center  gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
        </div>
        <div className="col-span-1 flex justify-content-end">
          <input
            type="submit"
            className="resetAssets-btn py-3 w-full rounded-md bg-white text-[#A0161B] cursor-pointer text-right"
            value="Reset"
          />
        </div>
      </div>
    </div>
  );
}

function LiabilitiesForm({ currency, setData, goBack }) {
  const initialLiabilityData = {
    liability: "",
    amount: 0.0,
    liabilitymultiplier: 1,
  };

  const [liabilitiesData, setLiabilitiesData] = useState({
    liabilities: [initialLiabilityData],
    revexp: {
      multiplier: 1,
      amount: 0,
    },
  });
  const [liabilitiesDataErrors, setLiabilitiesDataErrors] = useState({
    liabilities: [
      {
        liability: "",
        amount: "",
        liabilitymultiplier: "",
      },
    ],
    revexp: {
      multiplier: "",
      amount: "",
    },
  });

  // Structure will be this
  // {
  //   liabilities : [],
  //   revexp: {
  //     multiplier: 0 ,
  //     amount: 0
  //  }
  // }

  const handleSubmit = () => {
    /// loop first
    var tempLiabilitiesErrorsObject = {};
    /// set liabilities error object
    /// validating and setting error message for liabilities array
    var tempLiabilitiesErrorsArray = [];
    for (const liabilities of liabilitiesData.liabilities) {
      /// set liabilities error object
      const tempLiabilitiesErrors = {
        liability:
          liabilities.liability === "" &&
          (!liabilities.amount === "" || liabilities.amount > 0)
            ? "Liability is required"
            : "",
        amount: checkAmount(liabilities.amount, liabilities.liability),
        liabilitymultiplier:
          liabilities.liabilitymultiplier === ""
            ? "Multiplier is required"
            : "",
      };
      /// and push on temporary array
      tempLiabilitiesErrorsArray.push(tempLiabilitiesErrors);
      localStorage.removeItem('personalDetails');
      localStorage.removeItem('goals');
      localStorage.removeItem('dependents');
      localStorage.removeItem('assets');
      localStorage.removeItem('liabilities');
    }
    tempLiabilitiesErrorsObject = {
      liabilities: tempLiabilitiesErrorsArray,
      revexp: {
        amount: checkString(
          liabilitiesData.revexp.amount.toString(),
          "Amount is required"
        ),
        multiplier: checkString(
          liabilitiesData.revexp.multiplier.toString(),
          "Multiplier is required"
        ),
      },
    };
    console.log(tempLiabilitiesErrorsObject);
    /// set errors to usestates
    setLiabilitiesDataErrors(tempLiabilitiesErrorsObject);

    const isEmptyLiabilities = checkIsEmptyArrayObjects(
      tempLiabilitiesErrorsObject.liabilities
    );
    const isEmptyRevAmount = tempLiabilitiesErrorsObject.revexp.amount === "";
    const isEmptyRevMultiplier =
      tempLiabilitiesErrorsObject.revexp.multiplier === "";

    if (isEmptyLiabilities && isEmptyRevAmount && isEmptyRevMultiplier) {
      setData(liabilitiesData);
    }
  };

  const addNewLiability = () => {
    setLiabilitiesData((prevLiabilities) => ({
      ...prevLiabilities,
      liabilities: [...liabilitiesData.liabilities, initialLiabilityData],
    }));
  };

  const handleRemoveLiability = (index) => {
    if (liabilitiesData.liabilities.length !== 1) {
      const values = [...liabilitiesData.liabilities];
      values.splice(index, 1);
      setLiabilitiesData((prevLiabilities) => ({
        ...prevLiabilities,
        liabilities: values,
      }));
    }
  };
  useEffect(() => {
    const resetLiabilitiesbtn = document.querySelector('.resetLiabilities-btn');
    
    function handleResetClick() {
      setLiabilitiesData({
        liabilities: [initialLiabilityData],
        revexp: {
          multiplier: 1,
          amount: 0,
        },
      });
      localStorage.removeItem('liabilities');
    }

    resetLiabilitiesbtn.addEventListener('click', handleResetClick);

    return () => {
      resetLiabilitiesbtn.removeEventListener('click', handleResetClick);
    }
  }, []);

  useEffect(() => {
    const storedValueLiabilities= localStorage.getItem('liabilities');
    if(storedValueLiabilities){
      setLiabilitiesData(JSON.parse(storedValueLiabilities))
    }
  },[])

  return (
    <div className="w-full justify-center items-center flex flex-col gap-3 ">
      <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400  px-7 py-7 rounded-lg shadow-none lg:shadow-md">
        <div className="w-full flex justify-between">
          <p className="font-bold text-center md:text-left">
            Liabilities Management
          </p>

          <label htmlFor="liabilities">
            <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
          </label>
        </div>

        <input type="checkbox" id="liabilities" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="liabilities"
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

        {liabilitiesData.liabilities.map((item, index) => (
          <div key={index} className="px-0 w-full ">
            <InputLiabilities
              item={item}
              onChangeValues={(data) => {
                var liabilitiesTemporary = [...liabilitiesData.liabilities];
                liabilitiesTemporary[index] = data;
                setLiabilitiesData((prev) => ({
                  ...prev,
                  liabilities: liabilitiesTemporary,
                }));
                localStorage.setItem('liabilities', JSON.stringify(liabilitiesData));
              }}
              addNewLiability={addNewLiability}
              handleRemoveLiability={() => handleRemoveLiability(index)}
              isLast={liabilitiesData.liabilities.length - 1 === index}
              isDeletedButtonVisible={
                liabilitiesData.liabilities.length - 1 > 0
              }
              errors={liabilitiesDataErrors.liabilities[index]}
              currency={currency}
            />
          </div>
        ))}
        <div className="px-0 w-full">
          <InputExp
            item={liabilitiesData.revexp}
            onChangeValues={(data) => {
              setLiabilitiesData((prev) => ({ ...prev, revexp: data }));
              localStorage.setItem('liabilities', JSON.stringify(liabilitiesData));
            }}
            currency={currency}
            errors={liabilitiesDataErrors.revexp}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center md:justify-end gap-3 lg:gap-12 w-full">
          <div
            className="flex items-center cursor-pointer gap-2 justify-center"
            onClick={goBack}
          >
            <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
            <p className="text-[#A0161B] font-bold">Go Back</p>
          </div>

          <button
            onClick={() => handleSubmit()}
            className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-center md:self-end"
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-8/12">
        <div className="col-span-1"></div>
        <div className="col-span-1 flex justify-center">
          <a href="/calculate" className="flex justify-center text-center items-center  gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
        </div>
        <div className="col-span-1 flex justify-content-end">
          <input
            type="submit"
            className="resetLiabilities-btn py-3 w-full rounded-md bg-white text-[#A0161B] cursor-pointer text-right"
            value="Reset"
          />
        </div>
      </div>
    </div>
  );
}

// function LiabilitiesForm({ currency, setData, goBack }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setData({
//       liabilities: liabilities,
//       revexp: revexp,
//     });
//   };

//   const initialRevenueData = {
//     expenses: 0.0,
//     multiplierexp: 1,
//     currency: currency?.toUpperCase(),
//   };

//   const [revexp, setRevexp] = useState([initialRevenueData]);

//   const initialLiabilitiesData = {
//     liability: "",
//     amount: 0.0,
//     liabilitymultiplier: 1,
//     currencyliability: currency?.toUpperCase(),
//   };

//   const [liabilities, setLiability] = useState([initialLiabilitiesData]);

//   useEffect(() => {
//     setLiability((prevLiability) => {
//       const tempLiability = [...prevLiability];
//       tempLiability.map((e) => (e.currencyliability = currency?.toUpperCase()));
//       return tempLiability;
//     });
//     setRevexp((prevRev) => {
//       const tempRev = [...prevRev];
//       tempRev.map((e) => (e.currency = currency?.toUpperCase()));
//       return tempRev;
//     });
//   }, [currency]);

//   const addNewLiability = () => {
//     setLiability([...liabilities, initialLiabilitiesData]);
//   };

//   const handleRemoveLiability = (index) => {
//     if (liabilities.length !== 1) {
//       const values = [...liabilities];
//       values.splice(index, 1);
//       setLiability(values);
//     }
//   };

//   return (
//     <div className="w-full justify-center items-center flex flex-col gap-3">
//       <div className="w-full md:w-11/12 lg:w-8/12 justify-center items-center flex flex-col gap-3 shadow-gray-400 px-7 py-7 rounded-lg shadow-none lg:shadow-md">
//         <div className="w-full flex justify-between">
//           <p className="font-bold text-center md:text-left">
//             Liability Management
//           </p>
//           <label htmlFor="liability" className="">
//             <IoMdInformationCircle className="text-2xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
//           </label>
//         </div>

//         <input type="checkbox" id="liability" className="modal-toggle" />
//         <div className="modal">
//           <div className="modal-box relative">
//             <label
//               htmlFor="liability"
//               className="btn btn-sm btn-circle absolute right-2 top-2"
//             >
//               ✕
//             </label>
//             <h3 className="text-lg font-bold text-center">
//               Lorem ipsum dolor sit amet
//             </h3>
//             <p className="py-4 text-center">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat.
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={(e) => {
//             handleSubmit(e);
//           }}
//           className="flex flex-col w-5/6 md:w-full gap-10"
//         >
//           <div className="w-full border-b-g">
//             {liabilities.map((item, index) => (
//               <div key={index} className="px-0 w-full">
//                 <InputLiabilities
//                   item={item}
//                   onChangeValues={(data) => {
//                     var liabilityTemporary = [...liabilities];
//                     liabilityTemporary[index] = data;
//                     setLiability(liabilityTemporary);
//                   }}
//                   addNewLiability={addNewLiability}
//                   handleRemoveLiability={() => handleRemoveLiability(index)}
//                   isLast={liabilities.length - 1 === index}
//                   isDeletedButtonVisible={liabilities.length - 1 > 0}
//                 />
//               </div>
//             ))}
//           </div>

//           {revexp.map((item, index) => (
//             <div key={index} className="px-0 w-full">
//               <InputExp
//                 item={item}
//                 onChangeValues={(data) => {
//                   var namesTemporary = [...revexp];
//                   namesTemporary[index] = data;
//                   setRevexp(namesTemporary);
//                 }}
//                 // addNewRevExp={addNewRevExp}
//                 // handleRemoveRevExp={handleRemoveRevExp}
//                 isLast={revexp.length - 1 === index}
//               />
//             </div>
//           ))}

//           <div className="flex flex-col lg:flex-row justify-end gap-3 md:gap-7">
//             <div
//               className="flex items-center justify-center cursor-pointer gap-2"
//               onClick={goBack}
//             >
//               <IoIosArrowBack className="text-[#A0161B] font-bold"></IoIosArrowBack>
//               <p className="text-[#A0161B] font-bold">Go Back</p>
//             </div>

//             <input
//               type="submit"
//               className="py-3 w-full lg:w-52 rounded-md bg-[#A0161B] text-white cursor-pointer self-end"
//               value="Next Step"
//               onKeyDown={(e) => (e.key === "Enter" ? handleSubmit : "")}
//             />
//           </div>
//         </form>
//       </div>

//       <a href="/calculate" className="flex items-center gap-2 mt-4">
//         <img src={refresh} className="w-4 h-4"></img>
//         <p className="text-[#8A8A8E]">Back to start</p>
//       </a>
//     </div>
//   );
// }

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

function Output({ data, currency, nextTab, goBack }) {
  const {
    annualNet,
    assets,
    financiallyTowardsDream,
    liabilities,
    monthlyExpense,
    monthlyNet,
    monthlyRevenue,
    netWorth,
  } = data?.initial ? data.initial : {};

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
                <IoMdInformationCircle className="text-2xl cursor-pointer  md:block text-[#011013]"></IoMdInformationCircle>
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
                <p className="font-bold my-0">Financially Towards Dream {financiallyTowardsDream}%</p>
                <label htmlFor="finacial" className="">
                  <IoMdInformationCircle className="text-2xl cursor-pointer block text-[#011013]"></IoMdInformationCircle>
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
                  completed={financiallyTowardsDream}
                  bgColor={"#D35055"}
                  baseBgColor={"#F9E8E8"}
                  isLabelVisible={false}
                  borderRadius={10}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 shadow-gray-400 px-7 py-7 rounded-lg shadow-md h-full">
              <div className="flex justify-between items-center">
                <p className="font-bold my-0">Total Calculation</p>
                <label htmlFor="calculation" className="">
                  <IoMdInformationCircle className="text-2xl cursor-pointer block text-[#011013]"></IoMdInformationCircle>
                </label>
              </div>
              <input
                type="checkbox"
                id="calculation"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="calculation"
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
                <p>Total Net worth:</p>
                <p className="py-0 my-0">
                  {currency}
                  &nbsp;
                  {netWorth?.toString()}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Assets:</p>
                <p className="py-0 my-0">
                  {currency}
                  &nbsp;
                  {assets?.totalAssets
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Liabilities:</p>
                <p className="py-0 my-0">
                  {currency}
                  &nbsp;
                  {liabilities?.totalLiabilities
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>

              <div className="flex justify-between flex-row gap-2 bg-[#F9E8E8] px-3 py-3 rounded-md">
                <p>Total Expenses:</p>
                <p className="py-0 my-0">
                  {currency}
                  &nbsp;
                  {monthlyExpense
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                  className="flex w-1/2 gap-10 "
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
  const newGoalData = { ...goalData };

  return (
    <div className="overflow-x-auto w-25 lg:w-full">
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div ">
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
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div">
        {newGoalData?.initial?.assets ? (
          Object.keys(newGoalData?.initial?.assets).map((e) => (
            <>
              <div className="text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1 capitalize ">
              {e == 'totalAssets' ? 'Total Assets': e}
              </div>
              <div className="py-3 ">{newGoalData.yearOne.assets[e]}</div>
              <div className="py-3">{newGoalData.yearTwo.assets[e]}</div>
              <div className="py-3">{newGoalData.yearThree.assets[e]}</div>
              <div className="py-3">{newGoalData.yearFour.assets[e]}</div>
              <div className="py-3">{newGoalData.yearFive.assets[e]}</div>
              <div className="py-3">{newGoalData.yearSix.assets[e]}</div>
              <div className="py-3">{newGoalData.yearSeven.assets[e]}</div>
              <div className="py-3">{newGoalData.yearEight.assets[e]}</div>
              <div className="py-3">{newGoalData.yearNine.assets[e]}</div>
              <div className="py-3">{newGoalData.yearTen.assets[e]}</div>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function CalculateLiabilityForm({ goalData }) {
  const newGoalData = { ...goalData };

  return (
    <div className="overflow-x-auto w-25 lg:w-full">
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div ">
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
      <div className="grid grid-cols-12 md:grid-cols-11 w-900 md:w-full box-div">
        {newGoalData?.initial?.liabilities ? (
          Object.keys(newGoalData?.initial?.liabilities).map((e) => (
            <>
              <div className="text-left pl-3 md:pl-7 py-3 pr-5 col-span-2 md:col-span-1 capitalize ">
                {e == 'totalLiabilities' ? 'Total Liabilities': e}
              </div>
              <div className="py-3 ">{newGoalData.yearOne.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearTwo.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearThree.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearFour.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearFive.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearSix.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearSeven.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearEight.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearNine.liabilities[e]}</div>
              <div className="py-3">{newGoalData.yearTen.liabilities[e]}</div>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function AnnualForm({ goalData, currency }) {
  const newGoalData = { ...goalData };
  var symbol = "";
  console.log(currency);
  if(currency == 'USD'){
    symbol = 'USD '
  }else{
    symbol = 'PHP '
  }


  console.log(symbol)
  jsPDF.autoTableSetDefaults({
    headStyles: { 
      fillColor: '#fff',
      textColor: '#000' },
  })

  useEffect(() => {
    console.log("mount test");
    console.log(newGoalData);
    if(newGoalData?.initial?.liabilities){
      Object.keys(newGoalData?.initial?.liabilities).map((e) => (
        liabilities[j]=(e == 'totalLiabilities' ? 'Total Liabilities' :e.charAt(0).toUpperCase() + e.slice(1)),
        year1liability[j]=symbol + newGoalData.yearOne.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year2liability[j]=symbol + newGoalData.yearTwo.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year3liability[j]=symbol + newGoalData.yearThree.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year4liability[j]=symbol + newGoalData.yearFour.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year5liability[j]=symbol + newGoalData.yearFive.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year6liability[j]=symbol + newGoalData.yearSix.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year7liability[j]=symbol + newGoalData.yearSeven.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year8liability[j]=symbol + newGoalData.yearEight.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year9liability[j]=symbol + newGoalData.yearNine.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year10liability[j]=symbol + newGoalData.yearTen.liabilities[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        j++
      ))}
  
      newGoalData?.initial?.assets && (
      Object.keys(newGoalData?.initial?.assets).map((e) => (
        assets[i]=(e == 'totalAssets' ? 'Total Assets' : e.charAt(0).toUpperCase() + e.slice(1)),
        year1asset[i]=symbol + newGoalData.yearOne.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year2asset[i]=symbol + newGoalData.yearTwo.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year3asset[i]=symbol + newGoalData.yearThree.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year4asset[i]=symbol + newGoalData.yearFour.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year5asset[i]=symbol + newGoalData.yearFive.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year6asset[i]=symbol + newGoalData.yearSix.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year7asset[i]=symbol + newGoalData.yearSeven.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year8asset[i]=symbol + newGoalData.yearEight.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year9asset[i]=symbol + newGoalData.yearNine.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        year10asset[i]=symbol + newGoalData.yearTen.assets[e].toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        i++
      ))) 
      i=1;
      j=1;
  },[newGoalData])
  
  useEffect(() => {
    const downloadBtn = document.querySelector('.download-btn');
    
    function handleDownloadClick() {
      const pdfDoc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [595, 842]
      });
      const tableData2 = [
        liabilities,
        year1liability,
        year2liability,
        year3liability,
        year4liability,
        year5liability,
        year6liability,
        year7liability,
        year8liability,
        year9liability,
        year10liability,
      ];
      const tableData = [
        assets,
        year1asset,
        year2asset,
        year3asset,
        year4asset,
        year5asset,
        year6asset,
        year7asset,
        year8asset,
        year9asset,
        year10asset
      ];
      pdfDoc.text('Assets', 29, 123 )
      pdfDoc.autoTable({
        startY: 148,
        head: [tableData[0]],
        body: tableData.slice(1),
        tableWidth: 533,
        columnWidth: 106,
        styles: { cellPadding: 6, fontSize: 10, align: 'center', halign: 'center', rowPageHeight: 31, },
        

      });
      pdfDoc.text('Liabilities', 29, 468)
      pdfDoc.autoTable({
        startY: 493,
        head: [tableData2[0]],
        body: tableData2.slice(1),
        columnWidth: 106,
        styles: { cellPadding: 6, fontSize: 10, align: 'center', halign: 'center', rowPageHeight: 31, },
      }
      );
      pdfDoc.addImage(logo, 'PNG', 34, 24, 189, 37.77);
      pdfDoc.addImage(logo2, 'PNG', 414, 24, 149.59, 48);
      pdfDoc.save('example.pdf');
    }

    downloadBtn.addEventListener('click', handleDownloadClick);

    return () => {
      downloadBtn.removeEventListener('click', handleDownloadClick);
    }
  }, []);


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
              <div className="text-center shadow-gray-400 rounded-lg shadow-md ">
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
            <label htmlFor="liable" className="">
              <IoMdInformationCircle className="text-2xl md:text-4xl cursor-pointer hidden md:block text-[#011013]"></IoMdInformationCircle>
            </label>
          </div>

          <input type="checkbox" id="liable" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="liable"
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
      <div className="grid grid-cols-3 gap-4 w-10/12">
        <div className="col-span-1"></div>
        <div className="col-span-1 flex justify-center">
          <a href="/calculate" className="flex justify-center text-center items-center  gap-2">
            <img src={refresh} className="w-4 h-4"></img>
            <p className="text-[#8A8A8E]">Back to start</p>
          </a>
        </div>
        <div className="col-span-1 flex justify-content-end">
          <input
            type="submit"
            className="download-btn py-3 w-full rounded-md bg-white text-[#A0161B] cursor-pointer text-right"
            value="Download PDF"
          />
        </div>
      </div>
    </div>
  );
}
