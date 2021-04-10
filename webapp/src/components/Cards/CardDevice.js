import styled from "styled-components";
import { lighterSecondary } from "../Colours/Colours";
import { HeadingS, BodyNormal, HeadingXS } from "../Typography/Typographies";
import Thermometer from "./Thermometer.svg";
import Drop from "./Drop.svg";
import CaretRight from "./CaretRight.svg";

const CardDeviceContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: ${lighterSecondary};
	padding: 24px;
	border-radius: 10px;
	&:hover {
		cursor: pointer;
	}
`;
const StatusContainer = styled.div`
	display: flex;
	color: ${(props) => (props.isonline ? "#18CD09" : "#DE0C0C")};
	align-items: center;
`;
const StatusDot = styled.div`
	border-radius: 100%;
	background: ${(props) => (props.isonline ? "#18CD09" : "#DE0C0C")};
	width: 12px;
	height: 12px;
	margin-right: 4px;
`;
const ReadingsContainer = styled.div`
	display: flex;
	img {
		width: 24px;
		height: 24px;
	}
`;
const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	img {
		width: 20px;
		height: 20px;
	}
`;
export const CardDevice = ({
	deviceName,
	isOnline,
	className,
	currentHum,
	currentTemp,
	hatchPreset,
	createdAt,
}) => {
	return (
		<CardDeviceContainer className={className}>
			<div className="d-flex justify-content-between align-items-center">
				<HeadingS>{deviceName}</HeadingS>
				<StatusContainer isonline={isOnline}>
					{isOnline ? (
						<>
							<StatusDot isonline={isOnline} />
							<HeadingXS>ONLINE</HeadingXS>
						</>
					) : (
						<>
							<StatusDot isonline={isOnline} />
							<HeadingXS>OFFLINE</HeadingXS>
						</>
					)}
				</StatusContainer>
			</div>
			<BodyNormal className="mt-1">Preset: {hatchPreset}</BodyNormal>
			<div className="d-flex">
				<ReadingsContainer className="mt-3 mr-4">
					<img src={Thermometer} alt="Temperature" />
					<div className="ml-2 d-flex flex-column">
						<HeadingXS className="mb-1">Temperature</HeadingXS>
						<BodyNormal>{isOnline ? currentTemp + "°C" : "-"}</BodyNormal>
					</div>
				</ReadingsContainer>
				<ReadingsContainer className="mt-3">
					<img src={Drop} alt="Humidity" />
					<div className="ml-2 d-flex flex-column">
						<HeadingXS className="mb-1">Humidity</HeadingXS>
						<BodyNormal>{isOnline ? currentHum + "%" : "-"}</BodyNormal>
					</div>
				</ReadingsContainer>
			</div>
			<CardFooter className="mt-3">
				<div>
					<BodyNormal>
						<u>Created {createdAt}</u>
					</BodyNormal>
				</div>
				<div>
					<img src={CaretRight} alt="Right" />
				</div>
			</CardFooter>
		</CardDeviceContainer>
	);
};
