import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet, subscribe } from '../../services/TweetService/index.js';

const links = ['Me moving BOLD as well https://x.com/airdropgck/status/1796593626736108007' , 'Checkout my $PAC art https://x.com/airdropgck/status/1797265157971759366', 'Lets dream with me! https://x.com/airdropgck/status/1797714274137133273']

const fillerTexts = [
  "I Love it just as i love $PAC",
  "Approved by a $PAC validator",
  "Dead on $PAC",
  "$PAC",
  "@pacmoon_",
  "gmgm $PAC",
  "gmoon $PAC",
  "this is great for $PAC",
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
  "gmgm @pacmoon_",
  "did @pacmoon_ see this?",
  "@pacmoon_ gang",
  "climb that $PAC leaderboard!"
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

  async subscribeToAccount () {
    await subscribe(this.myId, this.state.username)
  }

  chooseTweet () {
    return `${fillerTexts[Math.floor(Math.random() * fillerTexts.length)]} ${emojis[Math.floor(Math.random() * emojis.length)]} \n\n ${links[Math.floor(Math.random() * links.length)]}`
  }

  async scalpTweetsAndReply () {
    try {
      const tweets = await this.scalpLastTenTweets()
      const newTweets = tweets.filter(tweet => !this.state.tweets.includes(tweet.id))
      const tweet = this.chooseTweet()

      if (newTweets.length) {
        const tweetsAboutPac = newTweets.filter(tweet => tweet.text.toLowerCase().includes('$pac') || tweet.text.toLowerCase().includes('@pacmoon_'))

        if (tweetsAboutPac.length) {
          await likeTweet(this.myId, tweetsAboutPac[0].id)
          await replyToTweet(tweet, tweetsAboutPac[0].id)
          await this.subscribeToAccount()

          this.state = {
            ...this.state,
            tweets: [...this.state.tweets, ...newTweets.map(t => t.id)]
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async initiate() {
    // const { id } = await scalpUserByUsername(this.state.username)
    //
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
