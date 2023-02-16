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
  const onChangeInputValue = (key, value) => {
    item[key] = value;
    onChangeValues(item);
  };

  const onSearch = (searchTerm) => {
    onChangeInputValue("liability", searchTerm);
  };

  return (
    <div className="flex gap-10 flex-col ">
      <div className="flex flex-col justify-between w-full gap-4 ">
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2 md:gap-2 lg:gap-10 items-start  pr-0 md:pr-10 h-[100px]">
          <div className="w-full lg:w-1/2 ">
            <label>Liability</label>

            <div className="search-container relative">
              <div className="search-inner relative">
                <input
                  type="text"
                  value={item.liability}
                  onChange={(e) => onSearch(e.target.value)}
                  className="absolute w-3/4 input input-bordered w-full border-slate-400 input-goal rounded-r-none focus:outline-none"
                  placeholder="Liability"
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
              <ErrorText value={errors?.liability} />

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
                    onChangeInputValue("liabilitymultiplier", e.target.value)
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
              <div className="flex items-center border-slate-400 w-full items-center">
                <div className="flex justify-center rounded-r-none w-1/4 input input-bordered border-black items-center">
                  <p className="text-center">{currency}</p>
                </div>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-full md:w-3/4 rounded-l-none border-slate-400"
                  value={item.amount}
                  onChange={(e) => onChangeInputValue("amount", e.target.value)}
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
              </div>
              <ErrorText value={errors?.amount} />
            </div>
          </div>

          {isDeletedButtonVisible && (
            <span
              className="cursor-pointer hidden lg:block -mt-6 md:mt-5 absolute delbutton ml-7"
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
