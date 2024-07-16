import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import EstimateResult from "../common/EstimateResult";

const ManageEstimatesPage = () => {
    const [estimates, setEstimates] = useState([]);
    const [filteredEstimates, setFilteredEstimates] = useState([]);
    const [estimateTypes, setEstimateTypes] = useState([]);
    const [selectedEstimateType, setSelectedEstimateType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [estimatesPerPage] = useState(5);
    const [estimateAdded, setEstimateAdded] = useState(false); // New state variable
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const response = await ApiService.getAllEstimates();
                const allEstimates = response.estimatesList;
                setEstimates(allEstimates);
                setFilteredEstimates(allEstimates);
            }
            catch (error) {
                console.error('Error fetching estimates: ', error.message);
            }
        };

        const fetchEstimateTypes = async () => {
            try {
                const types = await ApiService.getEstimateTypes();
                setEstimateTypes(types);
            }
            catch (error) {
                console.error('Error fetching estimate types: ', error.message);
            }
        };
        fetchEstimates();
        fetchEstimateTypes();
    }, [estimateAdded]);

    const handleEstimateTypeChange = (e) => {
        setSelectedEstimateType(e.target.value);
        filterEstimates(e.target.value);
    };

    const filterEstimates = (type) => {
        if (!estimates) {
            return;
        }
        if (type === '') {
            setFilteredEstimates(estimates);
        }
        else {
            const filtered = estimates.filter((estimate) => estimate.estimateType === type);
            setFilteredEstimates(filtered);
        }
        setCurrentPage(1);
    };

    const indexOfLastEstimate = currentPage * estimatesPerPage;
    const indexOfFirstEstimate = indexOfLastEstimate - estimatesPerPage;
    const currentEstimates = (filteredEstimates || []).slice(indexOfFirstEstimate, indexOfLastEstimate);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAddEstimate = () => {
        navigate('/user/add-estimate');
        // navigate('/home');
        setEstimateAdded(!estimateAdded); // Toggle the state to trigger re-fetch
    };

    return (
        <div className="all-estimates">
            <h2>All Estimates</h2>
            <div className="all-estimates-filter" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className="filter-select-div">
                    <label>Filter by Estimate Type:</label>
                    <select value={selectedEstimateType} onChange={handleEstimateTypeChange}>
                        <option value="">All</option>
                        {estimateTypes.map((type) => {
                            return (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            );
                        })}
                    </select>
                    <button className="add-estimate-button" onClick={handleAddEstimate}>
                        Add Estimate
                    </button>
                </div>
            </div>

            <EstimateResult estimateSearchResults={currentEstimates} />
            <Pagination
                estimatesPerPage={estimatesPerPage}
                totalEstimates={(currentEstimates || []).length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageEstimatesPage;