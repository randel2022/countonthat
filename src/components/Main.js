import React from "react";
import "./Main.css";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import { useState } from "react";

import { IoMdInformationCircle } from "react-icons/io";

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
      <div class="form-control flex flex-wrap w-full flex-row items-center">
        <div className="w-3/5 pr-5">
          <label class="label">
            <span class="label-text">Goals</span>
          </label>
          <label class="input-group input-custom ">
            <select
              className="input w-full input-bordered input-custom"
              disabled
            >
              {/* <option disabled selected>
                Choose a Goal
              </option> */}
            </select>
          </label>
        </div>
        <div className="w-2/5 flex flex-col">
          <label class="label">
            <span class="label-text">Amount</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center border-slate-400">
              <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                <p className="text-center">USD</p>
              </div>
              <input
                name="amount"
                type="number"
                className="input input-bordered w-3/4 rounded-l-none border-slate-400 input-custom"
                disabled
              />
            </div>

            <span onClick={handleRemove} className="cursor-default">
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-2 cursor-default"
          // onClick={handleAdd}
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
    <div className="">
      <div className="flex justify-end px-5">
        <IoMdInformationCircle className="text-2xl"></IoMdInformationCircle>
      </div>
      <div class="form-control flex flex-wrap w-full flex-row gap-5">
        <div>
          <label class="label">
            <span class="label-text">First name</span>
          </label>
          <label class="input-group">
            <input
              className="input input-bordered w-full border-slate-400 input-custom"
              name="firstname"
              type="text"
              disabled
            />
          </label>
        </div>
        <div>
          <label class="label">
            <span class="label-text">Last name</span>
          </label>
          <label class="input-group">
            <input
              type="text"
              placeholder=""
              class="input input-bordered input-custom"
              disabled
            />
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
                class="input input-bordered input-custom"
                disabled
              />
            </label>
            <span onClick={handleRemoveName} className="cursor-default">
              <BsTrash className="text-[#A0161B]"></BsTrash>
            </span>
          </div>
        </div>
      </div>
    </div>
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
    <div className="flex-col h-auto w-full flex justify-center items-center gap-12 py-5 md:py-32 ">
      <div className="flex flex-wrap flex-col justify-center items-center px:10 md:px-24 gap-3">
        <h2 className="text-3xl md:text-6xl text-center font-bold">
          Take the first step to<br></br>achieving your dreams.
        </h2>
        <p className="text-center">
          Achieving your dreams is a process that starts with taking the first
          step. Understanding your goal and outlining the steps to get there are
          crucial to becoming successful. DreamWalk is guided by the philosophy
          of getting into a business mindset. You tell us your dreams, then we
          quantify them and
        </p>
        <a
          href="/calculate"
          className="py-3 px-3 rounded-3xl bg-[#A0161B] text-white"
        >
          Calculate Your Dream
        </a>
      </div>

      <form
        className="flex flex-col items-center gap-10 rounded-md py-5 px-5 shadow-lg mainbox fadeInDown"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-wrap justify-center items-center px-0 w-full">
          {inputNameFields.map((item, index) => (
            <div key={index} className="px-0 w-full">
              <InputNames
                inputNameFields={inputNameFields}
                index={index}
                item={item}
                handleChangeName={handleChangeName}
                handleAddName={handleAddName}
                handleRemoveName={handleRemoveName}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap justify-center items-center px-0 w-full">
          {inputFields.map((item, index) => (
            <div key={index} className="px-0 w-full">
              <InputRow
                inputFields={inputFields}
                index={index}
                item={item}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
              />
            </div>
          ))}
        </div>

        <button
          className="py-3 px-12 self-start rounded-md bg-[#A0161B] text-white cursor-default"
          // href="/assets"
        >
          Next Step
        </button>
      </form>
    </div>
  );
}

export default Main;
