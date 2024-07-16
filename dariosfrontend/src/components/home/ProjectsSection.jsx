import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
    {
        title: "Interior Painting",
        description: "",
        imageSrc: "./assets/images/interior_painting.jpg",
        link: "/user/add-estimate"
    },
    {
        title: "Exterior Painting",
        description: "World class quality",
        imageSrc: "./assets/images/exterior_painting.jpg",
        link: "/user/add-estimate"
    },
    {
        title: "Cabinet Refurbishing",
        description: "World class quality",
        imageSrc: "./assets/images/cabinets.jpg",
        link: "/user/add-estimate"
    },
    {
        title: "Siding Repair",
        description: "World class quality",
        imageSrc: "./assets/images/siding1.jpg",
        link: "/user/add-estimate"
    }
]

const ProjectsSection = () => {

    return (
      <FullScreenSection
        // dark green color: backgroundColor="#14532d"
        // cyan color: "#008080"
        // darker cyan: "#145b5f"
        // backgroundColor="#145b5f"
        backgroundColor="#f9f9f9"
        isDarkBackground
        p={20}
        // alignItems="flex-start"
        spacing={8}
      >
        <Heading  justifyContent="center" fontWeight="bold" alignItems="center" textAlign="center" color="#112049" id="service-section">
          Featured Projects
        </Heading>
        <Box
          className="projects-box"
          
          
        >
          {projects.map((project) => (
                <Card
                    
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    imageSrc={project.imageSrc}
                    link={project.link}
                />
            ))}
        </Box>
      </FullScreenSection>
    );
  };
  
  export default ProjectsSection;