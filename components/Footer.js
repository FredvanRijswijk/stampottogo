
import { jsx, Link } from 'theme-ui'

const Footer = () => {
    return (

        <footer
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            p: 2,
            variant: 'styles.footer',
        }}>
        <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
            Home
        </Link>
        <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
            Blog
        </Link>
        <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
            About
        </Link>
        <div sx={{ mx: 'auto' }} />
        <div sx={{ p: 2 }}>© 2019 Jane Doe</div>
        </footer>
    )
}

export default Footer