import React from "react";

const Pagination = ({ estimatesPerPage, totalEstimates, currentPage, paginate }) => {
    const pageNumber = [];
    const totalPages = Math.ceil(totalEstimates / estimatesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumber.push(i);
    };

    const renderPageNumbers = () => {
        const pages = [];
    
        // Always show the first page
        pages.push(
            <li key={1} className="pagination-li">
                <button onClick={() => paginate(1)} className={`pagination-button ${currentPage === 1 ? 'current-page' : ''}`} >
                    1
                </button>
            </li>
        );
    
        // Add ellipsis if current page is beyond the third page
        if (currentPage > 3) {
            pages.push(<li key="left-ellipsis" className="pagination-li">...</li>);
        }
    
        // Show the page before the current page if it's not one of the first two pages
        if (currentPage > 2) {
            pages.push(
                <li key={currentPage - 1} className="pagination-li">
                    <button onClick={() => paginate(currentPage - 1)} className="pagination-button">
                        {currentPage - 1}
                    </button>
                </li>
            );
        }
    
        // Show the current page if it's not one of the first two pages
        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(
                <li key={currentPage} className="pagination-li">
                    <button onClick={() => paginate(currentPage)} className="pagination-button current-page">
                        {currentPage}
                    </button>
                </li>
            );
        }
    
        // Show the page after the current page if it's not the last page
        if (currentPage < totalPages - 1) {
            pages.push(
                <li key={currentPage + 1} className="pagination-li">
                    <button onClick={() => paginate(currentPage + 1)} className="pagination-button">
                        {currentPage + 1}
                    </button>
                </li>
            );
        }
    
        // Add ellipsis if current page is not the last or second last page
        if (currentPage < totalPages - 2) {
            pages.push(<li key="right-ellipsis" className="pagination-li">...</li>);
        }
    
        // Always show the last page
        if (totalPages > 1) {
            pages.push(
                <li key={totalPages} className="pagination-li">
                    <button onClick={() => paginate(totalPages)} className={`pagination-button ${currentPage === totalPages ? 'current-page' : ''}`} >
                        {totalPages}
                    </button>
                </li>
            );
        }
    
        return pages;
    };
    
    // const renderPageNumbers = () => {
    //     if (totalPages <= 3) {
    //         return pageNumber.map((number) => (
    //             <li key={number} className="pagination-li">
    //                 <button onClick={() => paginate(number)} className={`pagination-button ${currentPage === number ? 'current-page' : ''}`} >
    //                     {number}
    //                 </button>
    //             </li>
    //         ));
    //     }

    //     const pages = [];
    //     if (currentPage > 2) {
    //         pages.push(
    //             <li key={1} className="pagination-li">
    //                 <button onClick={() => paginate(1)} className={`pagination-button ${currentPage === 1 ? 'current-page' : ''}`} >
    //                     1
    //                 </button>
    //             </li>
    //         );
    //     }

    //     if (currentPage > 3) {
    //         pages.push(<li key="left-ellipsis" className="pagination-li">...</li>);
    //     }

    //     pages.push(
    //         <li key={currentPage} className="pagination-li">
    //             <button onClick={() => paginate(currentPage)} className="pagination-button current-page">
    //                 {currentPage}
    //             </button>
    //         </li>
    //     );

    //     if (currentPage < totalPages - 1) {
    //         pages.push(<li key="right-ellipsis" className="pagination-li">...</li>);
    //     }

    //     if (currentPage < totalPages) {
    //         pages.push(
    //             <li key={totalPages} className="pagination-li">
    //                 <button onClick={() => paginate(totalPages)} className={`pagination-button ${currentPage === totalPages ? 'current-page' : ''}`} >
    //                     {totalPages}
    //                 </button>
    //             </li>
    //         );
    //     }

    //     return pages;
    // };


    return (
        <div className="pagination-nav">
            <ul className="pagination-ul">
                {renderPageNumbers()}
            </ul>
        </div>
        // <div className="pagination-nav">
        //     <ul className="pagination-ul">
        //         {pageNumber.map((number) => (
        //             <li key={number} className="pagination-li">
        //                 <button onClick={() => paginate(number)} className={`pagination-button ${currentPage === number ? 'current-page' : ''}`} >
        //                     {number}
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default Pagination;