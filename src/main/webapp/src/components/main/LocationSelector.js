import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Dropdown, InputGroup, Button } from "react-bootstrap";

const regions = [
  "전체",
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주특별자치도",
];

const LocationSelector = ({ selectedLocation, setSelectedLocation, where }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleSelect = (region) => {
    setSelectedLocation(region);
    setSearchTerm(region);
    setShowDropdown(false);
  };

  const handleReset = () => {
    setSelectedLocation("지역 선택");
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const matchingRegion = regions.find(
      (region) => region.toLowerCase() === newSearchTerm.toLowerCase()
    );

    if (matchingRegion) {
      setSelectedLocation(matchingRegion);
    } else if (!newSearchTerm) {
      setSelectedLocation("지역 선택");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredRegions(
        regions.filter((region) =>
          region.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setFilteredRegions(regions);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%" }}
    >
      <InputGroup size={where === "main" ? "lg" : "lg"}>
        <Form.Control
          style={{
            fontSize: where === "main" ? "24px" : "1rem",
            height: "50px",
          }}
          onChange={handleChange}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="지역 검색"
          value={searchTerm}
          ref={searchRef}
        />
        <Button
          variant="outline-secondary"
          onClick={handleReset}
          style={{ border: "none" }}
        >
          x
        </Button>
        <Dropdown
          show={showDropdown}
          onToggle={() => setShowDropdown(!showDropdown)}
          alignRight
        >
          <Dropdown.Toggle
            style={{ backgroundColor: "#F56084", border: "none" }}
            id="dropdown-basic"
          >
            {selectedLocation || "지역 선택"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }}>
            {filteredRegions.map((region, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(region)}>
                {region}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </div>
  );
};

export default LocationSelector;
