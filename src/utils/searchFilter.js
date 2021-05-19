const searchFilter = (searchQueries, moviesData) => {
    const { query = '', shortfilm = false } = searchQueries;

    const filterKeyword = (movie) => {
        return JSON.stringify(movie).toLowerCase().includes(query.toLowerCase())
    }

    const filterShortfilm = (movie) => {
        return movie.duration <= 40;
    }

    if (shortfilm) {
        return moviesData.filter(filterShortfilm).filter(filterKeyword);
    } else {
        return moviesData.filter(filterKeyword);
    }
}

export default searchFilter;
