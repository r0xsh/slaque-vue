<template>
    <div id="wrapper">
		<div class="ui sidebar inverted vertical menu visible">
			<a class="header item">
				Channels
			</a>
            <div class="item">
                <div class="ui left transparent inverted icon input">
                    <input type="text" v-model="channelSearch" @keypress.enter="jumpChannel()" placeholder="Channel">
                        <i class="list icon"></i>
                </div>
            </div>
            <router-link v-for="channel in channels" :key="channel.id" class="item" active-class="active" :to="{name:'channel', params:{ chan: channel.name }}">
                #{{channel.name}}
            </router-link>
			<div class="ui horizontal divider">

			</div>

			<a class="header item">
				Direct Messages
			</a>

            <router-link v-for="user in users" v-if="user.username != username" :key="user.id" class="item" active-class="active" :to="{name:'channel', params:{ chan: 'pm:' + [user.username, username].sort().join() }}">
                {{user.username}}<div class="ui empty circular label" :class="{'green': user.online}"></div>
            </router-link>

		</div>
		<div ref="pusher" class="pusher">
			<div class="ui secondary  menu">
				<div class="header item">
					#{{ chan }}
				</div>
			</div>

		

        <div ref="comments" class="ui comments">

  <div v-for="cmessage in messages" :key="cmessage.id" class="comment">
    <a class="avatar">
      <img :src="'http://i.pravatar.cc/150?u='+ cmessage.user.username">
    </a>
    <div class="content">
      <router-link class="author" :to="{name:'channel', params:{ chan: 'pm:' + [cmessage.user.username, username].sort().join() }}" >{{ cmessage.user.username }}</router-link>
      <div class="metadata">
        <div class="date">{{ parseMoment(cmessage.created_at) }}</div>
      </div>
      <div class="text" v-html="parseMarkdown(cmessage.message)">
      </div>
      <div class="actions">
        <a class="reply" @click="replyToMessage(cmessage.user.username, cmessage.message)">Reply</a>
      </div>
    </div>
  </div>
</div>


			<div class="ui vertical footer segment" id="footer">

				<div class="ui fluid icon input">
					<div class="spacer"></div>
					<input type="text" ref="inputMessage" v-model="message" v-on:paste='handlePaste' @keypress.escape="clearCurrentMessage" @keypress.enter="pushMessage" :placeholder="'Message #' + chan">
					<i class="chevron right icon"></i>
				</div>

			</div>

		</div>
	</div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Moment from 'moment'
import snarkdown from 'snarkdown'

export default {
    data() {
        return {
            message: '',
            channelSearch: '',
            reply: ''
        }
    },
    methods: {
        ...mapActions([
            'joinChannel',
            'sendMessage'
        ]),
        pushMessage() {

            let message = this.message

            if (this.reply != '') {
                message = this.message + '\n> ' + this.reply
            }

            this.message = ''
            this.reply = ''
            this.sendMessage(message)
        },
        jumpChannel() {
            this.$router.push({name:'channel', params: {chan: this.channelSearch}})
            this.channelSearch = ''
        },
        clearCurrentMessage() {
            this.message = ''
            this.reply = ''
        },
        replyToMessage(user, message) {
            this.message = '@' + user + ' '
            this.reply = message
            this.$refs.inputMessage.focus()
        },
        parseMoment(date) {
            return Moment(date.date).fromNow()
        },
        parseMarkdown(message) {
            return snarkdown(message)
        },
        async handlePaste(e) {
            for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
                var item = e.clipboardData.items[i];
                if (item.type.indexOf("image") != -1) {
                    const base64 = await this.getBase64(item.getAsFile())
                    this.message = `![pasted image](${base64})`
                }
            }
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
}
    },
    computed: {
        ...mapGetters([
            'chan',
            'messages',
            'users',
            'channels',
            'username'
        ])
    },
    watch: {
        '$route.params.chan': function(chan) {
           this.joinChannel(chan)
        }
    },
    beforeMount() {
        this.joinChannel(this.$route.params.chan)
    },
    updated() {
        window.scrollTo(0,document.body.scrollHeight);
    },
    mounted() {
        window.scrollTo(0,document.body.scrollHeight);
    }
}
</script>

<style scoped>
		body {
			margin: 0;
			padding: 0;
			height: 100%;
		}
		#wrapper {
			min-height: 100%;
			position: relative;
		}
		.spacer {
			width: 225px;
		}
		#footer {
			width: 100%;
			height: 60px;
			position: fixed;
            background: white;
			bottom: 0;
			left: 0;
			padding-right: 25px;
		}
		.pusher {
			padding-left: 225px;
			padding-right: 25px;
		}
    .comments {
        padding-bottom: 65px;
    }
    .item .label {
        margin-top: 1px !important;
    }
</style>

<style>
    blockquote {
        margin-left: 10px;
        border-left: 4px solid #CCC;
        padding-left: 4px;
    }
</style>

