import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import sunImage from "../../img/sun.png";
import moonImage from "../../img/moon.png";

function Post(props) {
  const dateObject = new Date(props.one.city.sunrise * 1000);
  const sunriseTime = dateObject.getTime();
  var date = new Date(sunriseTime); // create Date object
  let sunriseHours = date.getHours();
  let sunriseMinutes = date.getMinutes();

  let sunrise = (sunriseHours + sunriseMinutes / 60).toFixed(2);

  const dateObject2 = new Date(props.one.city.sunset * 1000);
  const sunsetTime = dateObject2.getTime();
  var date2 = new Date(sunsetTime); // create Date object
  let sunsetHours = date2.getHours();
  let sunsetMinutes = date2.getMinutes();
  let sunset = (sunsetHours + sunsetMinutes / 60).toFixed(2);

  let sinAlphaSunrise = Math.sin(
    ((Number.parseInt(sunrise) / 24) * 180 * 3.1428) / 180
  );
  let cosAlphaSunrise = Math.cos(
    ((Number.parseInt(sunrise) / 24) * 180 * 3.1428) / 180
  );
  let a1 = 100 - cosAlphaSunrise * 100;
  let b1 = 100 - sinAlphaSunrise * 100;

  let sinAlphaSunset = Math.sin(
    ((Number.parseInt(24 - sunset) / 24) * 180 * 3.1428) / 180
  );
  let cosAlphaSunset = Math.cos(
    ((Number.parseInt(24 - sunset) / 24) * 180 * 3.1428) / 180
  );

  let a2 = -(100 - cosAlphaSunset * 100);
  let b2 = 100 - sinAlphaSunset * 100;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card">
      <div className="card-body" onClick={handleShow}>
        <p>{props.one.city.name}</p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.one.city.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>Today: {props.one.list[0].dt_txt.substr(0, 10)}</p>
              <p>
                Temperature:{" "}
                <span>{props.one.list[0].main.temp.toFixed(0)} °C</span>
              </p>
            </div>
            <div
              style={{
                width: "300px",
                height: "150px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>0</p>
                <p>24</p>
              </div>
              <div
                style={{
                  width: "200px",
                  height: "100px" /* as the half of the width */,
                  borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                  border: "5px solid gray",
                  borderBottom: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "-60px",
                }}
              >
                <img
                  src={sunImage}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "-20px",
                    marginTop: "-20px",
                    transform: `translate(${a1}px, ${b1}px) rotate(0deg)`,
                  }}
                />

                <img
                  src={moonImage}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "-20px",
                    marginTop: "-20px",
                    transform: `translate(${a2}px, ${b2}px) rotate(0deg)`,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "80px",
            }}
          >
            <p>Tomorrow: {props.one.list[8].dt_txt.substr(0, 10)}</p>
            <p>
              Temperature:{" "}
              <span>{props.one.list[8].main.temp.toFixed(0)} °C</span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Post;
