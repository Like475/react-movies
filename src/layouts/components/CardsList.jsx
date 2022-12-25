import { Card } from './Card';

function CardsList(props) {
  return (
    <div className="CardsList row container">
      {
        props.movies.map((movie) => (
          <Card 
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            img={movie.Poster}
            type={movie.Type}
          />
        ))
      }
    </div>
  );
}

export { CardsList };