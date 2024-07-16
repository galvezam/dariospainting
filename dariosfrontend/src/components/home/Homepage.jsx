import React, {useState} from "react";
import EstimateResult from "../common/EstimateResult";
import EstimateSearch from "../common/EstimateSearch";
import BookEstimateButton from "./BookEstimateButton";
import ProjectsSection from "./ProjectsSection";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import SocialMedia from "./SocialMedia";
import Title from "./Title";
import Footer from "../common/Footer";
import { Box, HStack, Heading, Text, VStack, Image, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SuppliersCards from "./SuppliersCards";

const Homepage = () => {
    const [estimateSearchResults, setEstimateSearchResults] = useState([]);
    
    const handleSearchResult = (results) => {
        setEstimateSearchResults(results);
    };


    return (
        <div className="home-container">
            <div className="home-content">
                <section>
                    <header className="header-banner">
                        {/* <img src="./assets/images/house_img.jpeg" alt="Dario's Painting" className="header-image" /> */}
                        <div className="overlay"></div>
                        <div className="animated-texts overlay-content">
                            <h3>
                                {/* Welcome to <span className="dp-color">Dario's Painting</span> */}
                                Welcome to <h1>Dario's Painting.</h1>
                            </h3>
                            <br />
                            <h3>Quick. Modern. Reliable.</h3>
                        </div>
                    </header>
                </section>

                {/* <EstimateSearch handleSearchResult={handleSearchResult} />
                <EstimateResult estimateSearchResults={estimateSearchResults} /> */}
                {/* <div justifyContent="center" padding={50} alignItems="center">
                    <button className="view-estimates-home" href="/estimates">All Estimates</button>
                </div> */}

                

                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>

                <BookEstimateButton />
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <ProjectsSection />

                
                <SuppliersCards />

                <br />
                <br />
                <br />
                <AboutUs />
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <Title />
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <ContactUs />
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <SocialMedia />
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <div style={{backgroundColor: "white", width: "auto", height: "2px"}}></div>
                <div style={{backgroundColor: "#122049", width: "auto", height: "4px"}}></div>
                <Footer />
            </div>
            
        </div>
    );
};

export default Homepage;