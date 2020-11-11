import React, {Component} from "react"
import {connect} from "react-redux"
import queryString from "url"
import { Box, Container, Grid, Typography} from "@material-ui/core"
import {getMenusDays} from "../../store/actions/menuActions"
import Skeleton from '@material-ui/lab/Skeleton'
import {withStyles} from "@material-ui/core/styles"
import {AddCircle} from "@material-ui/icons";
import 'moment/locale/fr'
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import CardLists from "../layout/cardsList";

const useStyles = (theme) => ({
    flex:{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    button: {
        margin: theme.spacing(1),
    },
})

class detailMenu extends Component {

    componentDidMount() {
        this.props.getMenusDays(this.props.day, this.props.query.week)
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
                <Container style={{marginTop: 100, marginBottom: 100}}>
                    <Grid container justify={"center"}>
                        {propositions && propositions.length > 0 ? propos :
                            <div className={classes.flex}>
                            <Typography variant={"h3"}>
                                Bah alors on mange quoi ?
                            </Typography>
                                <Button
                                    component={RouterLink}
                                    to={"/create/propositions/"}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<AddCircle />}
                                >
                                    Ajouter un proposition
                                </Button>
                        </div> }
                    </Grid>
                </Container>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    const day = ownProps.match.params.day
    const query = queryString.parse(ownProps.location.search, true).query;

    return {
        day: day,
        query: query,
        propositions: state.menus.propositions[`${day}-${query.week}`]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenusDays: (day, query) => dispatch(getMenusDays(day, query))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(detailMenu))
