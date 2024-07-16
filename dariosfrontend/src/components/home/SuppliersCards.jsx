import { Box, Heading, Image } from "@chakra-ui/react";
import Card from "./Card";

const cardData = [
    {
        title: "",
        description: "",
        imageSrc: "./assets/images/sherwin_williams.png"
    },
    {
        title: "",
        description: "",
        imageSrc: "./assets/images/sherwin_williams.png"
    },
    {
        title: "",
        description: "",
        imageSrc: "./assets/images/sherwin_williams.png"
    },
    {
        title: "",
        description: "",
        imageSrc: "./assets/images/sherwin_williams.png"
    }
]

const cards = (imageSrc, title) => {
    return (
        <Box>
            <Image src={imageSrc} alt={title} objectFit="cover" w="700px" h="460px" />
            <Heading>{title}</Heading>
        </Box>
    )
}


const SuppliersCards = () => {
    return (
        <Box
            
            // display="grid"
            // flexDirection="row"
            // justifyContent="center"
            // alignItems="center"
            // padding="20px"
            // className="provider-box"
        >
            <Heading marginTop="20px" fontWeight="bold" color="#122049">Our Suppliers</Heading>


{/* 
            {cardData.map((card, index) => (
                <Box key={index} className="provider-card">
                    {cards(card.imageSrc, card.title)}
                    <p>{card.description}</p>
                </Box>
            ))} */}
                <section className="service-section">
                    <div className="service-card">
                    <img src="./assets/images/sherwin_williams.png" alt="Interior Painting" />
                        {/* <div className="service-details">
                            <h3 className="service-title">Interior Painting</h3>
                            <p className="service-description">World class quality</p>
                        </div> */}
                    </div>
                    <div className="service-card">
                    <img src="./assets/images/romabio.png" alt="Exterior Painting" />
                        {/* <div className="service-details">
                            <h3 className="service-title">Exterior Painting</h3>
                            <p className="service-description">World class quality</p>
                        </div> */}
                    </div>
                    <div className="service-card">
                    <img src="./assets/images/renner.png" alt="Cabinets" />
                        {/* <div className="service-details">
                            <h3 className="service-title">Cabinets</h3>
                            <p className="service-description">World class quality</p>
                        </div> */}
                    </div>
                    <div className="service-card">
                        <img src="./assets/images/ben_moore.png" alt="Siding" />
                        {/* <div className="service-details">
                            <h3 className="service-title">Siding</h3>
                            <p className="service-description">World class quality</p>
                        </div> */}
                    </div>
                </section>
        </Box>
    )
}

export default SuppliersCards;