import ResetPassword from "../components/forgotten-password/ResetPassword"

const ResetPasswordScreen = (props) => {

    return (
        <div>
            <div className="component-container">
                <h1>Reset Password</h1>
                <ResetPassword { ...props } />
            </div>
        </div>
    )

}

export default ResetPasswordScreen;