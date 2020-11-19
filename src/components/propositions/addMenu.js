import React, {Component} from "react"
import {Button, Container, Grid, Paper, Switch, TextField, Typography} from "@material-ui/core"
import {DropzoneArea} from "material-ui-dropzone";
import {addMenu, addToStorage} from "../../store/actions/menuActions";
import {connect} from "react-redux"
import {converFormToFormData} from "../../helpers/convertFormToFomdata";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import queryString from "url";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {NavigateBefore, NavigateNext, SkipNext, SkipPrevious} from "@material-ui/icons";
import moment from "moment"
import "moment/locale/fr"

const maxDate = moment().week(moment().weeksInYear()).endOf('isoWeek').format('L')

class addMenuComponent extends Component {

    state = {
        propositions: '',
        title: '',
        content: '',
        description: '',
        day: this.props.day !== undefined ? this.props.day : moment().format('dddd'),
        period: true,
        periodValue: 'soir',
        week: this.props.week !== undefined ? this.props.week : moment().week(),
        maxDate: new Date(maxDate)
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleCheck = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.checked,
            periodValue: e.target.checked === false ? "midi" : "soir"
        })
    }
    handleChangeDay = (nextValue) => {

        let date = moment(nextValue)
        let week = date.week()
        let day = date.format('dddd')

        this.setState({
            ...this.state,
            day: day,
            week: week
        })
    }
    handleFile = (file) => {
        this.setState({
            ...this.state,
            propositions: file[0]
        })
    }

    handleChangeEditor = (html) => {
        this.setState({
            ...this.state,
            description: html
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = converFormToFormData(this.state)
        this.props.add(formData, this.state.day, this.state.week)

        if (this.props.isCreatedDeleteOrEdit !== false) {
            document.getElementById("add_menu").reset();
        }

    }

    render() {

        const date = this.props.day && this.props.day ? moment().day(this.state.day).week(this.state.week) : moment()

        return (

            <Container style={{marginTop: 80, marginBottom: 100}}>
                <form ref={'form'} onSubmit={this.handleSubmit} id={"add_menu"}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <Paper>
                                <Calendar
                                    prev2Label={<SkipPrevious/>}
                                    prevLabel={<NavigateBefore/>}
                                    nextLabel={<NavigateNext/>}
                                    next2Label={<SkipNext/>}
                                    onChange={this.handleChangeDay}
                                    tileClassName={'tile'}
                                    value={new Date(date)}
                                    maxDate={this.state.maxDate}/>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <TextField
                                fullWidth={true}
                                id="title"
                                label="Titre"
                                type="text"
                                required
                                onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <TextField
                                fullWidth={true}
                                id="content"
                                label="Une petite accroche qui donne envie"
                                type="text"
                                required
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <ReactQuill id={"description"} theme="snow" onChange={this.handleChangeEditor}/>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Dépose ton image ou clique"}
                                onChange={(files) => this.handleFile(files)}
                                getFileAddedMessage={(files) => {
                                    return `L'image ${files} a été ajouté`
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} ld={6} sm={12}>
                            <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>Midi</Grid>
                                    <Grid item>
                                        <Switch id={"period"} color={"primary"} checked={this.state.period}
                                                onChange={this.handleCheck} name="period"/>
                                    </Grid>
                                    <Grid item>Soir</Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Envoyer</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const day = queryString.parse(ownProps.location.search, true).query;
    const week = queryString.parse(ownProps.location.search, true).query;

    return {
        day: day ? day.day : moment().format('dddd'),
        week: week ? week.week : moment().week(),
        isCreatedDeleteOrEdit: state.menus.isCreatedOrEdit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (form, day, week) => dispatch(addMenu(form, day, week)),
        addToStorage: (data, day, week) => dispatch(addToStorage(data, day, week))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addMenuComponent)
