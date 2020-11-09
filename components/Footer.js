
import { jsx, Link } from 'theme-ui'

const Footer = () => {
    return (
        <footer className="mt-4">
            {/* <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
                Home
            </Link>
            <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
                Blog
            </Link>
            <Link to='/' sx={{ variant: 'styles.navlink', p: 2 }}>
                About
            </Link> */}
    
            <div className="p-6 container mx-auto text-sm"><span className="font-semibold text-gray-900">© 2020 STAMPPOT to go </span>
            <span className="text-gray-600 text-xs"> | STAMPPOT to go is een geregistreerd handelsmerk van AttiqLab B.V., geregistreerd bij de Kamer van Koophandel Brabant, Nederland, nummer 73700029</span></div>
        </footer>
        
    )
}

export default Footer