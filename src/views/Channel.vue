<template>
    <div id="wrapper">
		<div class="ui sidebar inverted vertical menu visible">
			<a class="header item">
				Channels
			</a>
            <router-link class="item" active-class="active" :to="{name:'channel', params:{ chan: 'général' }}">
                #général
            </router-link>
            <router-link class="item" active-class="active" :to="{name:'channel', params:{ chan: 'random' }}">
                #random
            </router-link>
            <router-link class="item" active-class="active" :to="{name:'channel', params:{ chan: 'support' }}">
                #support
            </router-link>

			<div class="ui horizontal divider">

			</div>

			<a class="header item">
				Direct Messages
			</a>
			<a class="item">
				<span class="dot"></span>slackbot
			</a>
            <a class="item">
				<span class="dot online"></span>David
			</a>

		</div>
		<div class="pusher">
			<div class="ui secondary  menu">
				<div class="header item">
					#{{ chan }}
				</div>
			</div>

		

        <div class="ui comments">
  <div class="comment">
    <a class="avatar">
      <img src="http://i.pravatar.cc/150?u=joe">
    </a>
    <div class="content">
      <a class="author">Joe Henderson</a>
      <div class="metadata">
        <div class="date">1 day ago</div>
      </div>
      <div class="text">
        <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
        <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
  <div class="comment">
    <a class="avatar">
      <img src="http://i.pravatar.cc/150?u=christian">
    </a>
    <div class="content">
      <a class="author">Christian Rocha</a>
      <div class="metadata">
        <div class="date">2 days ago</div>
      </div>
      <div class="text">
        I re-tweeted this.
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
</div>


			<div class="ui vertical footer segment" id="footer">

				<div class="ui fluid icon input">
					<div class="spacer"></div>
					<input type="text" :placeholder="'Message #' + chan">
					<i class="chevron right icon"></i>
				</div>

			</div>

		</div>
	</div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
        }
    },
    methods: {
        ...mapActions([
            'joinChannel'
        ])
    },
    computed: {
        ...mapGetters([
            'chan'
        ])
    },
    watch: {
        '$route.params.chan': function(chan) {
           this.joinChannel(chan)
        }
    },
    beforeMount() {
        this.joinChannel(this.$route.params.chan)
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
			position: absolute;
			bottom: 0;
			left: 0;
			padding-right: 25px;
		}
		.pusher {
			padding-left: 225px;
			padding-right: 25px;
		}
        .dot {
    height: 8px;
    width: 8px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
margin-right: 5px;
}
.online{
    background-color: green;
}
</style>
