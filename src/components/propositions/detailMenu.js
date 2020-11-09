import React, {Component} from "react"
import {connect} from "react-redux"
import {getMenusDays} from "../../store/actions/menuActions";
import queryString from "url"

class detailMenu extends Component {

    componentDidMount() {
        this.props.getMenusDays(this.props.day,this.props.query.week)
    }

    render() {
        return (
            <div>

            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    const day = ownProps.match.params.day
    const query = queryString.parse(ownProps.location.search,true).query;

    return {
        day: day,
        query: query
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenusDays: (day, query) => dispatch(getMenusDays(day,query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(detailMenu)
