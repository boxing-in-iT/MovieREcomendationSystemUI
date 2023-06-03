import styled from "styled-components";

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin-right: 10px;
`;

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      <StyledInput
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => handleSearchChange("")}>Clear</button>
    </div>
  );
};

export default SearchBar;
