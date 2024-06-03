import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet } from '../../services/TweetService/index.js';

const links = ['https://x.com/airdropgck/status/1796593626736108007' , 'https://x.com/airdropgck/status/1797265157971759366', 'https://x.com/airdropgck/status/1797401729501221169']

const fillerTexts = [
  "I Love it",
  "Approved by a $PAC validator",
  "Dead on",
  "$PAC",
  "@pacmoon_",
  "gmgm",
  "gmoon",
  "this is great",
  "bullish on $PAC",
  "$PAC is the way",
  "$PAC content is great",
  "new era $PAC",
  "$PAC validators gang",
  "Validating $PAC content is amazing",
  "Left a like for $PAC",
  "This deserves a $PAC like",
  "@pacmoon_ should like this",
  "@pacmoon_ validators gang",
  "Approved by a @pacmoon_ validator",
  "gmgm @pacmoon_"
];

const emojis = [
  "😂", "🤝", "🚀", "😎", "🎉", "♥", "👍", "❤️", "🎉", "👏", "🙌", "🔥", "💯", "😍", "🥳", "🤗", "😻"
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
    const { data } = await scalpUserTimelineByUserId(this.state.username)

    return data
  }

  chooseTweet () {
    return `${fillerTexts[Math.floor(Math.random() * fillerTexts.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]} \n\n Would appreciate some love back! ${links[Math.floor(Math.random() * links.length)]}`
  }

  async scalpTweetsAndReply () {
    const tweets = await this.scalpLastTenTweets()
    const newTweets = tweets.filter(tweet => !this.state.tweets.includes(tweet.id))
    const tweet = this.chooseTweet()

    if (newTweets.length) {
      const tweetsAboutPac = newTweets.filter(tweet => tweet.text.toLowerCase().includes('$pac') || tweet.text.toLowerCase().includes('@pacmoon_'))

      if (tweetsAboutPac.length) {
        await likeTweet(this.myId, newTweets[0].id)
        await replyToTweet(tweet, newTweets[0].id)

        this.state = {
          ...this.state,
          tweets: [...this.state.tweets, ...newTweets.map(t => t.id)]
        }
      }
    }
  }

  async initiate() {
    // const { id } = await scalpUserByUsername(this.state.username)

    // this.state = {
    //   ...this.state,
    //   id,
    // }

    this.isInitialized = true
  }

  getState() {
    return {
      state: this.state,
      isInitialized: this.isInitialized
    }
  }
}
