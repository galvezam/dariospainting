import { Heading, HStack, Image, Text, VStack, Box, Link, Icon} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

import React from "react";

const Card = ({ title, description, imageSrc, link }) => {
  const navigate = useNavigate();
  return (
    <Link onClick={() => navigate(link)} style={{ textDecoration: "none" }} isExternal>
      <Box
        
        overflow="hidden"
        boxShadow="md"
        _hover={{ 
          boxShadow: "xl", 
          transform: "scale(1.01)", 
          transition: "0.5s",
          backgroundColor: "gold" // Change color to gold on hover
        }}
        
        cursor="pointer"
        width={600}
        height={460}
        padding={0}
        color="white"
        position="relative" // Added to position the text inside the image
      >
        <Image src={imageSrc} alt={title} objectFit="cover" w="700px" h="460px" />
        <Box
          position="absolute" // Positioning the text box inside the image
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          
          _hover={{ 
            boxShadow: "xl", 
            transform: "scale(1.01)", 
            transition: "0.5s",
            backgroundColor: "rgba(255, 233, 147, 0.5)" // Change color to light gold transparent on hover
            // backgroundColor: "rgba(212, 235, 242, 0.5)" // Change color to light blue transparent on hover
          }}
          bg="rgba(0, 0, 0, 0.2)" // Optional: Add a semi-transparent background for better readability
        >
          <Heading fontSize="40px" fontStyle="bold">{title}</Heading>
        </Box>
        <Box p="4" color="white"
          >
          <VStack align="start" p={4} spacing={3}>
            <Heading size="lg" className="description-text">{title}</Heading>
            <Text>{description}</Text>
            <HStack align="center">
              <Text fontWeight="bold">Learn More</Text>
              <FontAwesomeIcon icon={faArrowRight} />
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
  // return (
  //   <Link href={link} style={{ textDecoration: "none" }} isExternal>
  //   <Box
  //     borderWidth="1px"
  //     borderRadius="lg"
  //     overflow="hidden"
  //     boxShadow="md"
  //     _hover={{ boxShadow: "xl", transform: "scale(1.01)", transition: "0.5s" }}
  //     cursor="pointer"
  //     width={480}
  //     height={400}
  //     padding={0}
  //   >
      
  //     <Image src={imageSrc} alt={title} objectFit="cover" w="700px" h="400px" />
  //     <Box p = "4">
  //     <VStack align="start" p={4} spacing={3}>
  //       <Heading size="md">{title}</Heading>
  //       <Text>{description}</Text>
  //       <HStack align="center">
  //         <Text fontWeight="bold">Learn More</Text>
  //         <FontAwesomeIcon icon={faArrowRight} />
  //       </HStack>
  //     </VStack>
  //     </Box>
      
  //   </Box>
  //   </Link>
   
  // );
};

export default Card;
