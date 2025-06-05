import { style } from "@vanilla-extract/css"
import { vars } from '../../styles/theme.css';

export const errorMessageStyle = style({
    fontSize: '1.4rem',
    color: vars.color.red,
    marginTop: '1.5rem',
    marginBottom: '.5rem',
    alignSelf: 'flex-start',
})

export const LinkText = style({
    fontSize: '1.5rem',
    marginTop: '1rem',
})

export const inputContainer = style({
    position: 'relative',
    width: '100%',
});

export const iconBtn = style({
    position: 'absolute',
    top: '50%',
    right: '15px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#666',
    fontSize: '1.7rem',
});

export const Text = style({
    fontSize: 'large',
    fontWeight: 'bold',
    marginTop: '0',
    marginBottom: '1.5rem',
    alignSelf: 'flex-start',
})