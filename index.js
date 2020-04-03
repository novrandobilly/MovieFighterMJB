const fetchData = async (searchTerm) => {
	const response = await axios.get('https://www.omdbapi.com/', {
		params: {
			apikey: 'e55cd6f4',
			s: `${searchTerm}`
		}
	});

	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

createAutoComplete({
	root: document.querySelector('.autocomplete'),
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
        <img src='${imgSrc}'/>
        ${movie.Title} (${movie.Year})
        `;
	},
	onOptionSelect(movie) {
		onMovieSelect(movie);
	},
	inputValue(movie) {
		return movie.Title;
	}
});

const onMovieSelect = async (movie) => {
	const followUp = await axios.get('https://www.omdbapi.com/', {
		params: {
			apikey: 'e55cd6f4',
			i: `${movie.imdbID}`
		}
	});

	document.querySelector('#summary').innerHTML = movieTemplate(followUp.data);
};

const movieTemplate = (movieDetail) => {
	return `
    <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}" alt="">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
    `;
};
