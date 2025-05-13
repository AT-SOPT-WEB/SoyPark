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

export const Hamburger = style({
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
    color: "#fff",
    fontWeight: 600,
    "@media": {
        "screen and (max-width: 768px)": {
            display: "none",
        },
    },
});

export const MobileMenu = style({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: vars.color.navy,
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    animation: "slideDown 0.3s ease-in-out",
    color: "#fff",
    fontWeight: 600,
});

export const MobileMenuHeader = style({
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
});