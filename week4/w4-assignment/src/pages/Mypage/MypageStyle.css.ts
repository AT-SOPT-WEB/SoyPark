import { style } from "@vanilla-extract/css"
import { vars } from '../../styles/theme.css';

export const Text = style({
    fontSize: 'medium',
    alignSelf: 'flex-start',
    marginTop: '2rem'
})

export const resultText = style({
    fontSize: 'large',
    marginTop: '2rem'
})

export const btnStyle = style({
    width: '35rem',
    height: '40px',
    border: 'none',
    borderRadius: '.5rem',
    fontSize: '1.5rem',
    color: 'white',
    backgroundColor: vars.color.navy,

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.blue,
        },
    }
})