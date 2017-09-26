import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import PasswordView from '../../views/components/password-view/password-view';

const PasswordController = observer(({passwordObject}) => {
    return (
        <PasswordView password={passwordObject.password}
                      isPassboxOpened={passwordObject.isPassboxOpened}
                      toggleIsPassboxOpened={passwordObject.toggleIsPassboxOpened}
                      separatedPassword={passwordObject.separatedPassword}
                      separators={passwordObject.separators}
                      toggleCAPS={passwordObject.toggleCAPS}
                      isCAPS={passwordObject.isCAPS}
                      caps={passwordObject.caps}/>
    );
});

PasswordController.propTypes = {
    passwordObject: PropTypes.object
};

export default PasswordController;