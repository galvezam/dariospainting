import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EstimateResult = ({ estimateSearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    return (
        <section className="estimate-results">
            {estimateSearchResults.map(estimate => {
                return (
                
                    <div key={estimate.id} className="estimate-list-item">
                        <img className='estimate-list-item-image' src={estimate.estimatePhotoUrl} alt={estimate.estimateType} />
                        <div className="estimate-details">
                            <h3>{estimate.estimateType}</h3>
                            <p>Address: {estimate.estimateAddress}</p>
                            <p>Description: {estimate.estimateDescription}</p>
                        </div>
                        <div className="book-now-div">
                            {isAdmin && (
                                <button
                                    className="edit-estimate-button"
                                    onClick={() => navigate(`/admin/edit-estimate/${estimate.id}`)}
                                >
                                    Edit Estimate
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

export default EstimateResult;