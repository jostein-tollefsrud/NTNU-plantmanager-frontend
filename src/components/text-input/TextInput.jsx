import './TextInput.css';

const TextInput = ({type = 'text', name, id, label, placeholder, onChange, inputRef, value, required = false}) => {

    const handleChange = (e) => {
        if (onChange) onChange(e);
    }

    return (
        <div className="text-input">
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                name={name} 
                id={id} 
                placeholder={placeholder}
                aria-label={name} 
                ref={inputRef}
                value={value}
                required={required}
                onChange={handleChange}/>
        </div>
    )
}

export default TextInput;

// import React, { Component } from 'react';

// class TextInput extends Component {
//     constructor(props) {
//         super(props);
//         this.textInput = null;
//         this.setTextInputRef = element => {
//             this.textInput = element;
//         };
//         this.focusTextInput = () => {
//             if (this.textInput) this.textInput.focus();
//         };
//     };

//     componentDidMount = () => {
//         this.focusTextInput();
//     };

//     handleChange = (e) => {
//         if (this.props.onChange) this.props.onChange(e);
//     };

//     render() { 
//         const { label, id, name, placeholder, type } = this.props;
//         return ( 
//             <div>
//                 <label htmlFor={id}>{label}</label>
//                 <input 
//                     ref={this.setTextInputRef} 
//                     type={type}
//                     name={name}
//                     id={id}
//                     aria-label={label}
//                     placeholder={placeholder}
//                     onChange={this.handleChange}/>
//             </div>
//          );
//     };
// };
 
// export default TextInput;