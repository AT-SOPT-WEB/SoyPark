import { style } from "@vanilla-extract/css"
import { vars } from '../../styles/theme.css';

export const Container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    padding: '2rem',
    flex: '1',
    gap: '1rem',
})

export const headerText = style({
    fontSize: 'x-large',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
})

export const inputWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.5rem',
    width: '100%',
})

export const inputBox = style({
    padding: '1rem',
    border: '1px solid gray',
    borderRadius: '.5rem',
    width: '35rem',
    height: '40px',
    
    selectors: {
        '&:focus': {
            outline: 'none',
        },
    }
})

export const btnStyle = style({
    width: '35rem',
    height: '40px',
    border: 'none',
    borderRadius: '.5rem',
    fontSize: '1.5rem',
})

export const linkStyle = style({
    fontSize: '1.5rem',
    color: vars.color.blue,
    marginTop: '1rem',
})

