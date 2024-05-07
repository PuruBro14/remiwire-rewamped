import React, { useState, useEffect } from "react";
import "../css/home.css";
import countryCurrency from "./countryCurrency";
export default function CurrencyInput({
  convertFormValue,
  setConvertFormValue,
  currentType,
}) {
  const [countryCurrencyList, setCountryCurrencyList] = useState([]);
  const [countryCurrencyT, setCountryCurrency] = useState([]);
  const [showList, setShowList] = useState(false);

  const getCurrencyList = (searchString) => {
    const filteredArrayCurrency = countryCurrencyList.filter((currency) => {
      return (
        currency.label.toLowerCase().includes(searchString.toLowerCase()) ||
        currency.value.toLowerCase().includes(searchString.toLowerCase())
      );
    });

    setCountryCurrency(filteredArrayCurrency);
  };

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
    setCountryCurrencyList(countryCurrency);
    setCountryCurrency(countryCurrency);
  }, []);
  return (
    <div>
      {convertFormValue?.[currentType] ? (
        <>
          <div className="countryDiv flex">
            <span>
              <span>
                <img
                  className="countryIcon"
                  src={convertFormValue?.[currentType + "Img"]}
                />
              </span>
              &nbsp;
              {convertFormValue?.[currentType]}
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
            onChange={(e) => {
              getCurrencyList(e);
            }}
            onFocus={showCurrencyList}
            onBlur={hideCurrencyList}
          />
        </>
      )}
      {showList && (
        <>
          <ul className="ulNotType">
            {countryCurrencyT?.map((val, index) => {
              return (
                <>
                  <div key={val}>
                    <li
                      onClick={() => {
                        setValueFrom(val.label, val.img);
                      }}
                      className="currencylist flex items-center"
                    >
                      <span>
                        <img src={val.img} />
                      </span>
                      &nbsp;
                      {val.label}
                    </li>
                  </div>
                </>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
