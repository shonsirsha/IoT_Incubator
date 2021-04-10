import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Form } from "react-bootstrap";
import { Input } from "../Forms/Input";
import { BodyNormal } from "../Typography/Typographies";
import { CardPreset } from "../Cards/CardPreset";
import { MainButton } from "../Buttons/Buttons";
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
	const [selectedPreset, setSelectedPreset] = useState("CH");
	const [data, setData] = useState({
		deviceName: "",
		hatchPresetDetail: null,
	});
	const onSelect = (id) => {
		setSelectedPreset(id);
		let hatchP = HatchPreset.filter((d) => d.id === id);
		setData({ ...data, hatchPresetDetail: hatchP });
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
		<div className="d-flex flex-column">
			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Input
					title={"Device Name"}
					placeholder={"DEVICE-123"}
					name="deviceName"
					className="mb-4"
					value={data.deviceName}
					onChange={(e) => onChange(e)}
					caption={"Device name can only contain letters, numbers, and hyphens"}
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
						selected={d.id === selectedPreset}
						onSelect={() => onSelect(d.id)}
					/>
				))}
				<MainButton text={"Set Up Incubator"} type={"button"} />
			</Form>
		</div>
	);
};

export default SetupIncubator;
