import React, { useState, useEffect, useRef } from "react";
import login from "../../../css/login/login.module.css";
import TableCss from "../../../css/date/dateWrite.module.css";
import { Form, Col, Dropdown, InputGroup } from "react-bootstrap";
import dogsBreeds from "./dogsBreeds"; // dogsBreeds 데이터 가져오기

const PetInfo5PetSpecies = ({
  setDogsBreed,
  selectedBreed,
  setSelectedBreed,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState(dogsBreeds);

  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleSelect = (breed) => {
    setSelectedBreed(breed.text);
    setDogsBreed(breed.value);
    setSearchTerm(breed.text);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const matchingBreed = dogsBreeds.find(
      (breed) => breed.text.toLowerCase() === newSearchTerm.toLowerCase()
    );

    if (matchingBreed) {
      setSelectedBreed(matchingBreed.text);
      setDogsBreed(matchingBreed.value);
    } else {
      setSelectedBreed("선택");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredBreeds(
        dogsBreeds.filter((breed) =>
          breed.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setFilteredBreeds(dogsBreeds);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  return (
    <>
      <div
        style={{ width: "350px" }}
        className={`d-flex justhfi-content-start`}
      >
        <span className={`${login.JoinAuthFont3} mt-3`}>견종</span>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
      >
        <Form.Group
          as={Col}
          controlId="formGridCheckPurpose"
          className="d-flex justify-content-center align-items-center"
        >
          <InputGroup
            size="lg"
            className={`mt-2 mb-2`}
            style={{
              width: "250px",
            }}
          >
            <Form.Control
              onChange={handleChange}
              name="breed"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="견종 검색"
              value={searchTerm}
              ref={searchRef}
            />
          </InputGroup>
          <div className={TableCss.FormTitleDiv}>
            <Dropdown
              show={showDropdown}
              onToggle={() => setShowDropdown(!showDropdown)}
            >
              <Dropdown.Toggle
                className={TableCss.filterDropdownBtn}
                variant="success"
                id="dropdown-basic"
                style={{
                  border: "1px solid #F56084",
                  backgroundColor: "white",
                  color: "#F56084",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "100px",
                }}
              >
                {selectedBreed}
              </Dropdown.Toggle>
              <Dropdown.Menu
                align="end"
                className={TableCss.filterDropdownMenu}
                style={{ width: "100%", maxHeight: "200px", overflow: "auto" }}
              >
                {filteredBreeds.map((breed) => (
                  <Dropdown.Item
                    key={breed.value}
                    onClick={() => handleSelect(breed)}
                  >
                    {breed.text}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Form.Group>
      </div>
    </>
  );
};

export default PetInfo5PetSpecies;
