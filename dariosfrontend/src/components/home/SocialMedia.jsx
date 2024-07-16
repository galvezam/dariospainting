import { FaInstagram, FaFacebook, FaTiktok, FaPhone } from "react-icons/fa6";
import { Box, VStack, HStack, Link, Icon, Text } from "@chakra-ui/react";


const socials = [
    {
        name: "Facebook",
        icon: FaFacebook,
        url: "https://www.facebook.com/",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        url: "https://www.instagram.com/",
    },
    {
        name: "Tiktok",
        icon: FaTiktok,
        url: "https://www.tiktok.com/",
    },
  ];



const SocialMedia = () => {
    return (
        <Box
            backgroundColor="#f9f9f9"
            color="white"
        >
            <VStack spacing={10} align="center" color="white">
                {/* <h1>Social Media</h1> */}

                <HStack justifyContent="center" padding={10} spacing={8} className="social-media-container">
                    {socials.map((social, index) => (
                    <Link key={index} href={social.url} isExternal
                    style={{ textDecoration: "none"}}>
                        <HStack spacing={8} className="social-media-item">
                            <Icon 
                                as={social.icon} 
                                boxSize={24}
                                className="social-icon"
                                
                            />
                            <Text>{social.name}</Text>
                        </HStack>
                    </Link>
                    ))}
                </HStack>
            </VStack>
        </Box>
    )
}

export default SocialMedia;