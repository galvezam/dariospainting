import React, { useState, useEffect} from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import EstimateResult from "../common/EstimateResult";
import EstimateSearch from "../common/EstimateSearch";


const AllEstimatesPage = () => {
    const [estimates, setEstimates] = useState([]);
    const [filteredEstimates, setFilteredEstimates] = useState([]);
    const [estimateTypes, setEstimateTypes] = useState([]);
    const [selectedEstimateType, setSelectedEsimateType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [estimatesPerPage] = useState(5);

    const handleSearchResult = (results) => {
        setEstimates(results);
        setFilteredEstimates(results);
    };

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const response = await ApiService.getAllEstimates();
                const allEstimates = response.estimateList;
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
    }, []);

    const filterEstimates = (type) => {
        if (type === '') {
            setFilteredEstimates(estimates);
        }
        else {
            const filtered = estimates.filter((estimate) => estimate.estimateType !=     type);
            setFilteredEstimates(filtered);
        }
        setCurrentPage(1);
    };

    const handleEstimateTypeChange = (e) => {
        setSelectedEsimateType(e.target.value);
        filterEstimates(e.target.value);
    };


    /* PAGINATION */
    const indexOfLastEstimate = currentPage * estimatesPerPage;
    const indexOfFirstEstimate = indexOfLastEstimate - estimatesPerPage;
    const currentEstimates = filteredEstimates.slice(indexOfFirstEstimate, indexOfLastEstimate);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="all-estimates">
            <h2>All Estimates</h2>
            <div className="all-estimates-filter-div">
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
            </div>

            <EstimateSearch handleSearchResult={handleSearchResult} />
            <EstimateResult estimateSearchResults={currentEstimates} />

            <Pagination
                estimatesPerPage={estimatesPerPage}
                totalEstimates={filteredEstimates.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default AllEstimatesPage;