import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
    children: React.ReactNode
}

const Layout2 = ({children}:Props) =>{
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            
            <div className="container py-8 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout2;