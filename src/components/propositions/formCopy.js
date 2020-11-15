import React, {Component} from "react"
import Calendar from "react-calendar";
import {NavigateBefore, NavigateNext, SkipNext, SkipPrevious} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import moment from "moment";
import 'moment/locale/fr'
import {connect} from "react-redux"
import {copyMenu} from "../../store/actions/menuActions";
import {updateDataLoading} from "../../store/actions/authActions";


class FormCopy extends Component {

    state = {
        date: moment().week(moment().weeksInYear()).endOf('isoWeek').format('L'),
        day: '',
        week: '',
        id: this.props.id
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
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.copy(this.state.id, this.state.week, this.state.day)
        this.props.updateDataLoading(true)
        this.props.handleClose()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Calendar
                    className={'calender'}
                    prev2Label={<SkipPrevious/>}
                    prevLabel={<NavigateBefore/>}
                    nextLabel={<NavigateNext/>}
                    next2Label={<SkipNext/>}
                    tileClassName={'tile'}
                    onChange={this.handleChange}
                    maxDate={new Date(this.state.date)}/>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Copier
                </Button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        copy: (id, week, day) => dispatch(copyMenu(id, week, day)),
        updateDataLoading: (value) => dispatch(updateDataLoading(value))
    }
}


export default connect(null, mapDispatchToProps)(FormCopy)
