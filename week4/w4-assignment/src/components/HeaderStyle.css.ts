import { style } from "@vanilla-extract/css"
import { vars } from '../styles/theme.css';


export const HeaderContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
    width: '100%',
    backgroundColor: vars.color.navy,
    color: vars.color.white,
});

export const LeftText = style({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2rem',
    gap: '2rem',
})

export const RightText = style({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2rem',
    gap: '.7rem',
})

export const HeaderText = style({
    fontSize: 'large',
    fontWeight: 'bold',

    selectors: {
        '&:hover': {
            color: vars.color.lightBlue,
            cursor: 'pointer',
        },
    }
})

export const userIcon = style({
    fontSize: '2rem',
});