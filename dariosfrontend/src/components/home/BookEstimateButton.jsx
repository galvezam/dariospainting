import { Box, HStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const BookEstimateButton = () => {
    return (
        <Box backgroundColor="#f9f9f9" margin={30}>
        <HStack borderRadius="10px" margin={10} justifyContent="center">
            {/* <Box>
                <h2 className="home-services">Services at <span className="dp-color">Dario's Painting</span>
                    <h6>With over 30 years of experience, we offer unparalleled class quality.</h6>
                </h2>
            </Box> */}
            <RouterLink to="/user/add-estimate" style={{ textDecoration: 'none' }}>
                    <Box 
                        justifyContent="center"
                        display="flex"
                        alignItems="center"                    
                        _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
                        borderRadius={10}
                        width="320px"
                        height="100px"
                        
                        
                    >
                    <Button 
                        fontSize="26px"
                        display="flex"
                        padding="0.5em 2em"
                        border="transparent"
                        boxShadow="2px 2px 4px rgba(0,0,0,0.4)"
                        bg = "#F4CE14"
                        color="white"
                        borderRadius="10px"
                        width={300}
                        height={80}
                        _hover={{
                            background: "linear-gradient(90deg, rgba(255, 206, 20, 1) 0%, rgba(255, 234, 0, 1) 100%)",
                            borderRadius: "10px"
                            /*background: "linear-gradient(90deg, rgba(30,144,255,1) 0%, rgba(0,212,255,1) 100%)"*/
                        }}
                        _active={{
                            transform: "translate(0em, 0.2em)"
                        }}
                        mt="auto"
                        
                        >
                        Book a Free Estimate
                    </Button>
                    </Box>
                </RouterLink>
            {/* <h4><a className="view-estimates-home" href="/estimates">All Estimates</a></h4> */}
            
        </HStack>
        </Box>
    )
}

export default BookEstimateButton;