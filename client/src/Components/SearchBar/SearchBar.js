import "./SearchBar.css";

export default function SearchBar(props) {
  const handleSearchChange = (e) => {
    let query = e.currentTarget.value;
    props.getInfo(query.toLowerCase());
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar..."
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
    </div>
  );
}
