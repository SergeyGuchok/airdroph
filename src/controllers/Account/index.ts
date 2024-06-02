import { scalpUserByUsername, scalpUserTimelineByUserId } from '../../services/ScalpService/index.js';
import { replyToTweet, likeTweet } from '../../services/TweetService/index.js';

const firstTweet = 'I love it! Approved by a $PAC validator 🤝 \n\n Hope you can share some love back https://x.com/airdropgck/status/1797401729501221169'
const secondTweet = 'Check out my $PAC art https://x.com/airdropgck/status/1797265157971759366'
const thirdTweet = 'I love $PAC content and here is why - https://x.com/airdropgck/status/1796593626736108007'

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

  chooseTweet () {
    const random = Math.floor(Math.random() * 100)

    if (random < 33) {
      return firstTweet
    }

    if (random < 66) {
      return secondTweet
    }

    return thirdTweet
  }

  async scalpTweetsAndReply () {
    const tweets = await this.scalpLastTenTweets()
    const newTweets = tweets.filter(tweet => !this.state.tweets.includes(tweet.id))
    const tweet = this.chooseTweet()

    if (newTweets.length) {
      const tweetsAboutPac = newTweets.filter(tweet => tweet.text.includes('$PAC') || tweet.text.includes('@pacmoon_'))

      if (tweetsAboutPac.length) {
        await likeTweet(this.myId, newTweets[0].id)
        await replyToTweet(tweet, newTweets[0].id)

        this.state = {
          ...this.state,
          tweets: [...this.state.tweets, ...newTweets.map(t => t.id)]
        }

        console.log(this.state)
      }
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
}
