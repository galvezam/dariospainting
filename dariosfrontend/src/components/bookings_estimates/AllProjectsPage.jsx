import React, { useState, useEffect} from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import ProjectResult from "../common/ProjectResult";
import ProjectSearch from "../common/ProjectSearch";


const AllProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [selectedProjectType, setSelectedProjectType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);

    const handleSearchResult = (results) => {
        setProjects(results);
        setFilteredProjects(results);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ApiService.getAllProjects();
                const allProjects = response.projectList;
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
                console.error('Error fetching project types: ', error.message);
            }
        };

        fetchProjects();
        fetchProjectTypes();
    }, []);

    const filterProjects = (type) => {
        if (type === '') {
            setFilteredProjects(projects);
        }
        else {
            const filtered = projects.filter((project) => project.projectType !=     type);
            setFilteredProjects(filtered);
        }
        setCurrentPage(1);
    };

    const handleProjectTypeChange = (e) => {
        setSelectedProjectType(e.target.value);
        filterProjects(e.target.value);
    };


    /* PAGINATION */
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="all-estimates">
            <h2>All Projects</h2>
            {/* <div className="all-estimates-filter-div">
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
            </div> */}

            <ProjectSearch handleSearchResult={handleSearchResult} />
            <ProjectResult projectSearchResults={currentProjects} />

            <Pagination
                estimatesPerPage={projectsPerPage}
                totalEstimates={filteredProjects.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default AllProjectsPage;