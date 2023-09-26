import React, { useState } from "react";

const App = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [showWatch, setShowWatch] = useState(false);
  const [error, setError] = useState("");
  const [restart, setRestart] = useState(false);
  const [watchStatus, setWatchStatus] = useState({
    playerOne: {
      status: false,
      time: { minutes: 0, seconds: 0 },
      show: 0,
    },
    playerTwo: {
      status: false,
      time: { minutes: 0, seconds: 0 },
      show: 0,
    },
  });

  const handleInput = (e, value) => {
    const tmpTime = { ...time };
    tmpTime[value] = e.target.value;
    setTime(tmpTime);
  };

  const start = () => {
    if (time.minutes !== 0 || time.seconds !== 0) {
      setShowWatch(true);

      const tmpWatchStatus = { ...watchStatus };
      tmpWatchStatus.playerOne.time = time;
      tmpWatchStatus.playerTwo.time = time;

      tmpWatchStatus.playerOne.show = `${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
      setWatchStatus(tmpWatchStatus);

      tmpWatchStatus.playerTwo.show = `${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
      setWatchStatus(tmpWatchStatus);
    }
    setError("Set time to start");
  };

  const handleWatchStaus = (player1, player2, status) => {
    const tmpWatchStatus = { ...watchStatus };

    if (!tmpWatchStatus[player1].status && !tmpWatchStatus[player2].status) {
      tmpWatchStatus[player1].status = !status;

      setWatchStatus(tmpWatchStatus);
      decreaseTime(player1, player2);
    } else {
      tmpWatchStatus[player1].status = !tmpWatchStatus[player1].status;
      tmpWatchStatus[player2].status = !tmpWatchStatus[player2].status;

      setWatchStatus(tmpWatchStatus);
      decreaseTime(player2, player1);
    }
  };

  const decreaseTime = (player1, player2) => {
    const tmpWatchStatus = { ...watchStatus };

    if (tmpWatchStatus[player1].status) {
      var minutes = tmpWatchStatus[player1].time.minutes;
      var seconds = tmpWatchStatus[player1].time.seconds;

      if (
        (tmpWatchStatus[player1].time.minutes !== 0 &&
          tmpWatchStatus[player1].time.seconds !== 0) ||
        (tmpWatchStatus[player1].time.minutes === 0 &&
          tmpWatchStatus[player1].time.seconds !== 0)
      ) {
        seconds = tmpWatchStatus[player1].time.seconds - 1;
      } else if (
        tmpWatchStatus[player1].time.minutes !== 0 &&
        tmpWatchStatus[player1].time.seconds === 0
      ) {
        minutes = tmpWatchStatus[player1].time.minutes - 1;
        seconds = 59;
      }

      tmpWatchStatus[player1].show = `${minutes
        .toString()
        .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
      tmpWatchStatus[player1].time = {
        minutes: minutes,
        seconds: seconds,
      };
      if (minutes === 0 && seconds === 0) {
        tmpWatchStatus[player1].status = false;
        tmpWatchStatus[player2].status = false;

        setWatchStatus(tmpWatchStatus);
        setRestart(true);
      } else {
        setWatchStatus(tmpWatchStatus);

        setTimeout(() => {
          decreaseTime(player1, player2);
        }, 1000);
      }
    }
  };

  const restartWatch = () => {
    setTime({ minutes: 0, seconds: 0 });
    setShowWatch(false);
    setError("");
    setRestart(false);
    setWatchStatus({
      playerOne: {
        status: false,
        time: { minutes: 0, seconds: 0 },
        show: 0,
      },
      playerTwo: {
        status: false,
        time: { minutes: 0, seconds: 0 },
        show: 0,
      },
    });
  };

  return (
    <div className="parent m-3">
      <div className="card child">
        <div className="card-body">
          <h1 className="card-title pb-3">Chess Watch</h1>

          {!showWatch && (
            <div className="p-1">
              <h5 className="card-title">Set time</h5>

              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Minutes"
                  onChange={(e) => handleInput(e, "minutes")}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Seconds"
                  onChange={(e) => handleInput(e, "seconds")}
                />
                <div
                  type="button"
                  className="form-control  btn btn-success"
                  placeholder="Seconds"
                  onClick={() => start()}
                >
                  Start
                </div>
              </div>

              {error !== "" && (
                <div className="text text-danger pt-2">{error}</div>
              )}
            </div>
          )}

          {showWatch && (
            <div className="row p-3">
              <button
                className={`btn  ${
                  watchStatus.playerOne.status ? "btn-success" : "btn-warning"
                } clock-box col-12`}
                onClick={() => {
                  handleWatchStaus(
                    "playerOne",
                    "playerTwo",
                    watchStatus.playerOne.status
                  );
                }}
                disabled={watchStatus.playerTwo.status || restart}
              >
                {watchStatus.playerOne.show}
                <br />
                {!restart &&
                  !watchStatus.playerOne.status &&
                  !watchStatus.playerTwo.status &&
                  "Click to start"}
                {watchStatus.playerOne.status && "Click to pause"}
                {!watchStatus.playerOne.status &&
                  watchStatus.playerTwo.status &&
                  "Paused"}
              </button>

              <button
                className={`btn  ${
                  watchStatus.playerTwo.status ? "btn-success" : "btn-warning"
                } clock-box mt-5 col-12`}
                onClick={() => {
                  handleWatchStaus(
                    "playerTwo",
                    "playerOne",
                    watchStatus.playerTwo.status
                  );
                }}
                disabled={watchStatus.playerOne.status || restart}
              >
                {watchStatus.playerTwo.show}
                <br />

                {!restart &&
                  !watchStatus.playerOne.status &&
                  !watchStatus.playerTwo.status &&
                  "Click to start"}
                {watchStatus.playerTwo.status && "Click to pause"}
                {!watchStatus.playerTwo.status &&
                  watchStatus.playerOne.status &&
                  "Paused"}
              </button>

              {restart && (
                <button
                  className="btn btn-primary mt-4 col-12"
                  onClick={() => restartWatch()}
                >
                  Reset watch
                </button>
              )}
            </div>
          )}
        </div>

        <i className="m-3 mt-0">
          <b>
            @{" "}
            <a
              href="https://github.com/bhavik61"
              rel="noreferrer"
              target="_blank"
            >
              Author
            </a>
          </b>
        </i>
      </div>
    </div>
  );
};

export default App;
