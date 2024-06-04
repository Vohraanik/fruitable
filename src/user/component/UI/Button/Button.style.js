import styled from "styled-components";

export const BaseButton = styled.button`
    transition: 0.5s;
    cursor: pointer;
    font-weight: 600;
    border-radius: 50rem !important;
    text-transform: uppercase !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    margin-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    border-color: #ffb524 !important;
    display: inline - block;
    line - height: 1.5;
    text - align: center;
    vertical - align: middle;
    -moz - user - select: none;
    user - select: none;
    font - size: 1rem;
`;

export const primaryButton = styled(BaseButton)`
color: #81c408 !important;
background - color: ${props => props.disabled ? 'gray' :'rgba(0, 0, 0, 0)' };
border: 1px solid rgba(0, 0, 0, 0);

&:hover {
    background-color: ${props=>props.disabled?'gray' : 'green'};
    color: black;
    border: 1px solid black;
}
`;

export const secondaryButton = styled(BaseButton)`
border-color: #ffb524 !important;
background-color: #81c408 !important;
color:white;
border-color:#ffb524 

&:hover {
    background: var(--bs-secondary) !important;
    color: var(--bs-white) !important;
}
`;
