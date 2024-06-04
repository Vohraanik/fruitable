import React from 'react'
import { Error, SameInput } from './Input.style'


const Input = ({errorText,...rest }) => {

    return (
        <>
            <SameInput
                {...rest}
            />
            <Error>
              {errorText}
            </Error>

        </>
    )
}

export default Input