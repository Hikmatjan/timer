import { Button, Divider, Modal } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { v4 } from "uuid";

const App = () => {
  const [lap, setLap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const timerRef = useRef(null);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [milesecond, setmileSecond] = useState(0);
  const [running, setRunning] = useState(0);
  const changemilesecond = (previous) => {
    if (previous === 1000) {
      setmileSecond(changeSecond);
      return 0;
    }
    return previous + 1;
  };
  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute);
      return 0;
    }
    return previous + 1;
  };
  const changeMinute = (previous) => {
    if (previous === 59) {
      setHour((previous) => {
        return previous + 1;
      });
      return 0;
    }
    return previous + 1;
  };
  useEffect(() => {
    if (running)
      timerRef.current = setInterval(() => {
        //not understandable
        setmileSecond(changemilesecond);
      }, 10);
    else clearInterval(timerRef.current);
  }, [running]);
  console.log("Rerendering");
  const reset = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setmileSecond(0);
  };

  const onLap = () => {
    if (setLap === 0) {
      onLap(0);
    } else
      setLap((previous) => {
        return [
          ...previous,
          {
            hour,
            minute,
            second,
            milesecond,
            id: "v4[]",
          },
        ];
      });
  };
  const lapReset = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setmileSecond(0);
    setLap([]);
  };
  return (
    <div id="main" className="flex items-center justify-center">
      <div className="w-[500px] h-[400px] mt-[130px] bg-purple-500">
        <div className=" flex justify-center items-center text-white text-5xl mt-5 font-normal">
          <h3> {hour} </h3>:<h3>{minute}</h3>:<h3>{second}</h3>:
          <h3> {milesecond} </h3>
        </div>
        <div className=" w-[80%] m-auto justify-center mt-[100px] flex gap-9">
          <Button type="primary" onClick={onLap}>
            Lap
          </Button>
          {running ? (
            <Button
              onClick={() => {
                setRunning(false);
              }}
            >
              Pause
            </Button>
          ) : (
            <Button
              onClick={() => {
                setRunning(true);
              }}
            >
              Start
            </Button>
          )}

          <Button onClick={() => showModal()} danger type="primary ">
            ReStart
          </Button>
        </div>
        <div className="w-full flex flex-col gap-4 items-center ">
          {lap.map(({ id, hour, minute, second, milesecond }) => {
            return (
              <div
                key={id}
                className="flex items-center justify-center text-white mt-3 gap-2"
              >
                <h1>Laps timers:</h1>
                <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>:
                <h3>{milesecond}</h3>
              </div>
            );
          })}
          {lap?.length && <Button onClick={() => lapReset()}>Reset</Button>}
        </div>
      </div>
      <Modal
        title="Remove Reset"
        open={isModalOpen}
        onOk={handleOk}
        loading={loading}
        onClick={() => {
          reset();
        }}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            NoRemove
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Remove
          </Button>,
        ]}
      >
        <p>Do you remove this information</p>
      </Modal>
    </div>
  );
};

export default App;
