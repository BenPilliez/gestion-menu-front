import React, {Component} from "react"
import {connect} from "react-redux"

class Dashboard extends Component {
    render() {
        const {user} = this.props
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        menus: state.menus
    }
}

export default connect(mapStateToProps)(Dashboard)
