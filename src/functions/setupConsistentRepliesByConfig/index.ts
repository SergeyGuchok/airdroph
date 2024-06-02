import { CronJob } from 'cron';
import { Account } from '../../controllers/Account/index.js';

const state = {
  controllers: [],
  leftControllers: [],
  currentControllers: [],
}

const initialTwitterUsers = [
  'mooncat2878',
  'themistergoat',
  'gojo0x',
  'theog_general',
  'wardaddycapital',
  'cryptokaleo',
  'k2_nft',
  'taloktan',
  'berndawgler',
  'jenndefer',
  'btclover23',
  'redpandaluu',
  'jaylow999',
  'iliketabz',
  'chilearmy123',
  'degenty_dev',
  '7316',
  'punk9059',
  'alexandre_nft7',
  'zoraweb3',
  'rektoffspring12',
  'jaysoncrypto',
  'fabxgow',
  'dan559355',
  'pelham_nft',
  'adamagb',
  'nftprince',
  'iamashchild',
  'daviswals1',
  'cryptoleon_eth',
  'sasha_nft',
  'rizethereum',
  'osf_rekt'
]

const change = () => {
  if (state.leftControllers.length <= 5) {
    state.currentControllers = state.leftControllers
    state.leftControllers = state.controllers

    return
  }

  state.currentControllers = state.leftControllers.slice(0, 5)
  state.leftControllers = state.leftControllers.slice(5)
}

const accountCronJob = new CronJob('*/30 * * * *', async () => {
  for (const controller of state.currentControllers) {
    const { isInitialized } = controller.getState()

    if (isInitialized) {
      await controller.scalpTweetsAndReply()
    } else {
      await controller.initiate()
      await controller.scalpTweetsAndReply()
    }
  }

  change()
})

export const initialize = async () => {
  const initialControllers = initialTwitterUsers.map(username => new Account({ username }));

  for (const controller of initialControllers) {
    await controller.initiate()
  }

  state.controllers = initialControllers
  state.leftControllers = initialControllers.slice(5)
  state.currentControllers = initialControllers.slice(0,5)

  accountCronJob.start()
}