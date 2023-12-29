import { Carousel } from "react-bootstrap"
import Image from "next/image"

export default function Slider() {
    return (
        <div>
            <Carousel controls={false} fade={false} interval={4000}>
                <Carousel.Item>
                    <Image className="d-block w-100 h-100 rounded-5" src='/bilder/essen/pizza.jpg' alt="pizza" width={3000} height={1000} />
                    <Carousel.Caption>
                        <h3>Lecker Essen bei Tim bestellen</h3>
                        <p>Alles Bio und Regional</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100 h-100 rounded-5" src='/bilder/essen/burrito.jpg' alt="burrito"  width={3000} height={1000} />
                    <Carousel.Caption>
                        <h3>Diverse schöne Sachen</h3>
                        <p>Besser als jeder Italiener um die Ecke</p>
                    </Carousel.Caption>
                </Carousel.Item>               
            </Carousel>
        </div>
    )
}
