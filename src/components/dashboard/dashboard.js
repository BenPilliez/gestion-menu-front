import React, {Component} from "react"
import {connect} from "react-redux"
import moment from "moment"
import CarouselComponent from "../Carousel/carousel"
import background from "../../img/background.jpg"
import {Container, Grid, FormControl, Select, InputLabel, MenuItem} from "@material-ui/core";


class Dashboard extends Component {

    state = {
        week: ''
    }

    handleChange = (e) => {
        this.setState({
            week: e.target.value
        })
    }

    render() {
        const options = {
            autoPlay: false,
            animation: 'slide'
        }
        const items = [
            {
                header: "Lundi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Mardi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Mercredi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Jeudi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Vendredi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Samedi",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            },
            {
                header: "Dimanche",
                media: {
                    url: background,
                    title: "background"
                },
                content: "Bon qu'est qu'on mange de bon ?"
            }
        ]
        return (
            <div>
                <Container style={{marginTop: 10}}>
                    <Grid container justify={"center"}>
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                            <FormControl size={"medium"} fullWidth={true}>
                                <InputLabel id="week-select">Selectione une semaine </InputLabel>
                                <Select
                                    labelId="week-select"
                                    id="week"
                                    value={this.state.week}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid style={{marginTop: 40}} container justify={"center"}>
                        <Grid item xs={6} lg={6} md={6} sm={6}>
                            <CarouselComponent options={options} items={items}/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menus
    }
}

export default connect(mapStateToProps)(Dashboard)

