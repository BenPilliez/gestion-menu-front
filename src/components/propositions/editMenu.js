import React, {Component} from "react"
import {Button, Container, Grid, Paper, Switch, TextField, Typography} from "@material-ui/core"
import {DropzoneArea} from "material-ui-dropzone";
import {converFormToFormData} from "../../helpers/convertFormToFomdata";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {NavigateBefore, NavigateNext, SkipNext, SkipPrevious} from "@material-ui/icons";
import moment from "moment"
import {editMenu} from "../../store/actions/authActions";
import {connect} from "react-redux"
import "moment/locale/fr"

const maxDate = moment().week(moment().weeksInYear()).endOf('isoWeek').format('L')

class EditMenuComponent extends Component {

    state = {
        propositions: '',
        title: this.props.title,
        content: this.props.content,
        description: this.props.description,
        day: this.props.day,
        period: this.props.period === 'soir',
        periodValue: 'soir',
        week: this.props.week,
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
        console.log(this.state)
        const formData = converFormToFormData(this.state)
        this.props.edit(this.props.id,formData)
        this.props.handleClose()
    }

    render() {

        const date = this.props.day && this.props.day ? moment().day(this.props.day).week(this.props.week) : moment()
        console.log(this.props)

        return (
            <Container style={{marginTop: 15, marginBottom: 100}}>
                <form ref={'form'} noValidate onSubmit={this.handleSubmit}>
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
                                value={this.state.title}
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
                                value={this.state.content}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <ReactQuill id={"description"} defaultValue={this.state.description} theme="snow"
                                        onChange={this.handleChangeEditor}/>
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
                                        <Switch id={"period"} color={"primary"} value={this.state.period}
                                                checked={this.state.period}
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

const mapDispatchToProps = (dispatch) => {
    return {
        edit: (id, form) => dispatch(editMenu(id, form))
    }
}


export default connect(null, mapDispatchToProps)(EditMenuComponent)
