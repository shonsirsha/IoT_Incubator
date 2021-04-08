import styled from "styled-components";
import { secondary, darkGrey, primary } from "../Colours/Colours";
import { HeadingS, BodyNormal, HeadingXS } from "../Typography/Typographies";

const CardPresetontainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.selected ? `#eefff8` : `white`)};
  border: ${(props) => (props.selected ? primary : secondary)} 2px solid;
  color: ${(props) => (props.selected ? primary : darkGrey)};
  padding: 16px;
  border-radius: 8px;
  transition: all 300ms;
  .icon > path {
    stroke: ${(props) => (props.selected ? primary : "#ACACAC")};
  }
  &:hover {
    cursor: pointer;
    border-color: ${primary};
    color: ${primary};
    background: #eefff8;
    .icon > path {
      stroke: ${primary};
    }
  }
`;

const Drop = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
  >
    <path
      d="M16.25 11.25C16.25 5.625 10 1.25 10 1.25C10 1.25 3.75 5.625 3.75 11.25C3.75 12.9076 4.40848 14.4973 5.58058 15.6694C6.75269 16.8415 8.3424 17.5 10 17.5C11.6576 17.5 13.2473 16.8415 14.4194 15.6694C15.5915 14.4973 16.25 12.9076 16.25 11.25Z"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.6343 14.9387C11.3988 14.8088 12.1041 14.4447 12.6527 13.8967C13.2014 13.3488 13.5663 12.644 13.6972 11.8797"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Thermometer = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
  >
    <path
      d="M16.5625 7.8125C17.4254 7.8125 18.125 7.11294 18.125 6.25C18.125 5.38706 17.4254 4.6875 16.5625 4.6875C15.6996 4.6875 15 5.38706 15 6.25C15 7.11294 15.6996 7.8125 16.5625 7.8125Z"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.875 11.4864V3.75C6.875 3.08696 7.13839 2.45107 7.60723 1.98223C8.07607 1.51339 8.71196 1.25 9.375 1.25C10.038 1.25 10.6739 1.51339 11.1428 1.98223C11.6116 2.45107 11.875 3.08696 11.875 3.75V11.4864L11.8756 11.4856C12.5422 12.0062 13.0297 12.722 13.2701 13.533C13.5104 14.344 13.4916 15.2098 13.2163 16.0096C12.941 16.8094 12.4228 17.5033 11.7342 17.9945C11.0456 18.4857 10.2209 18.7498 9.375 18.7498C8.52914 18.7498 7.70437 18.4857 7.01576 17.9945C6.32715 17.5033 5.80905 16.8094 5.53373 16.0096C5.2584 15.2098 5.2396 14.344 5.47993 13.533C5.72027 12.722 6.20775 12.0062 6.87438 11.4856L6.875 11.4864Z"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.375 16.25C10.2379 16.25 10.9375 15.5504 10.9375 14.6875C10.9375 13.8246 10.2379 13.125 9.375 13.125C8.51206 13.125 7.8125 13.8246 7.8125 14.6875C7.8125 15.5504 8.51206 16.25 9.375 16.25Z"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.375 13.125V6.875"
      stroke="#ACACAC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const CardPreset = ({ isOnline = false }) => {
  return (
    <CardPresetontainer>
      <div className="d-flex justify-content-between mb-3">
        <HeadingS>Chicken</HeadingS>
        <BodyNormal>14-17 days</BodyNormal>
      </div>
      <div className="d-flex">
        <div className="ml-1 d-flex flex-column mr-4">
          <div className="d-flex">
            {Thermometer}

            <div className="ml-2 d-flex flex-column">
              <HeadingXS className="mb-1">Temperature</HeadingXS>

              <BodyNormal>33°C</BodyNormal>
            </div>
          </div>
        </div>
        <div className="ml-1 d-flex flex-column mr-4">
          <div className="d-flex">
            {Drop}

            <div className="ml-2 d-flex flex-column">
              <HeadingXS className="mb-1">Humidity</HeadingXS>

              <BodyNormal>57%</BodyNormal>
            </div>
          </div>
        </div>
      </div>
    </CardPresetontainer>
  );
};
