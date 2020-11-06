import React from "react"
import {Link} from "react-router-dom";
import {connect} from "react-redux"


const NavBar = (props) => {

    return (
       <div>

       </div>
)
}


const mapStateToProps = (state) => {
    return {
    user: state.auth.user
}
}

export default connect(mapStateToProps)(NavBar)
