import React from "react";
import { Box, HStack, VStack, Heading, Text, Image } from "@chakra-ui/react";

const AboutUs = () => {
    return (
        <Box className="about-us-box" backgroundColor="#112049" padding={20} display="flex" justifyContent="center" alignItems="center">
            <HStack className="about-us-content">
                <Image 
                src="./assets/images/dog_on_job.jpg" 
                alt="About Us" 
                className="about-us-image"
            />
            <VStack className="about-us-text">
                <Heading color="white">About Us</Heading>
                <Text fontStyle="italic" fontSize="20px" color="white">We are a team of 10 people who are passionate about painting. With over 30 years of experience, we offer a wide range of services, including but not limited to Interior Design, Exterior Painting, Cabinet Refurbishing, and Siding Repair.</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

export default AboutUs;