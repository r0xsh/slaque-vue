import store from './store'

export default function(e) {
    console.log(e.data)
    const payload = JSON.parse(e.data)

    if (payload.action == undefined || payload.action == null) {
        return;
    }

    switch (payload.action) {
        case 'channel_joined':
            store.dispatch('setChannelMessages', {
                channel: payload.channel,
                messages: payload.messages
            })
        break;

        case 'receive_message':
            store.dispatch('appendMessage', payload.message)
        break;

        case 'receive_app_state':
            store.dispatch('setAppState', payload)
        break;

        case 'authenticated':
            store.dispatch('setUsername', payload.message)
        break;
    }

}