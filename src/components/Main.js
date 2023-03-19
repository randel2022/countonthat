import React from "react";
import "./Main.css";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton, Stack, TextField } from "@mui/material";
import { BsTrash } from "react-icons/bs";

import { useState } from "react";

import step1 from "../assets/step1-new.png";
import step2 from "../assets/step2-new.png";
import step3 from "../assets/step3-new.png";
import step4 from "../assets/step4-new.png";
import hero from "../assets/hero.png";

import personal from "../assets/personal.png";
import asset from "../assets/asset.png";

import { IoMdInformationCircle } from "react-icons/io";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom"; 

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
      <div class="form-control flex flex-wrap w-full flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 pr-0 md:pr-5">
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
        <div className="w-full md:w-2/5 flex flex-col">
          <label class="label">
            <span class="label-text">Amount</span>
          </label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
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
        <div className="w-full md:w-auto">
          <label class="label">
            <span class="label-text">First name</span>
          </label>
          <label class="input-group ">
            <input
              className="input input-bordered w-full border-slate-400 input-custom"
              name="firstname"
              type="text"
              disabled
            />
          </label>
        </div>
        <div className="w-full md:w-auto">
          <label class="label">
            <span class="label-text">Last name</span>
          </label>
          <label class="input-group ">
            <input
              type="text"
              placeholder=""
              class="input input-bordered input-custom w-full md:w-auto"
              disabled
            />
          </label>
        </div>
        <div className="flex flex-col items-center w-full md:w-auto">
          <label className="label self-start">
            <span class="label-text">Age</span>
          </label>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <label class="input-group w-full md:w-auto">
              <input
                type="number"
                placeholder=""
                class="input input-bordered input-custom w-full md:w-auto"
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

function Main({ token }) {
  /*For names input*/
  const [name, setName] = useState("");
  const [story, setStory] = useState({});
  const [inputNameFields, setNamefields] = useState([
    {
      InputNames,
    },
  ]);
  const history = useNavigate();

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

  const handleCalculateClick = () => {
    if (token) {
      history('/calculate');
    } else {
      history('/signin');
    }
  };

  return (
    <div className="flex-col h-auto w-full flex justify-center items-center gap-14 py-5 md:py-32 px-8">
      <div className="flex flex-wrap flex-col justify-center items-center px:10 md:px-24 gap-3">
        <h2 className="text-3xl md:text-6xl text-center font-bold">
          Take the first step to<br></br>achieving your dreams.
        </h2>
        <p className="text-center lg:px-28">
          Achieving your dreams is a process that starts with taking the first
          step. Understanding your goal and outlining the steps to get there are
          crucial to becoming successful. DreamWalk is guided by the philosophy
          of getting into a business mindset. You tell us your dreams, then we
          quantify them and walk them back to today so you know how far away
          your dream is to help you better plan for them.
        </p>
        <Button
          onClick={handleCalculateClick}
          className="py-3 px-3 md:px-7 text-xs md:text-lg rounded-lg bg-[#A0161B] text-white font-bold hover:text-gray-400 delay-150"
        >
          Calculate Your Dream
        </Button>
      </div>

      <div className="bg-[#A0161B] rounded-md lg:mx-24">
        <img src={hero}></img>
      </div>

      <div className="flex flex-col w-full md:w-3/4 gap-14">
        <h2 className="text-5xl font-bold">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-7">
          <div className="flex flex-col items-start gap-3 pr-0 md:pr-32">
            <img src={personal} className="w-12 md:w-16"></img>
            <h3 className="font-bold text-lg md:text-2xl">
              Personal Info Assement
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 pr-0 md:pr-32">
            <img src={asset} className="w-12 md:w-16"></img>
            <h3 className="font-bold text-lg md:text-2xl">
              Asset Info Assement
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 pr-0 md:pr-32">
            <img src={asset} className="w-12 md:w-16"></img>
            <h3 className="font-bold text-lg md:text-2xl">
              Liability Info Assement
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-3/4">
        <div className="flex flex-col justify-center px-5 gap-4">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Personal Information <br></br>Assessment
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
        <div className="">
          <img src={step1}></img>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid col-start-1 grid-cols-1 md:grid-cols-2 w-full md:w-3/4">
        <div className="">
          <img src={step2}></img>
        </div>

        <div className="flex flex-col justify-center px-5 gap-4">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Asset Information Assessment
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-3/4">
        <div className="flex flex-col justify-center px-5 gap-4">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Liabilities Information Assessment
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
        <div className="">
          <img src={step3}></img>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-2 w-full md:w-3/4">
        <div className="">
          <img src={step4}></img>
        </div>

        <div className="flex flex-col justify-center px-5 gap-4">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold">Calculated Dream</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
