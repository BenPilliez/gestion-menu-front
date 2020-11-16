import React, {useEffect} from "react"
import {connect} from "react-redux"
import SpeedDial from "../layout/speedDial";
import {loadPropUser} from "../../store/actions/menuActions"
import {Pagination} from '@material-ui/lab';
import {paginate} from "../../helpers/paginate";
import UserProps from "./userProps";
import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link as RouterLink} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";

const Account = (props) => {

    const {propositions, totalPages} = props
    const [page, setPage] = React.useState(1);
    let paginatedArray = propositions && propositions.length ? paginate(propositions, 10, page) : null

    const handleChange = (event, value) => {
        setPage(value);
        paginatedArray = paginate(propositions, 10, page)
    };

    useEffect(() => {
        if (props.isDataLoading !== true) {
            props.loadProps(page)
        }
    })

    return (
        <div>
            <Grid container justify={'center'}>
                {paginatedArray && paginatedArray.length > 0 ? paginatedArray.map((item) => {
                    return <Grid key={item.id} item xs={12} lg={5} md={5} sm={12}>
                        <UserProps item={item}/>
                    </Grid>
                }) : <Grid container>
                    <Grid item xs={12} style={{marginTop: 60}}>
                        <Typography variant="h3" align={"center"}>
                            Tu n'as encore rien proposé
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center',marginTop: 60}}>

                        <Button
                            component={RouterLink}
                            to={`/create/propositions`}
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<AddCircle/>}
                        >
                            Ajouter un proposition
                        </Button>
                    </Grid>
                </Grid>

                }

                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                    {paginatedArray && paginatedArray.length > 0 ?
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                            showFirstButton showLastButton/> : null}

                </Grid>

            </Grid>
            <SpeedDial/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        propositions: state.menus.userPropositions,
        isDataLoading: state.menus.isDataLoading,
        totalPages: state.menus.totalPages,
        totalItems: state.menus.totalItems
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        loadProps: (page) => dispatch(loadPropUser(page))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
