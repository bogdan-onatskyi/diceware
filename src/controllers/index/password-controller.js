import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import PasswordView from '../../views/components/password-view/password-view';

const PasswordController = observer(({passwordObject}) => {
    // console.log(passwordObject);
    return (
        <PasswordView isPassboxOpened={passwordObject.isPassboxOpened}
                      toggleIsPassboxOpened={passwordObject.toggleIsPassboxOpened}
                      separatePassword={passwordObject.separatePassword}
                      separators={passwordObject.separators}
                      toggleCAPS={passwordObject.toggleCAPS}
                      isCAPS={passwordObject.isCAPS}
                      password={passwordObject.password}
        />
    );
});

PasswordController.propTypes = {
    passwordObject: PropTypes.object
};

export default PasswordController;