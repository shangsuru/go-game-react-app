const countries = ['Germany', 'USA', 'Korea', 'China', 'Japan', 'Sweden', 'France', 'Russia', 'India'];

function renderFlag(country) {
	let altText, countryID;
	switch (country) {
		case 'Korea':
			altText = 'Korea';
			countryID = 'KR';
			break;
		case 'China':
			altText = 'China';
			countryID = 'CN';
			break;
		case 'Sweden':
			altText = 'Sweden';
			countryID = 'SE';
			break;
		case 'France':
			altText = 'France';
			countryID = 'FR';
			break;
		case 'USA':
			altText = 'USA';
			countryID = 'US';
			break;
		case 'Germany':
			altText = 'Germany';
			countryID = 'DE';
			break;
		case 'Russia':
			altText = 'Russia';
			countryID = 'RU';
			break;
		case 'India':
			altText = 'India';
			countryID = 'IN';
			break;
		default:
			altText = 'Japan';
			countryID = 'JP';
			break;
	}

	return `http://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryID}.svg`;
}

export { countries, renderFlag };
