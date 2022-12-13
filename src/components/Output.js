import React from "react";
import "./Main.css";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import { useState } from "react";

const InputRow = ({
  index,
  item,
  handleChange,
  handleRemove,
  handleAdd,
  values,
  inputFields,
}) => {
  return (
    <div className="w-full ">
      <div class="form-control flex flex-wrap w-full flex-row ">
        <div className="w-3/5 pr-5">
          <label class="label">
            <span class="label-text">Asset</span>
          </label>
          <label class="input-group">
            <select className="input w-full input-bordered">
              <option disabled selected>
                Choose an Asset
              </option>
              <option>House</option>
              <option>Car</option>
              <option>Savings</option>
            </select>
          </label>
        </div>
        <div className="w-2/5">
          <label class="label">
            <span class="label-text">Amount</span>
          </label>
          <label class="input-group">
            <span>USD</span>
            <input
              type="number"
              placeholder=""
              className="input w-full input-bordered"
              onChange={(event) => handleChange(event, index)}
              value={item.amount}
            />
            <span onClick={handleRemove} className="cursor-pointer">
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          </label>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleAdd}
        >
          <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
          <p className="text-sm my-2 text-[#A0161B]">Add Another Goal</p>
        </div>
      </div>
    </div>
  );
};

const InputNames = ({
  index,
  item,
  handleChangeName,
  handleRemoveName,
  handleAddName,
  values,
  inputFieldsName,
}) => {
  return (
    <>
      <div class="form-control flex flex-wrap w-full flex-row gap-5">
        <div>
          <label class="label">
            <span class="label-text">First name</span>
          </label>
          <label class="input-group">
            <input
              type="text"
              placeholder=""
              class="input input-bordered"
              name="firstname"
              handleChangeName={handleChangeName}
            />
          </label>
        </div>
        <div>
          <label class="label">
            <span class="label-text">Last name</span>
          </label>
          <label class="input-group">
            <input type="text" placeholder="" class="input input-bordered" />
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label className="label self-start">
            <span class="label-text">Age</span>
          </label>
          <div className="flex items-center gap-2">
            <label class="input-group">
              <input
                type="number"
                placeholder=""
                class="input input-bordered"
              />
            </label>
            <span onClick={handleRemoveName} className="cursor-pointer">
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleAddName}
      >
        <AiOutlinePlus className="text-[#A0161B]"></AiOutlinePlus>
        <p className="text-sm my-2 text-[#A0161B]">Add Another Person</p>
      </div>
    </>
  );
};

function Main() {
  /*For names input*/
  const [name, setName] = useState("");
  const [story, setStory] = useState({});
  const [inputNameFields, setNamefields] = useState([
    {
      InputNames,
    },
  ]);

  const handleAddName = () => {
    setNamefields([
      ...inputNameFields,
      {
        title: "",
        description: "",
        location: "",
      },
    ]);
  };

  const handleRemoveName = (index) => {
    if (inputNameFields.length !== 1) {
      const values = [...inputNameFields];
      values.splice(index, 1);
      setNamefields(values);
    }
  };

  const handleChangeName = (event, index) => {
    const values = [...inputNameFields];
    values[index][event.target.name] = event.target.value;
    setNamefields(values);
  };

  /*For Goals input*/
  const [inputFields, setInputFields] = useState([
    {
      InputRow,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setStory({ trips: [...inputFields], name });
    console.log([...inputFields]);
  };

  const handleChange = (event, index) => {
    const values = [...inputFields];
    console.log("momo", values);
    values[index][event.target.name] = event.target.value;

    setInputFields(values);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        title: "",
        description: "",
        location: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    if (inputFields.length !== 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const calculateGoal = () => {
    console.log("Calculate");
  };

  return (
    <div className="flex-col h-auto w-full flex justify-center items-center gap-12 py-5 md:py-52 ">
      <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-5/6">
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
            <p>7,000,000</p>
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

      <div className="flex flex-wrap flex-col justify-start items-start px:10 md:px-0 gap-3  w-5/6">
        <h2 className="text-3xl md:text-lg font-bold ">Liabilities</h2>
        <div className="w-full grid grid-cols-11">
          <div className="flex flex-col">
            <br />
            <p>Mortgage</p>
            <p>Credit Card</p>
            <p>Student Loan</p>
          </div>
          <div className="flex flex-col">
            <p>1st Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>2nd Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>3rd Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>4th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>5th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>

          <div className="flex flex-col">
            <p>6th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>7th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>8th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>9th Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
          <div className="flex flex-col">
            <p>10 Year</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
            <p>7,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
