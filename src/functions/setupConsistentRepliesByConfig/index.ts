import { CronJob } from 'cron';
import { Account } from '../../controllers/Account/index.js';

const state = {
  controllers: [],
  leftControllers: [],
  currentControllers: [],
  counter: 0,
}

const initialTwitterUsers = [
  '32003',
  '610008445',
  '1512733834541862913',
  '1441835930889818113',
  '20731799',
  '1964529234',
  '931831469634240513',
  'dwyer1987',
  '81338966',
  '2839418319',
  '1370479673818427403',
  '1745079132755554304',
  '1044836753486622720',
  '934715304491606016',
  '1367552114642321410',
  '1358126888506388480',
  '1446315150340812804',
  '52993689',
  '1329637544498225154',
  '979846754714705920',
  '1925447520',
  '1461816051507683331',
  '1447850855332335617',
  '1118966425',
  '3173445967',
  '1441774351',
  '1130642299283619840',
  '1389606365962792964',
  '2583862561',
  '1220695729448083456',
  '1382464645160706053',
  '1372618667830165508',
  '1384835654799040513',
  '631770998',
  '1712198834628030464',
  '979041547697074176',
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

const accountCronJob = new CronJob('*/20 * * * *', async () => {
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

  state.controllers = initialControllers
  state.leftControllers = [...initialControllers.slice(5)]
  state.currentControllers = [...initialControllers.slice(0,5)]

  accountCronJob.start()
}