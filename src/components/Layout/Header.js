import {Fragment} from 'react';
import classes  from './Header.module.css';
import headerLogo from '../../assets/meals.jpeg'
import HeaderCartButton from '../Layout/HeaderCartButton';

const Header = (props) => {

    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>

        <div className={classes['main-image']}>
            <img src={headerLogo} alt='hey'/>
        </div>

    </Fragment>
}

export default Header;
