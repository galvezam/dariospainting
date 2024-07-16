import { Box, Text } from "@chakra-ui/react";

const Title = () => {
    return (
        <Box 
        className="contact-us-text"

        //order={{ base: -1, md: 0 }} // Add this line
        // marginBottom={{ base: 10, md: 0 }} 
        
        // minWidth={{ base: "100%", md: "auto" }}
        // textAlign={{ base: "center", md: "left" }}
        >
            
            <Text fontSize="40px" fontWeight="bold" color="black">Dario's Painting</Text>
            {/* <Text fontSize="50px" fontWeight="bold" color="black">Painting</Text> */}
        
        </Box>
    )
}

export default Title;