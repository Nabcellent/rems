import Toastify from 'toastify-js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

window.Sweet = withReactContent(Swal);

window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.toast = data => {
    let duration = (data.duration ?? 7) * 1000,
        type = data.type ?? 'success',
        close = data.close ?? true;

    Toastify({
        text: data.msg,
        duration: duration,
        close: close,
        gravity: data.gravity ?? 'bottom',
        position: data.position ?? 'right',
        className: type,
    }).showToast();
};

window.sweet = async ({ duration, position, type, toast, showConfirmButton, message, text, footer, ...extra }) => {
    const timer = (duration ?? 3) * 1000,
        pos = position ?? 'bottom-end',
        icon = type ?? 'success',
        asToast = toast ?? true,
        showConfirmBtn = showConfirmButton ?? false,
        sweetText = text ?? 'REMS';

    await Sweet.fire({
        icon,
        timer,
        position: pos,
        toast: asToast,
        title: message,
        showConfirmButton: showConfirmBtn,
        text: sweetText,
        ...extra,
    });
};

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
