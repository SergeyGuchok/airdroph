import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet, subscribe } from '../../services/TweetService/index.js';

const links = ['LETS $CHERRY EACH OTHER 🤝 https://x.com/airdropgck/status/1802331500735561960']

const fillerTexts = [
  "$CHERRY ON TOP",
  "$CHERRY SEASON 1 ENDING SOON",
  "$CHERRY TGE SOON",
  "SEASON 1 $CHERRY SOON",
  "CLIMB THAT $CHERRY LEADERBOARD!",
  "$CHERRY GANG",
  "$CHERRY IS THE WAY",
  "$CHERRY ? $CHERRY!",
  "$CHERRY MONTH IT IS",
];

const emojis = [
  "😂", "🤝", "🚀", "😎", "🎉", "♥", "👍", "❤️", "🎉", "👏", "🍒", "👊"
];

type State = {
  username: string;
  id: string | null;
  tweets: string[]
}

export class Account {
  private state: State;
  myId: string;
  isInitialized: boolean;

  constructor({ username }) {
    this.myId = '954084679744925702';
    this.isInitialized = false
    this.state = {
      username,
      tweets: [],
      id: null
    }
  }

  async scalpLastTenTweets () {
    const { data } = await scalpUserTimelineByUserId(this.state.id)

    return data
  }

  async subscribeToAccount () {
    await subscribe(this.myId, this.state.id)
  }

  chooseTweet () {
    return `${fillerTexts[Math.floor(Math.random() * fillerTexts.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]} \n\n ${links[0]}`
  }

  async scalpTweetsAndReply () {
    try {
      const tweets = await this.scalpLastTenTweets()
      const newTweets = tweets.filter(tweet => !this.state.tweets.includes(tweet.id))
      const tweet = this.chooseTweet()

      this.state = {
        ...this.state,
        tweets: [...this.state.tweets, ...newTweets.map(t => t.id)]
      }

      if (newTweets.length) {
        const tweetsAboutPac = newTweets.filter(tweet => {
          return tweet.text.toLowerCase().includes('$cherry') || tweet.text.toLowerCase().includes('@cherryonblast')
        })

        if (tweetsAboutPac.length) {
          await likeTweet(this.myId, newTweets[0].id)
          await replyToTweet(tweet, newTweets[0].id)
          await this.subscribeToAccount()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async initiate() {
    const { id } = await scalpUserByUsername(this.state.username)

    this.state = {
      ...this.state,
      id,
    }

    this.isInitialized = true
  }

  getState() {
    return {
      state: this.state,
      isInitialized: this.isInitialized
    }
  }
}
