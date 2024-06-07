import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet, subscribe } from '../../services/TweetService/index.js';

const links = ['Tell me if you like my content ! https://x.com/airdropgck/status/1798785031269150913']

const fillerTexts = [
  "I Love it just as i love $PAC",
  "Dead on $PAC",
  "$PAC",
  "gmgm $PAC",
  "gmoon $PAC",
  "this is great for $PAC",
  "bullish on $PAC",
  "$PAC is the way",
  "$PAC content is great",
  "new era $PAC",
  "$PAC new rules are hursh",
  "Validating $PAC content is amazing",
  "Left a like for $PAC",
  "This deserves a $PAC like",
  "I love this $PAC content",
  "$PAC gang",
  "gmgm $PAC new rules",
  "I hope me commenting $PAC over here is allowed due to rule changes",
  "$PAC rule changes am i even allowed to comment",
  "climb that $PAC leaderboard!"
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
    return `${fillerTexts[Math.floor(Math.random() * fillerTexts.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]}`
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
        const tweetsAboutPac = newTweets.filter(tweet => tweet.text.toLowerCase().includes('$pac') || tweet.text.toLowerCase().includes('@pacmoon_'))

        if (tweetsAboutPac.length) {
          await likeTweet(this.myId, tweetsAboutPac[0].id)
          await replyToTweet(tweet, tweetsAboutPac[0].id)
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
