import React, { useContext, useEffect, useState } from "react";
import IncubatorContext from "../../context/incubator/incubatorContext";
import styled from "styled-components";
import { BodyNormal, HeadingXS } from "../Typography/Typographies";
import { danger, darkPrimary } from "../Colours/Colours";
const StyledBodyNormal = styled(BodyNormal)`
	color: ${(props) => (props.active ? darkPrimary : danger)};
`;
const StyledHeadingXS = styled(HeadingXS)`
	color: ${(props) => (props.active ? darkPrimary : danger)};
`;
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

	return (
		<>
			{deviceDetail && (
				<div className="d-flex flex-column">
					<div className="d-flex align-items-center">
						<StyledBodyNormal active={deviceDetail.active}>
							Status:{" "}
						</StyledBodyNormal>
						<StyledHeadingXS className="mt-1 ml-2" active={deviceDetail.active}>
							{deviceDetail.active ? `ONLINE / ACTIVE` : `OFFLINE / INACTIVE`}
						</StyledHeadingXS>
					</div>
				</div>
			)}
		</>
	);
};

export default DetailIncubator;
