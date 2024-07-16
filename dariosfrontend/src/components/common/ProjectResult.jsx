import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProjectResult = ({ projectSearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    return (
        <section className="estimate-results">
            {projectSearchResults.map(project => {
                return (
                
                    <div key={project.id} className="estimate-list-item">
                        <img className='estimate-list-item-image' src={project.projectPhotoUrl} alt={project.projectType} />
                        <div className="estimate-details">
                            <h3>{project.projectType}</h3>
                            <p>{new Date(project.projectDateStarted).toLocaleDateString()} - {new Date(project.projectDateFinished).toLocaleDateString()}</p>
                            <p>Address: {project.projectAddress}</p>
                            <p>Description: {project.projectDescription}</p>
                        </div>
                        <div className="book-now-div">
                            {isAdmin && (
                                <button
                                    className="edit-estimate-button"
                                    onClick={() => navigate(`/admin/edit-project/${project.id}`)}
                                >
                                    Edit Project
                                </button>
                            )}
                        </div>

                        {/* <div className='book-now-div'>
                            {isAdmin ? (
                                <button
                                    className="edit-estimate-button"
                                    onClick={() => navigate(`/admin/edit-estimate/${estimate.id}`)}
                                >
                                    Edit Estimate
                                </button>
                            ) : (
                                <button
                                    className="book-now-button"
                                    onClick={() => navigate(`/estimate-details-book/${estimate.id}`)}
                                >
                                    Book Now
                                </button>
                            )}
                        </div> */}
                    </div>
                );
            })}
        </section>
    );
};

export default ProjectResult;