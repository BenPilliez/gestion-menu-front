import React, {Component} from "react"
import {connect} from "react-redux"

class detailMenu extends Component{

    render() {
        return{

        }
    }
}

/*const mapStateToProps = (state, ownProps) => {
    const day = ownProps.match.params.day
    const menus = state.menus
    const menu = menus ?

    return {
        menu: menu
    }
}*/

export default connect()(detailMenu)
