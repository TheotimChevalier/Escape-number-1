import LogoImage from "../Asset/logo.png"
import "../LogoImage/LogoImage.css"

export default function Logo(){
    return(
        <>
        <div className="logo-container">
        <img src={LogoImage} alt="logo" />
        </div>
        </>

    )
}