import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet, subscribe } from '../../services/TweetService/index.js';

const links = ['Join now 👇 https://x.com/airdropgck/status/1800687399812415686']

const fillerTexts = [
  "Join new SocialFi on @Blast_L2!",
  "New pacmoon-like community platform!",
  "New SocialFi on @Blast_L2!",
  "@Blast_L2! new SocialFi",
  "New pacmoon-like platform on @Blast_L2!",
  "You dont wanna miss this out",
  "You should definitely check this out",
  "Dont fade pacmoon and other social coins!",
];

const emojis = [
  "😂", "🤝", "🚀", "😎", "🎉", "♥", "👍", "❤️", "🎉", "👏", "🙌", "🔥", "💯", "😍", "🥳", "🤗", "😻", '🤔', '😭', '😁',
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
    return `${fillerTexts[Math.floor(Math.random() * fillerTexts.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]}`
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
        // const tweetsAboutPac = newTweets.filter(tweet => tweet.text.toLowerCase().includes('$pac') || tweet.text.toLowerCase().includes('@pacmoon_'))

        // if (tweetsAboutPac.length) {
          await likeTweet(this.myId, newTweets[0].id)
          await replyToTweet(tweet, newTweets[0].id)
          await this.subscribeToAccount()
        // }
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
