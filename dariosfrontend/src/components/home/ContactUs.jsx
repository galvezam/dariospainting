import React from "react";
import { Box, Flex, HStack, VStack, Text, Link, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Title from "./Title";

const contacts = [
    {
        name: "Email",
        icon: FaEnvelope,
        link: "mailto:galvezmatthew135@gmail.com"
    },
    {
        name: "Call us",
        icon: FaPhone,
        link: "tel:9016440038",
    }
]

const ContactUs = () => {
  return (
    <HStack justify="center"  align="center">
        {/* <Title /> */}
            <Box 
                // backgroundColor="#000"
                color="white"
                className="contact-us-container"
            >

                    {contacts.map((contact, index) => (
                            <Link key={index} href={contact.link} isExternal
                            style={{ textDecoration: "none", color: "white" }}>
                                <VStack boxSize={100}  className="social-media-item">
                                    <Text>{contact.name}:</Text>
                                    <Icon 
                                        as={contact.icon} 
                                        boxSize={40}
                                        className="social-icon"
                                    />
                                
                                </VStack>
                            </Link>
                    ))}
            </Box>
        </HStack>
  );
};

export default ContactUs;

// import React from "react";
// import {Box, Flex, HStack, Image, VStack, Text} from "@chakra-ui/react";
// // import Logo2 from "";
// import {Link as RouterLink} from "react-router-dom";


// const ContactUs = () => {
//   return (
//     <Box 
//         backgroundColor="#FFF"
//         color="white"
//         p={20}
//         //marginTop="80px"
//     >
//         <HStack spacing={10} padding={20} justify="space-between">
            
//             <Box marginLeft={50} >
//                 <Text fontSize="50px" fontWeight="bold" color="black">Dario's</Text>
//                 <Text fontSize="50px" fontWeight="bold" color="black">Painting</Text>
//             </Box>
            
            
//                 {/* <Image 
//                     src={"../../assets/images/house_image2.jpg"}
//                     alt="Little Lemon"
//                     //boxSize="100px"
//                      width="400px"
//                     objectFit="cover"
//                     marginLeft="50px"
//                 />  */}
//              <HStack marginLeft={300}spacing={20} align="start" width="100%">
//                 <VStack spacing={10} align="center" color="white">
                    
//                     {/* <Header as="h1" > Navigation </Header> */}
//                     <h1>Navigation</h1>
//                     <RouterLink to="/home" style={{ color: "white", textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Home</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/about" style={{ color: "white", textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >About</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/menu" style={{ color: "white", textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Menu</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/order-online" style={{ color: "white", textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Order Online</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/login" style={{ color: "white", textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Login</p>
//                         </Box>
//                     </RouterLink>
//                 </VStack>
//                 <VStack spacing={10} align="center" color="white">
//                     <h1> Contact Us</h1>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Email</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Call Us</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Join Our Newsletter</p>
//                         </Box>
//                     </RouterLink>
//                 </VStack>
//                 <VStack spacing={10} align="center" color="white">
//                     <h1>Social Media</h1>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Instagram</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Facebook</p>
//                         </Box>
//                     </RouterLink>
//                     <RouterLink to="/login" style={{ color: "white",textDecoration: "none" }}>
//                         <Box 
//                             _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s" }}
//                         >
//                             <p >Pinterest</p>
//                         </Box>
//                     </RouterLink>
//                 </VStack>
//             </HStack>
//         </HStack>
//     </Box>
//   );
// };
// export default ContactUs;


// // import React from 'react';
// // // import './ContactUs.css'; // Assuming you have a CSS file for styling

// // const ContactUs = () => {
// //   return (
// //     <div className="contact-us">
// //       <div className="logo">
// //         <img src="path/to/company-logo.png" alt="Company Logo" />
// //       </div>
// //       <div className="navigation">
// //         <h3>Navigation</h3>
// //         <ul>
// //           <li><a href="/">Home</a></li>
// //           <li><a href="/about">About Us</a></li>
// //           <li><a href="/services">Services</a></li>
// //           <li><a href="/contact">Contact</a></li>
// //         </ul>
// //       </div>
// //       <div className="social-media">
// //         <h3>Follow Us</h3>
// //         <ul>
// //           <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
// //           <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
// //           <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
// //           <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
// //         </ul>
// //       </div>
// //       <div className="contact-links">
// //         <h3>Contact Us</h3>
// //         <ul>
// //           <li><a href="mailto:info@company.com">info@company.com</a></li>
// //           <li><a href="tel:+1234567890">+1 234 567 890</a></li>
// //           <li><a href="/contact-form">Contact Form</a></li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactUs;
