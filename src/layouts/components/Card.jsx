function Card(props) {
  return (
    <div className="col s12 m6 l4 xl4">
      <div className="card">
        <div className="card-image">
          <div style={{backgroundImage: 'url(' + (props.img === 'N/A' ? 'https://via.placeholder.com/300x451.png?text=Poster+is+not+found' : props.img) + ')', minHeight: '300px', backgroundSize: 'cover'}}></div>
        </div>
        <div className="card-content">
          <span className="card-title" style={{maxHeight: '32px'}}>{props.title}</span>
          <ol>
            <li>Year: {props.year}</li>
            <li>Type: {props.type}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export { Card };