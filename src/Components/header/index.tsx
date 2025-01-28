import { HeaderContainer } from "./styles";
import LogoIgnite from '../../assets/Logo-ignite.svg'
import { Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header() {
    return(

        <HeaderContainer>
            <img src={LogoIgnite} alt="Dois trinângulos verdes" />
            <nav>
                <NavLink to="/" title="timer">
                    <Timer size={24} />
                </NavLink>
                
                <NavLink to="/history" title="histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
        
    )
}