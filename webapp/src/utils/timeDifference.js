export function timeDifference(current, previous) {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		return "just now";
	} else if (elapsed < msPerHour) {
		return (
			Math.round(elapsed / msPerMinute) +
			` ${Math.round(elapsed / msPerMinute) > 1 ? `minutes` : `minute`} ago`
		);
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + " hours ago";
	} else if (elapsed < msPerMonth) {
		return (
			Math.round(elapsed / msPerDay) +
			` ${Math.round(elapsed / msPerMinute) > 1 ? `days` : `day`} ago`
		);
	} else if (elapsed < msPerYear) {
		return (
			Math.round(elapsed / msPerMonth) +
			` ${Math.round(elapsed / msPerMinute) > 1 ? `months` : `month`} ago`
		);
	} else {
		return Math.round(elapsed / msPerYear) + " years ago";
	}
}
