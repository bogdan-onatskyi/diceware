import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import Password from '../../views/components/password-view/password';
import Variants from '../../views/components/password-view/variants';

import Clipboard from 'clipboard';

const clipboard = new Clipboard('.clipboard');

clipboard.on('success', (e) => {
    setTimeout(() => e.clearSelection(), 2000);
});

const PasswordController = observer(({passwordObject}) => {

    const password = <Password password={passwordObject.password}
                               isVariantsOpened={passwordObject.isVariantsOpened}
                               toggleVariantsOpened={passwordObject.toggleVariantsOpened}/>;

    const variants = passwordObject.isVariantsOpened
        ? <Variants separators={passwordObject.separators}
                    toggleCAPS={passwordObject.toggleCAPS}
                    isCAPS={passwordObject.isCAPS}
                    separatedPassword={passwordObject.separatedPassword}
                    caps={passwordObject.caps}/>
        : "";

    return (
        <div className="password-view">
            {password}
            {variants}
        </div>
    );
});

PasswordController.propTypes = {
    passwordObject: PropTypes.object
};

export default PasswordController;