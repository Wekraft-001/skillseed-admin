import React from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SchoolDropdown = ({ value, onChange }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");

  const fetchSchools = async () => {
    const res = await axios.get(`${apiURL}/schools/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    return res.data;
  };

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: fetchSchools,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const options = schools.map((school) => ({
    label: school.schoolName,
    value: school.schoolName,
  }));

  return (
    <div>
      <label className="block text-sm font-semibold text-deep-navy mb-3">
        School Name
      </label>
      <Select
        isLoading={isLoading}
        options={options}
        value={options.find((opt) => opt.value === value)}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
        placeholder="Select School"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SchoolDropdown;
