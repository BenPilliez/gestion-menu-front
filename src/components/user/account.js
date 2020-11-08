import React, {useEffect} from "react"
import {
    updateTitle,
    showAvatar,
    defaultJumbro
} from "../../store/actions/jumbotronActions"
import {connect} from "react-redux"

const Account = (props) => {

    const {user} = props

    useEffect(() => {
        props.titleUpdate(user.username)
        props.avatar(true)

        return () => {
            props.defaultJumbotron()
        }
    })

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
const mapDispatchToProps = (dispatch) => {

    return {
        titleUpdate: (title) => dispatch(updateTitle(title)),
        avatar: (avatar) => dispatch(showAvatar(avatar)),
        defaultJumbotron: () => dispatch(defaultJumbro())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
