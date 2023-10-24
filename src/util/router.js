const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRoute = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
		const { nextUrl } = e.detail;
		if (nextUrl) {
			// eslint-disable-next-line no-restricted-globals
			history.pushState(null, null, nextUrl);
			onRoute();
		}
	});
};

export const push = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
			},
		})
	);
};
