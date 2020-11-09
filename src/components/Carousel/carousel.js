import React from "react"
import Carousel from 'react-material-ui-carousel'
import CarouselItems from "./carouselItems"
import moment from "moment"

const CarouselComponent = ({items, options}) => {
    return (
        <Carousel
            autoPlay={options.autoPlay}
            animation={options.animation}
            indicators={options.indicator || true}
            interval={options.inteval || 4000}
            fullHeightHover={options.fullHeightHover || true}
            index={moment().day() - 1}
        >
            {
                items.map( (item, i) => <CarouselItems key={i} item={item} /> )
            }
        </Carousel>
    )
}

export default CarouselComponent
