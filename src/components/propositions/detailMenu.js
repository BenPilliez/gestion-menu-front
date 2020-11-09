import React, {Component} from "react"
import {connect} from "react-redux"
import queryString from "url"
import {Avatar, Box, Container, Grid, Typography,CardMedia,CardHeader,Card,CardContent} from "@material-ui/core"
import {getMenusDays} from "../../store/actions/menuActions"
import Skeleton from '@material-ui/lab/Skeleton'
import {withStyles} from "@material-ui/core/styles"
import moment from "moment"
import 'moment/locale/fr'


const useStyles = (theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

})

class detailMenu extends Component {

    componentDidMount() {
        this.props.getMenusDays(this.props.day, this.props.query.week)
    }

    render() {
        const {propositions, classes} = this.props

        const propos = propositions ? propositions.map((item) => {
            const url = process.env.REACT_APP_BASE_URL + "/static/avatars/" + item.imageUrl
            return (
                <Grid key={item.id} item xs={12} lg={6} md={6} sm={12} style={{marginTop: 15}}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={ item.user.avatarUrl === null ?
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {item.user.username}
                                </Avatar> :
                                <Avatar className={classes.large} alt={"avatar" + item.user.username}
                                 src={process.env.REACT_APP_BASE_URL + "/static/avatars/" + item.user.avatarUrl}/>
                            }
                            title={item.title}
                            subheader={moment(item.createdAt).locale('fr').format('LL')}
                        >
                        </CardHeader>
                        <CardMedia
                            className={classes.media}
                            image= {`${process.env.REACT_APP_BASE_URL}/static/avatars/${item.imageUrl}`}
                            title={item.title}
                        >
                        </CardMedia>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        }) : (
            <Box pt={0.5}>
                <Skeleton/>
                <Skeleton width="60%"/>
            </Box>
        )

        return (
            <div>
                <Container style={{marginTop: 100}}>
                    <Grid container justify={"center"}>
                        {propositions && propositions.length > 0 ? propos : <div>Bah alors on mange quoi ?</div> }
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
        propositions: state.menus.propositions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenusDays: (day, query) => dispatch(getMenusDays(day, query))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(detailMenu))
