import React, {useEffect} from "react"
import {connect} from "react-redux"
import SpeedDial from "../layout/speedDial";
import {loadPropUser} from "../../store/actions/authActions"
import {Pagination} from '@material-ui/lab';
import {paginate} from "../../helpers/paginate";
import UserProps from "./userProps";
import {Grid} from "@material-ui/core";

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
                }) : <div>Allo</div>}

                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        showFirstButton showLastButton/>
                </Grid>

            </Grid>
            <SpeedDial/>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        propositions: state.auth.userPropositions,
        isDataLoading: state.auth.isDataLoading,
        totalPages: state.auth.totalPages,
        totalItems: state.auth.totalItems
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        loadProps: (page) => dispatch(loadPropUser(page))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
