import React, {Component} from "react"
import {connect} from "react-redux"

class Dashboard extends Component {

    render() {
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menus
    }
}

export default connect(mapStateToProps)(Dashboard)
