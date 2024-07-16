import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import EstimateResult from "../common/EstimateResult";

const ManageEstimatesPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [selectedProjectType, setSelectedProjectType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    const [projectAdded, setProjectAdded] = useState(false); // New state variable
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ApiService.getAllProjects();
                const allProjects = response.estimatesList;
                setProjects(allProjects);
                setFilteredProjects(allProjects);
            }
            catch (error) {
                console.error('Error fetching projects: ', error.message);
            }
        };

        const fetchProjectTypes = async () => {
            try {
                const types = await ApiService.getProjectTypes();
                setProjectTypes(types);
            }
            catch (error) {
                console.error('Error fetching estimate types: ', error.message);
            }
        };
        fetchProjects();
        fetchProjectTypes();
    }, [projectAdded]);

    const handleProjectTypeChange = (e) => {
        setSelectedProjectType(e.target.value);
        filterProjects(e.target.value);
    };

    const filterProjects = (type) => {
        if (!projects) {
            return;
        }
        if (type === '') {
            setFilteredProjects(projects);
        }
        else {
            const filtered = projects.filter((project) => project.projectType === type);
            setFilteredProjects(filtered);
        }
        setCurrentPage(1);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = (filteredProjects || []).slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAddProject = () => {
        navigate('/admin/add-project');
        // navigate('/home');
        setProjectAdded(!projectAdded); // Toggle the state to trigger re-fetch
    };

    return (
        <div className="all-estimates">
            <h2>All Projects</h2>
            <div className="all-estimates-filter" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className="filter-select-div">
                    <label>Filter by Project Type:</label>
                    <select value={selectedProjectType} onChange={handleProjectTypeChange}>
                        <option value="">All</option>
                        {projectTypes.map((type) => {
                            return (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            );
                        })}
                    </select>
                    <button className="add-estimate-button" onClick={handleAddProject}>
                        Add Project
                    </button>
                </div>
            </div>

            <EstimateResult estimateSearchResults={currentProjects} />
            <Pagination
                estimatesPerPage={projectsPerPage}
                totalEstimates={(currentProjects || []).length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageEstimatesPage;