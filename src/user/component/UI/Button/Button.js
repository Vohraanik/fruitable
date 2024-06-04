import React from 'react';
import { primaryButton, secondaryButton } from './Button.style';

function Button({ children, btnType = "primary",btnDisable = false,...rest }) {
    console.log(btnType);

    const getButtonType = () => {
        switch (btnType) {
            case 'primary':
                return primaryButton;
            case 'secondary':
                return secondaryButton;
            default:
                return primaryButton;
        }
    }

    const CustomButton = getButtonType();
    return (
        <CustomButton disabled = {btnDisable} {...rest}>
            {children}
        </CustomButton>
    );
}

export default Button;
