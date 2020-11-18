import React, {Component} from "react"
import {connect} from "react-redux"
import {Box, Button, Container, Grid, withStyles} from "@material-ui/core"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import {addToStorage, getMenusDays, updateDataLoading} from "../../store/actions/menuActions"
import moment from "moment"
import {Link as RouterLink} from "react-router-dom";
import {AddCircle, NavigateBefore, NavigateNext, SkipNext, SkipPrevious} from "@material-ui/icons";
import CardLists from "../layout/cardsList";
import Skeleton from "@material-ui/lab/Skeleton";
import "moment/locale/fr"
import Paper from "@material-ui/core/Paper";
import SocketIo from "socket.io-client";

const maxDate = moment().week(moment().weeksInYear()).endOf('isoWeek').format('L')

const useStyles = (theme) => ({
    flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing(1),
    },
})

class Dashboard extends Component {

    state = {
        week: moment().week(),
        day: moment().format('dddd'),
        maxDate: new Date(maxDate)
    }

    componentDidMount() {
        const socket = SocketIo.connect(process.env.REACT_APP_BASE_SOCKET)
        socket.on('PropCreated', (response) => {
            this.props.addToStorage(response, response.day, response.week)
        })
        this.props.getMenus(this.state.day, this.state.week)
    }


    handleChange = (nextValue) => {
        moment.locale('fr')

        let date = moment(nextValue)
        let week = date.week()
        let day = date.format('dddd')

        this.setState({
            ...this.state,
            day: day,
            week: week
        })

        this.props.getMenus(day, week)

    }

    componentWillUnmount() {
        this.props.updateDataLoading(false)
    }

    render() {

        const {propositions, isDataLoaded, classes} = this.props
        console.log(isDataLoaded)
        const propos = isDataLoaded && propositions ? propositions.map((item) => {
            return (
                <CardLists key={item.id} proposition={item}/>
            )
        }) : (
            <Box pt={0.5}>
                <Skeleton/>
                <Skeleton width="60%"/>
            </Box>
        )

        return (
            <div>
                <Container style={{marginTop: 10, marginBottom: 100}}>
                    <Grid container>
                        <Grid item xs={12} lg={12} md={12} sm={12}>
                            <Paper>
                                <Calendar
                                    className={'calender'}
                                    prev2Label={<SkipPrevious/>}
                                    prevLabel={<NavigateBefore/>}
                                    nextLabel={<NavigateNext/>}
                                    next2Label={<SkipNext/>}
                                    tileClassName={'tile'}
                                    onChange={this.handleChange}
                                    maxDate={this.state.maxDate}/>
                            </Paper>

                        </Grid>
                    </Grid>
                </Container>
                <Container style={{marginTop: 100, marginBottom: 100}}>
                    <Grid container>
                        <Grid item className={classes.flex} xs={12} lg={12} md={12} sm={12}>
                            <Button
                                component={RouterLink}
                                to={`/create/propositions?day=${this.state.day}&week=${this.state.week}`}
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<AddCircle/>}
                            >
                                Ajouter un proposition
                            </Button>
                        </Grid>
                        {propositions && propositions.length > 0 ? propos : null}
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDataLoaded: state.menus.isDataLoaded,
        propositions: state.menus.propositions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenus: (day, query) => dispatch(getMenusDays(day, query)),
        addToStorage: (data, day, weekNumber) => dispatch(addToStorage(data, day, weekNumber)),
        updateDataLoading: (value) => dispatch(updateDataLoading(value))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))

