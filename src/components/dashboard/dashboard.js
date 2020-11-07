import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

class Dashboard extends Component {
    render() {
        const {user} = this.props
        return (
            <div>
                <p>ALllo</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Dashboard)
