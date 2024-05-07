import React, { useState, useEffect } from "react";
import "../css/home.css";
import countryCurrency from "./countryCurrency";
export default function CurrencyInput({
  convertFormValue,
  setConvertFormValue,
  currentType,
  currentState
}) {
  const [countryCurrencyList, setCountryCurrencyList] = useState([]);
  const [countryCurrencyT, setCountryCurrency] = useState([]);
  const [showList, setShowList] = useState(false);

  const showCurrencyList = () => {
    setShowList(true);
  };

  const setValueFrom = (value, img) => {
    setShowList(false);
    if (currentType) {
      setConvertFormValue({
        ...convertFormValue,
        [currentType]: value,

        [currentType + "Img"]: img,
      });
    }
  };

  const hideCurrencyList = () => {
    // setShowList(false);
  };

  useEffect(() => {
    let filteredArrayCurrency = [...countryCurrency];

    if (
      (currentState === "Buy" && currentType === "from") ||
      (currentState === "Sell" && currentType === "to")
    ) {
      filteredArrayCurrency = filteredArrayCurrency.filter(
        (currency) => currency.label === "INR - Indian Rupee"
      );
    } else {
      if (convertFormValue?.from) {
        filteredArrayCurrency = filteredArrayCurrency.filter(
          (currency) => currency.label !== convertFormValue.from
        );
      }
      if (convertFormValue && convertFormValue?.to) {
        filteredArrayCurrency = filteredArrayCurrency.filter(
          (currency) => currency.label !== convertFormValue.to
        );
      }
    }


    setCountryCurrency(filteredArrayCurrency);
  }, [convertFormValue.from, convertFormValue.to, currentState, currentType]);


  console.log('countryCurrencyT',countryCurrencyList,currentType,currentType=="from",currentState==="Buy");

  return (
    <div>
      {convertFormValue?.[currentType] ? (
        <>
          <div className="countryDiv">
            <span className="flex items-center gap-2">
              {" "}
              <span>
                <img
                  className="countryIcon"
                  src={convertFormValue?.[currentType + "Img"]}
                />
              </span>
              &nbsp;
              <span className="truncate">
                {convertFormValue?.[currentType]}
              </span>
            </span>
            <span
              style={{
                float: "right",
                padding: "10px",
                fontWeight: 800,
                cursor: "pointer",
              }}
              onClick={() => {
                setConvertFormValue({
                  ...convertFormValue,
                  [currentType]: "",
                  [currentType + "Img"]: "",
                });
              }}
            >
              X
            </span>
          </div>
        </>
      ) : (
        <>
          {" "}
          <input
            className="amountinput"
            placeholder="Select Currency"
            value={convertFormValue?.[currentType]}
            onFocus={showCurrencyList}
            onBlur={hideCurrencyList}
          />
        </>
      )}
      {showList && (
        <>
          <ul className="ulNotType">
            {countryCurrencyT?.map((val, index) => {
              console.log("val", val);
              return (
                <div key={index}>
                  <div>
                    <li
                      onClick={() => {
                        setValueFrom(val.label, val.img);
                      }}
                      className="currencylist"
                    >
                      <span>
                        <img src={val.img} />
                      </span>
                      {val.label}
                    </li>
                  </div>
                </div>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
