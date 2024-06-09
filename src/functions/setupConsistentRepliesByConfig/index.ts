import { CronJob } from 'cron';
import { Account } from '../../controllers/Account/index.js';

const state = {
  controllers: [],
  leftControllers: [],
  currentControllers: [],
  counter: 0,
}

const toAdd = []

const toRemove = []

const addTomorrow = ['chadmongman', 'pacvalidatorv2', 'iamashchild', '0xcrabb', 'g_waap']

const usernames = ['ubutoo', 'happyjoenft', 'pacmoon_', 'dannygreene', '0xmk021', 'pacnub', 'themistergoat', 'gojo0x', 'fattyrgarita',
  'apex_cryptoeth', 'ztvlfuyem71zjts', 'cschua09', 'ariesyuangga', 'juicyjama_', 'ab2tract', 'dialindoe', 'digger_nft', 'scooter_420', '0xrumrunner', 'damotniulap', 'g_waap', 'mauricioostos', 'travelfunones', '0xcrabb', 'airongrid1', 'anikijungle', 'nefretiriii', 'widzeth', 'juicyhamdogs', 'percytonie', 'niccinft', 'noahsnftark', 'rizethereum', 'lecrepiste', 'pkudiwal', 'lecrepiste', 'craysecurity', 'stuebi18', 'happyjoenft', 'fabxgow', 'cryptoleon_eth', 'sasha_nft', 'ikahq_', 'sof1azara03', 'hairdropcat', '7316', 'degenty_dev', 'iliketabz', 'daviswals1', 'alexandre_nft7', 'btclover23', 'osf_rekt', 'redpandaluu', 'jaylow999', 'berndawgler', 'tyler_did_it', 'KajWedemeijer', 'JoeLeMerou', 'rekt2160', 'theog_general',
  'sweazycrypto', 'nftsiti', 'sskwirtel', 'dynamicisreal', 'annafiweb3', 'queenhinanoor1', 'nezuki_nft', 'jlassec', 'rufyeth', 'erenyeager_eth', 'miami_eth', 'mariannenfts', 'scoopysnax', 'brefchuila',
]

const array = [
  '1200421636635267077',
  '1189094044976025600',
  '1251370455224561669',
  '834178921495044096',
  '1322392383217147907',

  '1372618667830165508',
  '1311731072489664513',
  '1220695729448083456',
  '1449370052805885959',
  '2583862561',

  '1220695729448083456',
  '1382464645160706053',
  '1372618667830165508',
  '1384835654799040513',
  '631770998',

  '1712198834628030464',
  '979041547697074176',
  '248626548',
  '1510601004823334922',
  '1722033485165072385',
  '1499585375534206980',
  '1270542430513909760',
  '810137474705952769',
  '906234475604037637',
  '1095647728498106368',
  '1429424657988415491',
  '1177867453281554435',
  '40134343',
  '3063147623',
  '407335633',
  '1456142714756468738',
  '184729497',
  '1456296325360717825',
  '1366934666201202689',
  '999293695240257537',
  '1012801888151097345',
  '1660297198985179138',
  '1332105346253512708',
  '1501186030208229376',
  '422974315',
  '622936284',
  '24958437',
  '1589388230754938880',
  '1366488915511812100',
  '1323747353308835840',
  '127646057',
  '1717249184',
  '1372201077634854914',
  '43523452',
  '1449164448321605632',
  '1383094132487421970',
  '1631278973433831429',
  '1368716552334315522',
  '948780889051365376',
  '1443596973970444299',
  '131551925',
  '1718705304588726272',
  '1000298374451552256',
  '1508180777921658883',
  '120837281',
  '29360072',
  '1356896977796136960',
  '1418229651684483076',
  '1495437430157152256',
  '1429945400467787781',
  '17105572',
  '1512733834541862913',
  '1467105086006788096',
  '610008445',
  '1287912979867021314',
  '32003',
  '233597539',
  '1611647409850880000',
  '15920137',
  '1480186915781496836',
  '1475014806025371651',
  '3369243892',
  '1441835930889818113',
  '2370698396',
  '1556041228759736320',
  '975570299591606272',
  '1465944375431729155',
  '1358126888506388480',
  '2740899461',
  '1618898880862584834',
  '1419520910919229444',
  '1505123573601648640',
  '1545818578896576513',
  '1490694571570995202',
  '1423097842034528257',
  '1389606365962792964',
  '1099790079294287872',
  '951256304596602880',
  '2154858565',
  '1382158942160101376',
  '1767300869735723008',
  '912442311543595008',
  '482427113',
];

const uniqueArray = Array.from(new Set(array));

const change = () => {
  if (!state.leftControllers.length) {
    accountCronJob.stop()
    console.log('stopped')
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

    await new Promise(resolve => setTimeout(resolve, 10000));
  }

  change()
})

export const initialize = async () => {
  const initialControllers = usernames.map(username => new Account({ username }));

  state.controllers = initialControllers
  state.leftControllers = [...initialControllers.slice(5)]
  state.currentControllers = [...initialControllers.slice(0,5)]

  accountCronJob.start()
}