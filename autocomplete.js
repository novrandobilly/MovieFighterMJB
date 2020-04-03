const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue }) => {
	root.innerHTML = `
    <label><b>Search For Movie</b></label>
    <input type="text" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

	const input = root.querySelector('.input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	//==========================================================================
	const onInput = debounce(async (event) => {
		const movies = await fetchData(event.target.value);

		if (!movies.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		resultsWrapper.innerHTML = '';
		dropdown.classList.add('is-active');
		for (let movie of movies) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(movie);
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(movie);
				onOptionSelect(movie);
			});
			resultsWrapper.appendChild(option);
		}
	}, 500);
	//==========================================================================

	input.addEventListener('input', onInput);

	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};