import { Carousel } from "react-bootstrap"
import Image from "next/image"


export default function Slider() {
    return (
        <div style={{ maxHeight: "500px", overflow: "hidden" }}>
            <Carousel controls={false} fade={true} interval={2000} style={{ height: "100%" }}>
                <Carousel.Item style={{ height: "100%" }}>
                    <Image className="d-block w-100 rounded-3" src='/bilder/essen/burger.jpg' alt="burger"  width={3000} height={500} />
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <Image className="d-block w-100 rounded-3" src='/bilder/essen/pizza.jpg' alt="pizza" width={1500} height={500} />
                </Carousel.Item>
                <Carousel.Item style={{ height: "100%" }}>
                    <Image className="d-block w-100 rounded-3" src='/bilder/essen/burrito.jpg' alt="burrito" width={1500} height={500} />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
