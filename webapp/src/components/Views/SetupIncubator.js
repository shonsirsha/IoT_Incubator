import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import IncubatorContext from "../../context/incubator/incubatorContext";
import { Form } from "react-bootstrap";
import { Input } from "../Forms/Input";
import { BodyNormal } from "../Typography/Typographies";
import { CardPreset } from "../Cards/CardPreset";
import { MainButton } from "../Buttons/Buttons";
import styled from "styled-components";
import spinner from "../../loading.gif";

const StyledSpinner = styled.img`
	width: 48px;
	height: 48px;
	margin: auto;
`;

const HatchPreset = [
	{
		id: "CH",
		name: "Chicken",
		minTemp: 37,
		maxTemp: 39,
		minHum: 50,
		maxHum: 60,
		minDays: -1,
		maxDays: 21,
	},
	{
		id: "QU",
		name: "Quail",
		minTemp: 37,
		maxTemp: 39,
		minHum: 65,
		maxHum: 70,
		minDays: 14,
		maxDays: 17,
	},
	{
		id: "DU",
		name: "Duck",
		minTemp: 37,
		maxTemp: 39,
		minHum: 80,
		maxHum: 85,
		minDays: -1,
		maxDays: 28,
	},
];
const SetupIncubator = () => {
	const incubatorContext = useContext(IncubatorContext);
	const { setupIncubator, incubatorLoading } = incubatorContext;
	const history = useHistory();

	const [data, setData] = useState({
		deviceName: "",
		hatchPreset: {
			id: "CH",
			name: "Chicken",
			minTemp: 37,
			maxTemp: 39,
			minHum: 50,
			maxHum: 60,
			minDays: -1,
			maxDays: 21,
		},
	});
	const onSelect = (id) => {
		let hatchP = HatchPreset.filter((d) => d.id === id);
		setData({ ...data, hatchPreset: hatchP[0] });
	};
	const onChange = (e) => {
		let deviceName = e.target.value
			.toUpperCase()
			.replace(/\s/g, "")
			// eslint-disable-next-line
			.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
		if (deviceName.length <= 24) {
			setData({ ...data, [e.target.name]: deviceName });
		}
	};

	// const authContext = useContext(AuthContext);
	return (
		<div className="d-flex flex-column my-auto">
			{incubatorLoading ? (
				<StyledSpinner src={spinner} alt="Loading..." />
			) : (
				<Form
					onSubmit={async (e) => {
						e.preventDefault();
						// console.log({ ...data, createdAt: Date.now() });
						const created = await setupIncubator({
							...data,
							createdAt: Date.now(),
						});
						if (created) {
							history.push("/sign-in");
						}
					}}
				>
					<Input
						title={"Device Name"}
						placeholder={"DEVICE-123"}
						name="deviceName"
						className="mb-4"
						value={data.deviceName}
						onChange={(e) => onChange(e)}
						caption={
							"Device name can only contain letters, numbers, and hyphens"
						}
					/>
					<BodyNormal className="mb-3">Hatch Preset</BodyNormal>
					{HatchPreset.map((d, ix) => (
						<CardPreset
							className={ix !== HatchPreset.length - 1 && "mb-4"}
							name={d.name}
							maxTemp={d.maxTemp}
							minTemp={d.minTemp}
							maxHum={d.maxHum}
							minHum={d.minHum}
							maxDays={d.maxDays}
							minDays={d.minDays}
							selected={d.id === data.hatchPreset.id}
							onSelect={() => onSelect(d.id)}
						/>
					))}
					<MainButton
						text={"Set Up Incubator"}
						type={"submit"}
						disabled={data.deviceName.length < 1}
					/>
				</Form>
			)}
		</div>
	);
};

export default SetupIncubator;
