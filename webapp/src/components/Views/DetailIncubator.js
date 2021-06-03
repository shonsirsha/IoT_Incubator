import React, { useContext, useEffect, useState } from "react";
import IncubatorContext from "../../context/incubator/incubatorContext";
import styled from "styled-components";
import { BodyNormal, HeadingXS } from "../Typography/Typographies";
import { CardCurrent } from "../Cards/CardCurrent";
import { ButtonText, ButtonTextDanger } from "../Buttons/Buttons";

import { danger, darkPrimary, darkGrey } from "../Colours/Colours";
import { timeDifference } from "../../utils/timeDifference";

const StyledBodyNormal = styled(BodyNormal)`
  color: ${(props) => (props.active ? darkPrimary : danger)};
`;
const StyledHeadingXS = styled(HeadingXS)`
  color: ${(props) => (props.active ? darkPrimary : danger)};
`;
const StyledBodyNormal2 = styled(BodyNormal)`
  color: ${(props) => (props.active ? darkPrimary : darkGrey)};
`;
const StyledHeadingXS2 = styled(HeadingXS)`
  color: ${(props) => (props.active ? darkPrimary : darkGrey)};
`;

const ResumeButton = styled(ButtonText)`
  margin-left: -6px;
`;

const StyledBtnTextDanger = styled(ButtonTextDanger)`
  position: absolute;
  bottom: 24px;
`;

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

const DetailIncubator = ({ deviceDetailData }) => {
  const incubatorContext = useContext(IncubatorContext);
  const [deviceDetail, setDeviceDetail] = useState(null);
  const { incubators, deleteIncubator, alterIncubatorStatus } =
    incubatorContext;

  const firstDate = deviceDetailData.createdAt;
  const secondDateMin = new Date(deviceDetailData.createdAt).addDays(
    deviceDetailData.hatchPreset.minDays
  );
  const secondDateMax = new Date(deviceDetailData.createdAt).addDays(
    deviceDetailData.hatchPreset.maxDays
  );

  const diffDaysMin = Math.round(
    Math.abs((firstDate - secondDateMin) / oneDay)
  );
  const diffDaysMax = Math.round(
    Math.abs((firstDate - secondDateMax) / oneDay)
  );

  useEffect(() => {
    let arr = incubators.filter(
      (incubator) => incubator.deviceId === deviceDetailData.deviceId // unique - serves as an "id"
    );
    setDeviceDetail(arr[0]);
  }, [incubators]);

  const createdAt =
    new Date(parseInt(deviceDetailData.createdAt)).getDate() +
    "." +
    new Date(parseInt(deviceDetailData.createdAt)).getMonth() +
    "." +
    new Date(parseInt(deviceDetailData.createdAt)).getFullYear();

  return (
    <>
      {deviceDetail && (
        <div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-1">
              <StyledBodyNormal active={deviceDetail.active}>
                Status:{" "}
              </StyledBodyNormal>
              <StyledHeadingXS
                className="mt-1 ml-2"
                active={deviceDetail.active}
              >
                {deviceDetail.active ? `ONLINE / ACTIVE` : `OFFLINE / INACTIVE`}
              </StyledHeadingXS>
            </div>

            <div className="d-flex mt-4">
              <CardCurrent
                title={"Current Temperature"}
                active={deviceDetail.active}
                reading={deviceDetail.currentTemp + "°C"}
              />
              <CardCurrent
                title={"Current Humidity"}
                active={deviceDetail.active}
                reading={deviceDetail.currentHum + "%"}
              />
            </div>

            {/* <StyledHeadingXS2 className="mt-3" active={deviceDetail.active}>
							{deviceDetailData.hatchPreset.minDays === -1 ? (
								<>{diffDaysMax} days to go</>
							) : (
								<>
									{diffDaysMin}-{diffDaysMax} days to go
								</>
							)}
						</StyledHeadingXS2> */}

            <StyledBodyNormal2 className="mt-2" active={deviceDetail.active}>
              Hatch preset: {deviceDetail.hatchPreset.name} (
              {deviceDetail.hatchPreset.minTemp}-{" "}
              {deviceDetail.hatchPreset.maxTemp}°C at{" "}
              {deviceDetail.hatchPreset.minHum}-
              {deviceDetail.hatchPreset.maxHum}% relative humidity)
            </StyledBodyNormal2>

            {/* <StyledBodyNormal2 className="mt-1" active={deviceDetail.active}>
							Heating:{" "}
							{deviceDetail.active ? (
								<>
									{deviceDetail.currentTemp <
										deviceDetail.hatchPreset.minTemp ||
									deviceDetail.currentTemp <=
										deviceDetail.hatchPreset.maxTemp ? (
										<>ON</>
									) : (
										<>OFF</>
									)}
								</>
							) : (
								"-"
							)}
						</StyledBodyNormal2> */}
            {/* <StyledBodyNormal2 className="mt-1" active={deviceDetail.active}>
							Ventilation:{" "}
							{deviceDetail.active ? (
								<>
									{deviceDetail.currentHum < deviceDetail.hatchPreset.minHum ||
									deviceDetail.currentHum <= deviceDetail.hatchPreset.maxHum ? (
										<>CLOSED</>
									) : (
										<>OPENED</>
									)}
								</>
							) : (
								"-"
							)}
						</StyledBodyNormal2> */}
            <StyledBodyNormal2 className="mt-5" active={deviceDetail.active}>
              <>
                Incubator created on {createdAt} (
                {timeDifference(
                  Date.now(),
                  new Date(deviceDetailData.createdAt)
                )}
                )
              </>
            </StyledBodyNormal2>

            {!deviceDetail.active && (
              <div className="d-flex mt-1">
                <ResumeButton
                  onClick={() => {
                    const data = {
                      active: deviceDetail.active,
                      deviceName: deviceDetail.deviceName,
                    };
                    alterIncubatorStatus(data);
                  }}
                >
                  Start / Resume Incubator
                </ResumeButton>
              </div>
            )}

            <StyledBtnTextDanger
              onClick={() => {
                if (!deviceDetail.active) {
                  // delete
                  deleteIncubator(deviceDetail.deviceName);
                  if (window) {
                    window.location.reload();
                  }
                } else {
                  //pause

                  const data = {
                    active: deviceDetail.active,
                    deviceName: deviceDetail.deviceName,
                  };
                  alterIncubatorStatus(data);
                }
              }}
            >
              {deviceDetail.active ? `Pause` : `Delete`} Incubator
            </StyledBtnTextDanger>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailIncubator;
