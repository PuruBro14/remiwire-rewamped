import React, { useEffect, useRef, useState } from "react";
import "./assets/css/home.css";
import axios from "axios";
import CurrencyInput from "./assets/js/currencyInput";
import { useDispatch } from "react-redux";
import { bookOrderEndpoints } from "../../services/apis";
import ConvertTable from "./ConvertTable";
import { FaArrowRight } from "react-icons/fa";
import Tab from "../common/Tab";
import { Link } from "react-router-dom";
import {toast} from 'react-hot-toast'
export default function Convert() {
  const tabData = [
    {
      id: 1,
      tabName: "Buy",
    },
    {
      id: 2,
      tabName: "Sell",
    },
  ];
  const { GET_ORDERS, DELETE_ORDERS } = bookOrderEndpoints;
  const [convertFormValue, setConvertFormValue] = useState({
    amount: "",
    from: "",
    to: "",
    fromImg: "",
    toImg: "",
    currentRate: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentCurrValue, setCurrentCurrValue] = useState();
  const [totalEntries, setTotalEntries] = useState([]);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [editState, setEditState] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [ConvertTableEntries, setConvertTableEntries] = useState([]);
  const [currentState, setCurrentState] = useState("Buy");
  const [currToValue, setCurrToValue] = useState(0);
  const[selectedCurrency,setSelectedCurrency]=useState("Rs")
   const [convertTableDetails, setConvertTableDetails] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('convertEntries');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setConvertTableDetails(parsedData);
  }, []);

  useEffect(() => {
    if (
      convertFormValue?.to !== "" ||
      convertFormValue.amount !== "" ||
      convertFormValue.from !== ""
    ) {
      const getToCurrValue = async () => {
        const dashIndex = convertFormValue?.to.indexOf("-");
        const toCurrency = convertFormValue?.to.substring(0, dashIndex).trim();
        setSelectedCurrency(toCurrency)
        if (currentCurrValue !== undefined) {
          const response = await axios.get(
            "https://v6.exchangerate-api.com/v6/1902e21487d17680cb9fc088/latest/" +
              toCurrency
          );

          console.log("response------>", response);

          console.log("currToValue", currToValue);
          setCurrToValue(response?.data?.conversion_rates);
        }
      };
      getToCurrValue();
      currRateValue();
    }
  }, [convertFormValue?.to]);

  useEffect(() => {
    const getCurrencyValue = async () => {
      try {
        console.log("current1", convertFormValue?.from);
        const dashIndex = convertFormValue?.from.indexOf("-");
        const fromCurrency = convertFormValue.from
          .substring(0, dashIndex)
          .trim();
        if (fromCurrency !== "") {
          const response = await axios.get(
            "https://v6.exchangerate-api.com/v6/1902e21487d17680cb9fc088/latest/" +
              fromCurrency
          );
          setCurrentCurrValue(response?.data?.conversion_rates);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencyValue();
  }, [convertFormValue.from]);

   const handleAddMore = (e) => {
  e.preventDefault();
  if (
    convertFormValue.amount === "" ||
    convertFormValue.from === "" ||
    convertFormValue?.to === ""
  ) {
    alert("All fields are required");
    return;
  }

  const dashIndex = convertFormValue?.to.indexOf("-");
  const fromCurrency = convertFormValue.from.substring(0, dashIndex).trim();
  const toCurrency = convertFormValue?.to.substring(0, dashIndex).trim();

  const convertTo = parseFloat(convertFormValue.amount);

  const buyTotalAmount = parseInt(convertTo) / currToValue[fromCurrency];
  const sellTotalAmount = parseInt(convertTo) * currentCurrValue[toCurrency];

  const existingEntryIndex = ConvertTableEntries.findIndex(
    (entry) =>
      entry.from === convertFormValue.from && entry.to === convertFormValue?.to
  );

  if (existingEntryIndex === -1) {
    // Not already in table
    console.log("not in table", existingEntryIndex);
    if (
      convertFormValue.amount !== "" ||
      convertFormValue.from !== "" ||
      convertFormValue?.to !== "" ||
      convertFormValue.currentRate !== "" ||
      convertFormValue.fromImg !== "" ||
      convertFormValue.toImg !== ""
    ) {
      const newEntry = {
        amount: convertFormValue.amount,
        from: convertFormValue.from,
        to: convertFormValue?.to,
        currentRate: convertFormValue.currentRate,
        total: convertFormValue.total,
      };

      // Update state and localStorage
      setTotalEntries([...totalEntries, newEntry]);
      const updatedLocalStorage = JSON.parse(localStorage.getItem("convertEntries")) || [];
      updatedLocalStorage.push(newEntry);
      localStorage.setItem("convertEntries", JSON.stringify(updatedLocalStorage));
      setConvertTableEntries([...ConvertTableEntries, newEntry]);

      if (currentState === "Sell") {
        setTotalAmount((prev) => prev + sellTotalAmount);
      } else {
        setTotalAmount((prev) => prev + buyTotalAmount);
      }

      setConvertFormValue({
        amount: "",
        from: "",
        fromImg: "",
        to: "",
        toImg: "",
        currentRate: "",
      });
      setDisabled(false);
    }
  } else {
    // Existing entry found, update amount
    if (
      convertFormValue.amount !== "" ||
      convertFormValue.from !== "" ||
      convertFormValue?.to !== "" ||
      convertFormValue.currentRate !== "" ||
      convertFormValue.fromImg !== "" ||
      convertFormValue.toImg !== ""
    ) {
      const updatedData = [...ConvertTableEntries];
      const existingAmount = parseInt(updatedData[existingEntryIndex].amount);
      const newAmount = parseInt(convertFormValue.amount);

      updatedData[existingEntryIndex].amount = existingAmount + newAmount;
      console.log("updatedData", updatedData);
      setConvertTableEntries(updatedData);
      localStorage.setItem("convertEntries", JSON.stringify(updatedData));

      setConvertFormValue({
        amount: "",
        from: "",
        fromImg: "",
        to: "",
        toImg: "",
        currentRate: "",
      });
    }
  }
};


  const currRateValue = () => {
    const dashToIndex = convertFormValue?.to?.indexOf("-");
    const dashtoCurrency = convertFormValue?.to
      ?.substring(0, dashToIndex)
      .trim();
    const toValue = currentCurrValue[dashtoCurrency];

    setConvertFormValue({ ...convertFormValue, currentRate: toValue });
  };

  const fetchTableData = async () => {
    const response = await axios.get(GET_ORDERS);
    setTotalEntries(response?.data?.data);
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  const filterArray = (e, ele, i) => {
    e.preventDefault();

    const filteredArr = ConvertTableEntries.filter(
      (item, index) => i !== index
    );
      setTotalAmount(0)
    setConvertTableEntries(filteredArr);  
    localStorage.setItem("convertEntries", JSON.stringify(filteredArr));

    if (!ele?.id) {
      return;
    }


    const url = `${DELETE_ORDERS}/${ele?.id}`;

    const response = axios
      .delete(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error while deleting the item", err);
      });

  };

  const editArray = (e, ele, index) => {
    e.preventDefault();
    console.log('clicked',2);
    setEditState(true);
    setEditIndex(index);
    setConvertFormValue({
      ...convertFormValue,
      amount: ele?.amount,
      from: ele?.from,
      to: ele?.to,
      currentRate: ele?.currRate,
    });
  };

  console.log("totalAmount", totalAmount);

  const editHandler = (e) => {
    console.log('clicked',1);
    e.preventDefault();
    if (
      convertFormValue.amount === "" ||
      convertFormValue.from === "" ||
      convertFormValue?.to === ""
    ) {
      alert("All fields are required");
      return;
    }
    const updatedEntries = [...ConvertTableEntries];
    const updatedValues = {
      amount: convertFormValue.amount,
      from: convertFormValue.from,
      to: convertFormValue?.to,
      currentRate: convertFormValue.currentRate,
    };
    updatedEntries[editIndex] = updatedValues;
    setConvertTableEntries(updatedEntries);
    setEditState(false);
    setConvertFormValue((prevValues) => ({
    ...prevValues,
    amount: "",
    from: "",
    to: "",
    currentRate: "",
  }));
  };

  const updateLocalStorage = (data) => {
  const existingData = JSON.parse(localStorage.getItem('convertEntries')) || [];
  const updatedData = [...data];
  localStorage.setItem('convertEntries', JSON.stringify(updatedData));
};

console.log('ConvertTableEntries',ConvertTableEntries); 

useEffect(()=>{
  setConvertTableEntries([])
  setTotalAmount(0)
    if (!window.performance) {
  localStorage.clear();
    }
},[currentState])


  return (
    <form className="md:w-11/12 mx-auto min-h-[350px]">
      <div className="flex flex-col gap-5 mt-7">
        <div className="flex justify-center md:justify-start">
          <Tab
            tabData={tabData}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center mt-4">
          <div>
            <h5 className="ml-2 my-3">Amount</h5>
            <input
              onChange={(e) => {
                setConvertFormValue({
                  ...convertFormValue,
                  amount: e.target.value,
                });
              }}
              className="amountinput"
              placeholder="Amount"
              value={convertFormValue.amount}
            />
          </div>
          <div>
            <h5 className="ml-2 my-3">From</h5>

            <CurrencyInput
              convertFormValue={convertFormValue}
              setConvertFormValue={setConvertFormValue}
              currentType="from"
              currentState={currentState}
            />
          </div>
          <div>
            <h5 className="ml-2 my-3">To</h5>
            <CurrencyInput
              convertFormValue={convertFormValue}
              setConvertFormValue={setConvertFormValue}
              currentType="to"
              currentState={currentState}
            />
          </div>
          <div>
            <h5 className="ml-2 my-3">Current Rate</h5>
            <input
              placeholder="Rate"
              className="amountinput cursor-not-allowed bg-[#EBEBE4]"
              value={convertFormValue?.currentRate}
            />
          </div>
          <button
            className="w-fit text-2xl px-6 py-[6px] bg-[#d40511] text-white  hover:bg-[#d40511] transition-all duration-200 mt-12"
            onClick={editState ? editHandler : handleAddMore}
          >
            {editState ? "Save" : "Add"}
          </button>
          &nbsp;
        </div>
      </div>

        <ConvertTable
          ConvertTableEntries={ConvertTableEntries}
          setConvertTableEntries={setConvertTableEntries}
          filterArray={filterArray}
          editArray={editArray}
          currentState={currentState  }
        />

      <div className="tablerow">
        <div>
          <h5 className="mt-7 pl-5 text-center md:text-start">Total Amount</h5>
          <h3 className="pl-5 text-center md:text-start">
            {totalAmount?.toFixed(2) || 0} {selectedCurrency}
          </h3>

          <div
            className={`${
              convertTableDetails?.length === 0
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <Link to="/checkout">
              <div
                className=" cursor-pointer group  p-1 mx-auto text-white bg-[#d40511] font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit"
              >
                <div
                  className="flex flex-row items-center gap-2  px-10 py-[5px]
                transition-all duration-200 group-hover:bg-[#d40511] bg-[#d40511]"
                >
                  <p>Book a Order</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
