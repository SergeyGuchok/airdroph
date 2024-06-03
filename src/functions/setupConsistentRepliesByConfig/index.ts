import { CronJob } from 'cron';
import { Account } from '../../controllers/Account/index.js';

const state = {
  controllers: [],
  leftControllers: [],
  currentControllers: [],
  counter: 0,
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

const twitterIds = [
  '1012801888151097345',
  '1660297198985179138',
  '1456142714756468738',
  '1501186030208229376',
  '1449164448321605632',
  '422974315',
  '1383094132487421970',
  '1366488915511812100',
  '948780889051365376',
  '43523452',
  '1717249184',
  '1368716552334315522',
  '24958437',
  '131551925',
  '1000298374451552256',
  '1355075567054417920',
  '1530107446294872065',
  '1356896977796136960',
  '1443596973970444299',
  '1366934666201202689',
  '1422615292648300545',
  '1510601004823334922',
  '248626548',
  '1722033485165072385',
  '810137474705952769',
  '906234475604037637',
  '1270542430513909760',
  '1456296325360717825',
  '407335633',
  '3063147623',
  '184729497',
  '1332105346253512708',
]

const change = () => {
  if (state.leftControllers.length <= 5) {
    state.currentControllers = [...state.leftControllers]
    state.leftControllers = [...state.controllers]

    return
  }

  state.currentControllers = [...state.leftControllers.slice(0, 5)]
  state.leftControllers = [...state.leftControllers.slice(5)]
  state.counter = state.counter + 1

  console.log(state.counter)
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
  const initialControllers = twitterIds.map(username => new Account({ username }));

  state.controllers = initialControllers
  state.leftControllers = [...initialControllers.slice(5)]
  state.currentControllers = [...initialControllers.slice(0,5)]

  accountCronJob.start()
}