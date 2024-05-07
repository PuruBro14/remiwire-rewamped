import React from "react";
export default function Alerts() {
  return (
    <div>
      <div fluid>
        <div>
          <div md={11}>
            <h4 className="alertsheading">
              We'll keep an eye on the market for you
            </h4>
            <p className="alertspara">
              Currency markets are always moving. Get exchange rate alerts so
              you never miss your desired rate.
            </p>
            <button className="alertsratebtn">Get Rate Alerts</button>
          </div>
          <div md={11}>
            <img
              src="https://media.istockphoto.com/id/1051694430/photo/3d-illustration-of-economic-gdith-background.jpg?s=1024x1024&w=is&k=20&c=zTp1jf5Gp5gy8TTPH72ddl_dXq-tHuTJRFZV3sU8PEo="
              className="alertsgraphs"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
