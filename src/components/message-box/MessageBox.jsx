import './MessageBox.css';

const MessageBox = ({children, variant}) => {
    return (
        <div className={`messagebox ${variant}`}>
            {children}
        </div>
    )
}

export default MessageBox;