import React, { useContext, useEffect, useState } from "react";
import IncubatorContext from "../../context/incubator/incubatorContext";

const DetailIncubator = ({ deviceDetailData }) => {
	const incubatorContext = useContext(IncubatorContext);
	const [deviceDetail, setDeviceDetail] = useState(null);
	const { incubators } = incubatorContext;

	useEffect(() => {
		let arr = incubators.filter(
			(incubator) => incubator.deviceId === deviceDetailData.deviceId // unique - serves as an "id"
		);
		setDeviceDetail(arr[0]);
	}, [incubators]);

	return <div>{deviceDetail && deviceDetail.deviceName}</div>;
};

export default DetailIncubator;
