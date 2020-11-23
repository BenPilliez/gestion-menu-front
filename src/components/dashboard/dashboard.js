import React, {Component} from "react"
import {connect} from "react-redux"
import {Button, Container, Grid, Paper, withStyles} from "@material-ui/core"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import {
    addToStorage,
    deleteItemFromStorage,
    editToStorage,
    getMenusDays,
    getWeeksMenu,
    updateDataLoading
} from "../../store/actions/menuActions"
import {notifications} from "../../store/actions/notificationActions";
import moment from "moment"
import {Link as RouterLink} from "react-router-dom";
import {AddCircle, NavigateBefore, NavigateNext, SkipNext, SkipPrevious} from "@material-ui/icons";
import CardLists from "../layout/cardsList";
import "moment/locale/fr"

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
        maxDate: new Date(maxDate),
    }

    componentDidMount() {
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

    handleLoadWeekList = (weekNumber) => {
        this.props.weekList(weekNumber)
    }

    componentWillUnmount() {
        this.props.updateDataLoading(false)
    }

    render() {

        const {propositions, isDataLoaded, isWeekList, weekListData, classes} = this.props

        const weekList = isDataLoaded && weekListData ? weekListData.map((item) => {
            return (
                <CardLists key={item.id} proposition={item}/>
            )
        }) : null

        const propos = isDataLoaded && propositions ? propositions.map((item) => {
            return (
                <CardLists key={item.id} proposition={item}/>
            )
        }) : null

        let data = null
        if (isWeekList && weekList) {
            data = weekList
        } else if (isWeekList === false && propos) {
            data = propos
        }

        return (
            <div>
                <Container style={{marginTop: 100, marginBottom: 100}}>
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
                                    showWeekNumbers={true}
                                    onClickWeekNumber={(weekNumber) => this.handleLoadWeekList(weekNumber)}
                                    maxDate={this.state.maxDate}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container style={{marginTop: 100, marginBottom: 100}}>
                    <Grid container spacing={2}>
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
                                Ajouter une proposition
                            </Button>
                        </Grid>
                        {data}
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDataLoaded: state.menus.isDataLoaded,
        propositions: state.menus.propositions,
        isDataCreated: state.menus.isCreatedDeleteOrEdit,
        isWeekList: state.menus.isWeekList,
        weekListData: state.menus.weekList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenus: (day, query) => dispatch(getMenusDays(day, query)),
        updateDataLoading: (value) => dispatch(updateDataLoading(value)),
        weekList: (weekNumber) => dispatch(getWeeksMenu(weekNumber))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))

