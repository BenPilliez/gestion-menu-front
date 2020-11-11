import React, {Component} from "react"
import {Button, Container, Grid, MenuItem, Switch, TextField, Typography} from "@material-ui/core"
import moment from "moment"
import {DropzoneArea} from "material-ui-dropzone";
import {addMenu} from "../../store/actions/menuActions";
import {connect} from "react-redux"
import {converFormToFormData} from "../../helpers/convertFormToFomdata";

moment.locale('fr')

class addMenuComponent extends Component {
    state = {
        propositions: '',
        title: '',
        content: '',
        day: '',
        period: true,
        periodValue: 'soir',
        week: ''
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

    handleSelectDay = (e) => {
        this.setState({
            ...this.state,
            "day": e.target.value
        })
    }

    handleSelectWeek = (e) => {
        this.setState({
            ...this.state,
            'week': e.target.value
        })
    }

    handleFile = (file) => {
        this.setState({
            ...this.state,
            propositions: file[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = converFormToFormData(this.state)

        this.props.add(formData)
        this.props.history.push(`/`)
    }

    getDetailWeek = () => {
        let currentWeek = moment().week()
        let weeks = []
        while (currentWeek <= moment().weeksInYear()) {
            weeks.push({
                start: moment().week(currentWeek).startOf('isoWeek').format('L'),
                end: moment().week(currentWeek).endOf('isoWeek').format('L'),
                week: currentWeek
            })
            currentWeek += 1
        }

        return weeks
    }

    render() {
        return (
            <Container style={{marginTop: 15, marginBottom: 100}}>

                <form ref={'form'} noValidate onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={6} sm={12}>
                            <TextField
                                id="week"
                                name={"week"}
                                select
                                required
                                fullWidth
                                label="Quel semaine ?"
                                value={this.state.week}
                                onChange={this.handleSelectWeek}
                                helperText="Choisissez une semaine"
                            >
                                {this.getDetailWeek().map((item) => (
                                    <MenuItem key={item.week} value={item.week}>
                                        Du {item.start.toString()} au {item.end.toString()}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                            <TextField
                                select
                                required
                                fullWidth
                                name={"day"}
                                id={"day"}
                                label="Quel jour ?"
                                value={this.state.day}
                                onChange={this.handleSelectDay}
                                helperText="Choisissez un jour"
                            >
                                {moment.weekdays(true).map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}

                            </TextField>
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
                                label="On mange quoi ?"
                                type="textarea"
                                required
                                multiline
                                rows={6}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Dépose ton image ou clique"}
                                onChange={(files) => this.handleFile(files)}
                                getFileAddedMessage={(files) =>{ return `L'image ${files} a été ajouté`}}
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

const mapStateToProps = (state) => {
    return {
        menus: state.menus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (form) => dispatch(addMenu(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addMenuComponent)
