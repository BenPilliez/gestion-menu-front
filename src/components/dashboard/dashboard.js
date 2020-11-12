import React, {Component} from "react"
import {connect} from "react-redux"
import {Box, Container, Grid, withStyles} from "@material-ui/core"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import {getMenusDays} from "../../store/actions/menuActions"
import moment from "moment"
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";
import CardLists from "../layout/cardsList";
import Skeleton from "@material-ui/lab/Skeleton";

moment.locale('fr')

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
        this.props.getMenus(this.state.day, this.state.week)
    }

    handleChange = (nextValue) => {

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


    render() {

        const {propositions, classes} = this.props

        const propos = propositions ? propositions.map((item) => {
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
                <Container  style={{marginTop: 10, marginBottom: 100}}>
                    <Grid container >
                        <Grid item  xs={12} lg={12} md={12} sm={12}>
                            <Calendar className={"calendar"} onChange={this.handleChange} maxDate={this.state.maxDate}/>
                        </Grid>
                    </Grid>
                </Container>

                <Container  style={{marginTop: 100, marginBottom: 100}}>
                    <Grid container >
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
        propositions: state.menus.propositions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenus: (day, query) => dispatch(getMenusDays(day, query))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))

