import { style, keyframes } from "@vanilla-extract/css"
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

export const MenuIcon  = style({
    display: "none",
    cursor: "pointer",

    "@media": {
        "screen and (max-width: 768px)": {
            display: "block",
        },
    },
});

export const DesktopMenu = style({
    display: "flex",
    gap: "1rem",
    color: vars.color.white,
    fontWeight: 'bold',
    fontSize: 'large',

    "@media": {
        "screen and (max-width: 768px)": {
            display: "none",
        },
    },
});

export const MobileMenu = style({
    position: "absolute",
    top: "100px",
    left: 0,
    width: "100%",
    backgroundColor: vars.color.navy,
    padding: "2rem",

    display: "flex",
    flexDirection: "column",
    gap: "2rem",
});

export const MobileText = style({
    fontSize: 'small',
    fontWeight: 'bold',

    selectors: {
        '&:hover': {
            color: vars.color.lightBlue,
            cursor: 'pointer',
        },
    }
})

const menuSlideOpen = keyframes({
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
});

const menuSlideClose = keyframes({
    "0%": { opacity: 0, transform: "translateX(-20px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});

export const slideOpen = style({
    animation: `${menuSlideOpen} 0.3s ease-in-out`,
});

export const slideClose = style({
    animation: `${menuSlideClose} 0.3s ease-in-out`,
});